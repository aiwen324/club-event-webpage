/* server.js - user & resource authentication */
"use strict";
const log = console.log;

const express = require("express");

const app = express();

// mongoose and mongo connection
const { mongoose } = require("./src/DB/mongoose");
mongoose.set("useFindAndModify", false);

const { Announcements } = require("./src/models/Announcement");
const { Users } = require("./src/models/users");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
// const cloudinary = require("cloudinary");
// cloudinary.config({
//   cloud_name: "dknk7eimh",
//   api_key: "142485975195311",
//   api_secret: "P53FiX0RZY5JvKOzwe1AHxPNRTk"
// });

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "#66CCFF",
    resave: false,
    cookie: {
      expires: 600000,
      httppOnly: true,
    },
  })
);

// A route to check if a use is logged in on the session cookie
app.get("/Login/check-session", (req, res) => {
  if (req.session.user) {
    res.send({ currentUser: req.session.user });
  } else {
    res.status(401).send();
  }
});

// A middleware to verify if the user is logged in when doing REST API call
const validatelogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirct("/login/");
  } else {
    next();
  }
};

// API used to login, request json should be formated like:
/*  {
      username: <username>,
      password: <password>
    }
*/
// This method will return a json as follow if login is a sucess:
/* 
 {
    userID:         <userid (number)>
    email:          <email (String)>
    username:       <username (String)>
    accountType:    <type   (Number)>
}
*/
// If the login failed, it wil return a status code of 400
app.post("/Login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Users.findOne({ username: username, password: password })
    .then(
      (result) => {
        if (!result) {
          res.status(400).send();
          return;
        }
        const currentUser = {
          userID: result._id,
          email: result.email,
          username: result.username,
          accountType: result.accountType,
        };
        req.session.user = currentUser;

        res.status(200).json({ currentUser });
      },
      (error) => {
        res.status(500).send(error);
      }
    )
    .catch((error) => {
      console.log("Error: ", error);
    });
});

// API used to logout
app.get("/logout", (req, res) => {
  // Remove the session
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

/*******************************************************/

/*** API Routes below */
// API for adding new users to server, expecting a json format like this:
/*
    {
        accountType: <type (1 or 0)>
        username:    <name (String)>
        email:       <email (String)>
        password:    <passwoed (String)>
        phoneNumber: <phoneNum (String)>
    }
*/
// Upon sucess, response have a status code of 200
// Upon Failure, reponsecode is 500 and error detail will be send
app.post("/signUp", (req, res) => {
  const newUser = new Users({
    accountType: req.body.accountType,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });
  Users.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  }).then((user) => {
    if (user) {
      console.log("Find User exists");
      res.status(403).send({ reason: "Duplicated Users" });
    } else {
      newUser.save().then(
        (result) => res.status(200).send(),
        (error) => {
          res.status(500).send(error);
        }
      );
    }
  });
});

// This API is for getting all the visable announcement from the server
//return {[results]}
app.get("/visableAnnouncements", (req, res) => {
  //work in progress
  Announcements.find({ visable: 1 }).then(
    (result) => {
      res.status(200).send({ result });
    },
    (error) => {
      res.status(500).send(error);
    }
  );
});

// This API is for getting all the visable announcement
//return {[results]}
app.get("/getAllAnnouncement", (req, res) => {
  Announcements.find().then(
    (result) => {
      res.send({ result });
    },
    (error) => {
      res.status(500).send(error);
    }
  );
});

// Get Announcement by announcement id
// return announcement object
app.get("/Announcement/:id", (req, res) => {
  const announcementID = req.params.id;

  Announcements.findById(announcementID).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(500).send(error);
    }
  );
});

// Add comment to a Announcement
/*
    {
        content: <content (String)>,
        userID:  <userID (Number)>,
        date:    <date (Date)>
    }
*/
// return a with updated post content
app.post("/Announcement/:id", validatelogin, (req, res) => {
  const announcementID = req.params.id;
  if (!ObjectID.isValid(announcementID)) {
    res.status(404).send();
  }
  const newComment = {
    content: req.body.content,
    userID: req.body.userID,
    date: req.body.date,
  };

  Announcements.findById(announcementID)
    .then((result) => {
      const comments = result.comments;
      comments.push(newComment);

      Announcements.findByIdAndUpdate(
        announcementID,
        { $set: { comments } },
        { new: true }
      ).then((updateResult) => {
        const userID = [];
        updateResult.comments.forEach((element) => {
          userID.push(element.userID);
        });
        Users.find({
          _id: { $in: userID },
        }).then(
          (result) => {
            const userList = [];
            result.forEach((element) => {
              userList.push({
                username: element.username,
                userID: element._id,
              });
            });
            res
              .status(200)
              .json({ comments: updateResult.comments, id: userList });
          },
          (error) => {
            res.status(500).send(error);
          }
        );
      });
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});
// Register a user to activity, expect a json as follows:
/*
    {
        userID: <userID (Number)>
    }
*/
//Upon sucess, return 200 and the updated announcement as json, if post does not exit, print failure.
app.post("/Register/:id", validatelogin, (req, res) => {
  const announcementID = req.params.id;
  const userid = req.body.userID;

  if (!ObjectID.isValid(announcementID)) {
    res.status(404).send();
    return;
  }

  Users.findById(userid)
    .then((result) => {
      if (!result) {
        res.status(404).send("User does not exitst");
        return;
      }

      Announcements.findById(announcementID).then(
        (result) => {
          if (!result) {
            res.status(404).send("Announcement does not exist");
            return;
          }

          const userList = result.registeredUser;
          userList.forEach((element) => {
            if (element === userid) {
              res.status(500).send("User is already registerd");
              throw Error("Duplicate user detected");
            }
          });
          userList.push(userid);

          Announcements.findByIdAndUpdate(
            announcementID,
            { $set: { registeredUser: userList } },
            { new: true }
          ).then(
            (result) => {
              res.status(200).json(result);
            },
            (error) => {
              res.status(500).send(error);
            }
          );
        },
        (error) => {
          res.status(500).send(error);
          return;
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

// Update the announcement voting result, expect a json as follow
/*
    {   
        userID:<userID (Number)>
        optionIDs: [{
            questionID: <questionID (Number)>,
            optionID: <optionID (Number)>
        }]     
        textResponse:  <response (Text)>
        date: <date (Date)>
    }
*/
// If the user already submitted, this will return status of 400, else 200
app.post("/updateAnnouncementVote/:id", validatelogin, (req, res) => {
  const announcementID = req.params.id;
  const userID = req.body.userID;
  if (!ObjectID.isValid(announcementID) && ObjectID.isValid(validatelogin)) {
    res.status(404).send();
  }

  Announcements.findById(announcementID).then(
    (result) => {
      if (!result) {
        res.status(404).send();
        return;
      }

      const submittedUser = result.survey.submittedUsers;
      submittedUser.forEach((user) => {
        if (user === userID) {
          res.status(400).send();
          return;
        }
      });

      const optionIDs = req.body.optionIDs;
      const surveys = result.survey.surveyQuestions;
      optionIDs.forEach((element) => {
        let targetSurvey = surveys.id(element.questionID);
        let targetOption = targetSurvey.questionOptions.id(element.optionID);
        targetOption.optionSelectedCount += 1;
      });

      const newResponse = {
        userID: userID,
        content: req.body.textResponse,
        Date: req.body.date,
      };

      result.survey.textResponse.push(newResponse);
      result.survey.surveyQuestions = surveys;
      result.survey.submittedUsers.push(userID);
      result.save().then(
        (result) => {
          res.status(200).send();
        },
        (error) => {
          res.status(500).send(error);
        }
      );
    },
    (error) => {
      res.status(500).send(error);
    }
  );
});

// API for posting new announcements

app.post("/addNewEvent", validatelogin, (req, res) => {
  const userID = req.session.user.userID;
  console.log("Get here");
  Users.findById(userID).then(
    (result) => {
      if (!result) {
        res.status(404).send();
        return;
      }
      if (result.accountType === 0) {
        res.status(401).send();
        return;
      }

      const newAnnonucement = new Announcements({
        title: req.body.title,
        text_content: req.body.text_content,
        imgPath: req.body.imgPath,
        registerFields: req.body.registerFields,
        registeredUser: [],
        survey: req.body.survey,
        comments: [],
        visable: req.body.visable,
      });

      console.log("Get here");
      console.log("new Announcement schema looks like");
      console.log(newAnnonucement);

      newAnnonucement.save().then(
        (result) => {
          res.status(200).send();
        },
        (error) => {
          res.status(500).send(error);
        }
      );
    },
    (error) => {
      res.status(500).send(error);
    }
  );
});

/*** Webpage routes below ************************/
// Serve the build
app.use(express.static(__dirname + "/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
  log(`Listening on port ${port}...`);
});

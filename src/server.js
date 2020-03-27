/* server.js - user & resource authentication */
"use strict";
const log = console.log;

const express = require("express");

const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set("useFindAndModify", false);

const { Announcement } = require("./models/Announcements");
const { Users } = require("./models/users");

// to validate object IDs
const { ObjectID } = require("mongodb");

// handlebars templating engine
const hbs = require("hbs");
// Set express property 'view engine' to be 'hbs'
app.set("view engine", "hbs");
// setting up partials directory
hbs.registerPartials(__dirname + "/views/partials");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "#66CCFF",
    resave: false,
    cookie: {
      expires: 10000,
      httppOnly: true
    }
  })
);

const validatelogin = (req, res, next) => {
  if (!req.session.Users) {
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
  const username = req.body.email;
  const password = req.body.password;

  Users.findOne({ username: username, password: password }).then(
    result => {
      if (!result) {
        res.status(400).send();
      }
      const returnJson = {
        userID: result._id,
        email: result.email,
        username: result.username,
        accountType: result.accountType
      };
      req.session.userID = result._id;
      req.session.type = result.accountType;

      res.status(200).json(returnJson);
    },
    error => {
      res.status(500).send(error);
    }
  );
});

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
    phoneNumber: req.body.phoneNumber
  });
  Users.findOne({
    $or: [{ username: req.body.username, email: req.body.email }]
  }).then(user => {
    if (user) {
      console.log("Find User exists");
      res.status(403).send({ reason: "Duplicated Users" });
    } else {
      newUser.save().then(
        result => res.status(200).send(),
        error => {
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
  Announcement.find({ visable: 1 }).then(
    result => {
      res.status(200).send({ result });
    },
    error => {
      res.status(500).send(error);
    }
  );
});

// This API is for getting all the visable announcement
//return {[results]}
app.get("/getAllAnnouncement", (req, res) => {
  Announcement.find().then(
    result => {
      res.send({ result });
    },
    error => {
      res.status(500).send(error);
    }
  );
});

// Get Announcement by announcement id
// return announcement object
app.get("/Announcement/:id", (req, res) => {
  const announcementID = req.param.id;

  Announcement.findById(announcementID).then(
    result => {
      res.status(200).send(result);
    },
    error => {
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
  const announcementID = req.param.id;

  if (!ObjectID.isValid(announcementID)) {
    res.status(404).send();
  }

  const newComment = {
    content: req.body.content,
    userID: req.body.userID,
    date: req.body.date
  };

  Announcement.findById(announcementID).then(
    result => {
      const comment = result.comments;
      comment.push(newComment);

      Announcement.findByIdAndUpdate(
        announcementID,
        { $set: { comments: Comment } },
        { new: true }
      ).then(
        updateResult => {
          res.status(200).json(updateResult);
        },
        error => {
          res.status(500).send(error);
        }
      );
    },
    error => {
      res.status(404).send(error);
    }
  );
});

// Register a user to activity, expect a json as follows:
/*
    {
        userID: <userID (Number)>
    }
*/
//Upon sucess, return 200 and the updated announcement as json, if post does not exit, print failure.
app.post("/Register/:id", validatelogin, (req, res) => {
  const announcementID = req.param.id;
  const userid = res.body.userID;

  if (!ObjectID.isValid(announcementID)) {
    res.status(404).send();
  }

  Users.findOne({ userID: userid }).then(
    result => {
      if (!result) {
        res.status(404).send("User does not exitst");
      }

      Announcement.findById(announcementID).then(
        result => {
          if (!result) {
            res.status(404).send("Announcement does not exit");
          }

          const userList = result.registeredUser;
          userList.forEach(element => {
            if (element === userid) {
              res.status(500).send("User is already registerd");
              return;
            }
          });
          userList.push(userid);

          Announcement.findByIdAndUpdate(
            announcementID,
            { $set: { registeredUser: userList } },
            { new: true }
          ).then(
            result => {
              res.status(200).json(result);
            },
            error => {
              res.status(500).send(error);
            }
          );
        },
        error => {
          res.status(500).send(error);
        }
      );
    },
    error => {
      res.status(500).send(error);
    }
  );
});

// Update the announcement voting result, expect a json as follow
/*
    {   
        userID:<userID (Number)>
        optionIDs: [{
            surveyID: <surveyID (Number)>,
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

  Announcement.findById(announcementID).then(
    result => {
      if (!result) {
        res.status(404).send();
        return;
      }

      const submittedUser = result.survey.submittedUsers;
      submittedUser.forEach(user => {
        if (user === userID) {
          res.status(400).send();
          return;
        }
      });

      const optionIDs = req.body.optionIDs;
      const surveys = result.survey.surveyQuestions;
      optionIDs.forEach(element => {
        let targetSurvey = surveys.id(element.surveyID);
        let targetOption = targetSurvey.questionOptions.id(element.optionID);
        targetOption.optionSelectedCount += 1;
      });

      const newResponse = {
        userID: userID,
        content: req.body.textResponse,
        Date: req.body.date
      };

      result.survey.textResponse.push(newResponse);
      result.survey.surveyQuestions = surveys;
      result.survey.submittedUsers.push(userID);
      result.save().then(
        result => {
          res.status(200).send();
        },
        error => {
          res.status(500).send(error);
        }
      );
    },
    error => {
      res.status(500).send(error);
    }
  );
});

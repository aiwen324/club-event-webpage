export const getAnnouncementList = (appComp, homeComp) => {
  console.log("Get called");
  const url = "/getAllAnnouncement";
  fetch(url)
    .then(res => {
      if (res.status === 200) {
        console.log("Success to query all announcements");
        return res.json();
      }
    })
    .then(res => {
      console.log("Following is the announcement Array");
      console.log(res);
      homeComp.setState({ announcements: res.result });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchAnnouncement = (eventComp, announcementID) => {
  const url = `/Announcement/${announcementID}`;
  fetch(url)
    .then(res => {
      if (res.status === 200) {
        console.log("Success to query announcements");
        return res.json();
      } else {
        throw Error("Failed to get announcement from DB");
      }
    })
    .then(res => {
      console.log("Get announcement as:");
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const parseDescript = announce => {
  const { text_content } = announce;
  const paragraphArr = text_content
    .trim()
    .split(/\n+/)
    .map(p => p.trim());
  return paragraphArr;
};

export const parseSurvey = announce => {
  const { survey } = announce;
  if (!(survey && survey.surveyQuestions.length > 0)) {
    return [];
  }
  return survey.surveyQuestions;
};

export const submitSurvey = (eventComp, currentUser) => {
  console.log("submitSurvey get called");
  const { questionMap, announcement, response } = eventComp.state;
  const optionIDs = [];
  const filledQuestionID = new Set();
  Object.keys(questionMap).forEach(q_key => {
    Object.keys(questionMap[q_key]).forEach(opt_key => {
      if (questionMap[q_key][opt_key]) {
        optionIDs.push({ questionID: q_key, optionID: opt_key });
        filledQuestionID.add(q_key);
      }
    });
  });
  if (filledQuestionID.size < Object.keys(questionMap).length) {
    alert("Please fill out all survey questions!");
    return;
  }
  const announcementID = announcement._id;
  const url = `/updateAnnouncementVote/${announcementID}`;

  const data = {
    userID: currentUser.userID,
    optionIDs,
    textResponse: response,
    date: null
  };
  const req = new Request(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  console.log("Here is the data to send");
  console.log(data);
  return fetch(req).then(res => {
    if (res.status === 200) {
      console.log("User successfully submit survey.");
    } else if (res.status === 400) {
      alert("You can't submit the survey multiple times");
    } else {
      throw Error;
    }
  });
};

export const submitRegister = (eventComp, currentUser) => {
  console.log("submitRegister get called");
  const { announcement } = eventComp.state;
  const announcementID = announcement._id;
  const url = `/Register/${announcementID}`;

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify({ userID: currentUser.userID }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  return fetch(request).then(res => {
    if (res.status === 200) {
      console.log("Sucessful register the user");
    } else if (res.status === 403) {
      alert("You've already registered to this event");
      return;
    } else {
      throw Error;
    }
  });
};

// Helper function for sending the comments
export const post_comment = eventComp => {
  const { announcement, input_comment } = eventComp.state;
  const { app } = eventComp.props;
  const { currentUser } = app.state;
  const currentAnnouncementID = announcement._id;
  const url = "/Announcement/" + currentAnnouncementID;

  if (!currentUser) {
    alert("You must log in too submit the comment");
    return;
  }

  const dataToSave = {
    content: input_comment,
    userID: currentUser.userID
  };
  console.log(dataToSave);

  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(dataToSave),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });
  fetch(request)
    .then(res => {
      if (res.status !== 200) {
        console.log("Error when sending information");
        alert("Server Error when sending request");
        throw Error;
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      const newComments = [];
      data.comments.forEach(comments => {
        const comment = {
          poster: null,
          content: comments.content,
          date: "Just Now"
        };
        data.id.forEach(id => {
          if (id.userID === comments.userID) {
            comment.poster = id.username;
          }
        });
        newComments.push(comment);
      });
      eventComp.setState({ comments: newComments });
    })
    .catch(error => {
      console.log(error);
    });
  eventComp.setState({ input_comment: "" });
};

// Helper function to fetch comments
export const fetchComments = announcement => {
  const announcementID = announcement._id;
  const url = `/comment/${announcementID}`;
  console.log("Sending request to url: ", url);
  return fetch(url)
    .then(res => {
      console.log("Get response", res);
      if (res.status === 200) {
        return res.json();
      } else {
        throw Error("Server Error");
      }
    })
    .then(res => {
      console.log("Get comments");
      console.log(res.comments);
      return res.comments;
    });
  // .catch((error) => console.log(error));
};

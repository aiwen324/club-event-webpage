export const getAnnouncementList = (appComp, homeComp) => {
  console.log("Get called");
  const url = "/getAllAnnouncement";
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        console.log("Success to query all announcements");
        return res.json();
      }
    })
    .then((res) => {
      console.log("Following is the announcement Array");
      console.log(res);
      homeComp.setState({ announcements: res.result });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const parseDescript = (announce) => {
  const { text_content } = announce;
  const paragraphArr = text_content
    .trim()
    .split(/\n+/)
    .map((p) => p.trim());
  return paragraphArr;
};

export const parseSurvey = (announce) => {
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
  Object.keys(questionMap).forEach((q_key) => {
    Object.keys(questionMap[q_key]).forEach((opt_key) => {
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
    date: null,
  };
  const req = new Request(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  console.log("Here is the data to send");
  console.log(data);
  return fetch(req).then((res) => {
    if (res.status === 200) {
      console.log("User successfully submit survey.");
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
      "Content-Type": "application/json",
    },
  });

  return fetch(request).then((res) => {
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

export const validateSurvey = (questionMap) => {
  let flag = true;
};

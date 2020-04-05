const TEXTTYPE = 0;
const CHECKBOXTYPE = 1;

export const generateOptionSchema = option => {
  return {
    optionContent: option
    // optionSelectedCount would be generated automatically
  };
};

export const parseSurvey = question => {
  const questionTitle = question.questionTitle.trim();
  if (questionTitle === "") {
    throw Error("Invalid Input");
  }
  let questionObject = {};
  if (question.type === CHECKBOXTYPE) {
    if (question.options.trim() === "") {
      throw Error("Invalid Input");
    } else {
      let options = question.options
        .trim()
        .split(/\n+/)
        .map(option => generateOptionSchema(option));
      questionObject.questionOptions = options;
    }
  }
  Object.assign(questionObject, {
    questionType: question.type,
    questionTitle: questionTitle
  });
  console.log("questionObject after parsing is: ");
  console.log(questionObject);
  return questionObject;
};

export const parseQuestions = question_array => {
  const surveyQuestionArray = question_array.map(question =>
    parseSurvey(question)
  );
  console.log("Final generated surveyquestionArray");
  console.log(surveyQuestionArray);
  return surveyQuestionArray;
};

export const generateAnnouncement = (adminComp, surveyQuestions, imgPath) => {
  const data = adminComp.state;
  const title = data.title;
  const text_content = data.text_content;
  // TODO: First use a fake imgPath
  const registerFields = adminComp.state.reg_field
    ? [
        { fieldType: 1, fieldName: "Name" },
        { fieldType: 1, fieldName: "Email" }
      ]
    : null;
  // const registeredUser = [];
  const survey = adminComp.state.survey ? { surveyQuestions } : null;
  // const commments = [];
  const visible = 1;
  console.log("Get survey request");
  const dataToSave = {
    title,
    text_content,
    imgPath,
    registerFields,
    // registeredUser,
    survey,
    // commments,
    visible
  };
  console.log("Here is the data we are sending to backend");
  console.log(dataToSave);

  const url = "/addNewEvent";
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
      if (res.status === 200) {
        console.log("Save successfully to DB");
        adminComp.props.history.push("/admin");
      } else {
        throw Error;
      }
    })
    .catch(error => {
      console.log(error);
      adminComp.setState({ errorNum: 4 });
    });
};

// Send request to server to upload images
export const uploadImages = adminComp => {
  const imgArr = adminComp.state.images;
  const url = "https://api.cloudinary.com/v1_1/dknk7eimh/upload";

  return Promise.all(
    imgArr.map(img => {
      const imgData = new FormData();
      imgData.append("upload_preset", "rqj7fl2q");
      imgData.append("file", img);

      console.log(imgData);
      const request = new Request(url, {
        method: "post",
        body: imgData,
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      });
      return fetch(request);
    })
  )
    .then(resArr => {
      const jsonArr = resArr.map(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("Upload Error, cannot connect to servers");
          throw Error;
        }
      });
      return Promise.all(jsonArr);
    })
    .then(jsonArr => {
      console.log("Get following response: ");
      console.log(jsonArr);
      const urlArr = jsonArr.map(jsonData => jsonData.url);
      return urlArr;
    })
    .catch(error => {
      console.log(error);
      // TODO: Set errow alert in the ocmponent
      return [];
    });
};

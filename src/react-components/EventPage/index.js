import React from "react";

import "./style.css";
import SurveyQuestion from "../SurveyQuestion";
import DiscussionBoard from "../DisscussionBoard/DiscussionBoard.js";
import FreeResponseResult from "../FreeResponseResult/Comment";
import { Link as RouterLink } from "react-router-dom";
import Event_register from "../Event_register";
import FreeResponseQuestion from "../FreeResponseQuestion";
import SurveyStats from "../SurveyStats/SurveyStats.js";
import { uid } from "react-uid";

import { Button } from "@material-ui/core";
import {
  parseDescript,
  parseSurvey,
  submitRegister,
  submitSurvey,
  post_comment,
  fetchComments
} from "../../actions/user";
import Survey from "../Admin_edit/survey";
import { loadStats } from "../../actions/admin";

// import Link from '@material-ui/core/Link'

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.admin = props.fromDashboard;
    this.surveySection = document.querySelector("SurveyPart");
  }

  adminCheck() {
    console.log(this.props);
    if (this.admin === "true") {
      let child = this.surveySection.lastElementChild;
      while (child) {
        this.surveySection.removeChild(child);
        child = this.surveySection.lastElementChild;
      }
    }
  }

  state = {
    input_comment: "",
    comments: [
      { poster: "IMNF", content: "I love this activity!", date: "2 hours ago" },
      { poster: "IMNF", content: "I love this activity!", date: "2 hours ago" }
    ],
    announcement: null,
    responseFlag: false,
    response: "",
    questionMap: {},
    responses: [],
    survey: []
  };

  handle_input_comment = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  // Initialize the question map
  /* questionMap : {
   *     question_id: {
   *       option_id: true,
   *       option_id: false
   *     },
   *     ...
   * }
   */
  componentWillMount = () => {
    const announcement = this.props.location.state;
    const { currentUser } = this.props.app.state;
    console.log("Here is the announcement inside event page");
    console.log(announcement);
    this.setState({ announcement });
    fetchComments(announcement)
      .then(comments => {
        if (comments) {
          this.setState({ comments });
        }
      })
      .catch(error => {
        console.log("get error in upper level");
        console.log(error);
      });

    const questionMap = this.state.questionMap;
    const surveyQuestions = parseSurvey(announcement);
    surveyQuestions.map(question => {
      if (question.questionType === 1) {
        const optionMap = {};
        question.questionOptions.map(option => (optionMap[option._id] = false));
        questionMap[question._id] = optionMap;
      } else if (question.questionType === 0) {
        this.setState({ responseFlag: true });
      }
    });
    this.setState({ questionMap });
    loadStats(this, currentUser, announcement);
  };

  handleRegister = (e, regRequired) => {
    e.preventDefault();
    const { currentUser } = this.props.app.state;
    if (!currentUser) {
      alert("Please log in");
      return;
    }
    if (regRequired) {
      submitRegister(this, currentUser).catch(error => {
        alert("Server Error");
      });
    }
  };

  handleSurvey = (e, surveyFlag) => {
    e.preventDefault();
    const { currentUser } = this.props.app.state;
    if (!currentUser) {
      alert("Please log in");
      return;
    }
    if (this.state.responseFlag && this.state.response === "") {
      alert("Please fill out all fields");
      return;
    }
    console.log("Get here");

    if (surveyFlag) {
      submitSurvey(this, currentUser);
    }
  };

  render() {
    const { app, commentsTable } = this.props;

    let paragraphArr = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ];
    let title = "Project Demo";
    let imageArr = [
      require("./images/boeing777x.jpeg"),
      require("./images/shoko-enoshima.jpeg")
    ];
    let regRequired = true;
    let surveyFlag = true;
    let surveyQuestions = [];
    const { currentUser } = app.state;
    if (this.state.announcement) {
      const { announcement } = this.state;
      title = announcement.title;
      paragraphArr = parseDescript(announcement);
      imageArr = announcement.imgPath;
      if (currentUser && currentUser.accountType === 1) {
        regRequired = false;
        surveyFlag = false;
      } else {
        regRequired = announcement.registerFields ? true : false;
        surveyFlag = announcement.survey ? true : false;
      }
      surveyQuestions = parseSurvey(announcement);
    }

    let surveyComp = null;
    if (surveyFlag) {
      if (surveyQuestions.length > 0) {
        surveyComp = surveyQuestions.map(question => {
          if (question.questionType === 1) {
            return <SurveyQuestion question={question} eventComp={this} />;
          } else if (question.questionType === 0) {
            return (
              <FreeResponseQuestion question={question} eventComp={this} />
            );
          }
        });
        surveyComp = (
          <div>
            <div>
              <h2 className="event_section_title">Pre-event Survey</h2>
            </div>
            {surveyComp}
            <div id="submit_button">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={e => {
                  this.handleSurvey(e, surveyFlag);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        );
      }
    } else if (currentUser && currentUser.accountType) {
      surveyComp = (
        <div>
          <div className="surveyResult">
            {this.state.survey.map(questionObject => (
              <SurveyStats
                questionObj={questionObject}
                key={uid(questionObject)}
              />
            ))}
          </div>
          {this.state.responses.map(response => (
            <FreeResponseResult response={response} key={uid(response)} />
          ))}
        </div>
      );
    }

    return (
      <div className="event_page_content">
        <div className="event_page">
          <div>
            <h1 id="event_title">{title}</h1>
          </div>
          <div id="event_details">
            {paragraphArr.map(paragraph => (
              <p>{paragraph}</p>
            ))}
          </div>
          {imageArr.map(imagePath => (
            <div>
              <img
                className="event_image"
                src={imagePath}
                alt="Failed to load the resource"
              />
            </div>
          ))}
          <div id="SurveyPart">
            {regRequired ? (
              <div>
                <div>
                  <h2 className="event_section_title">Registration Form</h2>
                </div>
                <Event_register />
                <div id="submit_button">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={e => this.handleRegister(e, regRequired)}
                  >
                    Register
                  </Button>
                </div>
              </div>
            ) : null}
            {surveyComp}
          </div>
          <div className="bottom_padder" />
        </div>

        <div className="commentSection">
          <div id="CommentsContainer">
            {this.state.comments.map(comment => (
              <DiscussionBoard comments={comment} key={uid(comment)} />
            ))}
          </div>
          <div className="commentTextField">
            <div className="SenderIconContainer">
              <img className="SenderIcon" src={require("./images/icon2.jpg")} />
            </div>
            <div className="inputTextArea">
              <textarea
                className="inputArea"
                name="input_comment"
                placeholder="Please leave a comment"
                value={this.state.input_comment}
                onChange={this.handle_input_comment}
              ></textarea>
              <button
                className="comment-submit"
                onClick={() => {
                  post_comment(this);
                }}
              >
                Send!
              </button>
            </div>
          </div>
        </div>
        <div className="bottom_padder" />
      </div>
    );
  }
}

export default EventPage;

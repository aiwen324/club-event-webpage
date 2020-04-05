import React from "react";

import "./style.css";
import SurveyQuestion from "../SurveyQuestion";
import DiscussionBoard from "../DisscussionBoard/DiscussionBoard.js";
import { Link as RouterLink } from "react-router-dom";
import Event_register from "../Event_register";
import FreeResponseQuestion from "../FreeResponseQuestion";
import SurveyStats from "../SurveyStats/SurveyStats.js";
import FreeResponseResult from "../FreeResponseResult/Comment.js";

import { uid } from "react-uid";

import { Button } from "@material-ui/core";

// import Link from '@material-ui/core/Link'

class AdminEventPage extends React.Component {
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

  loadStats() {
    if (this.admin === "true") {
      const currentAnnouncementID = "5e884d42956aa8024ca20d57";
      const url = "/Announcement/" + currentAnnouncementID;
      const request = new Request(url, {
        method: "get",
        body: null,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      fetch(request).then(
        (res) => {
          res.json().then(
            (data) => {
              const totalSubmit = data.survey.submittedUsers;
              const questionData = data.survey.surveyQuestions;
              const textResponse = data.survey.textResponse;
              const stats = [];
              questionData.forEach((survey_question) => {
                const questionObject = {
                  question: survey_question.questionTitle,
                  options: survey_question.questionOptions,
                };
                stats.push(questionObject);
              });
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  state = {
    input_comment: "",
    comments: [
      { poster: "IMNF", content: "I love this activity!", date: "2 hours ago" },
      { poster: "IMNF", content: "I love this activity!", date: "2 hours ago" },
    ],
    options: [],
  };

  render() {
    const { commentsTable } = this.props;

    return (
      <div className="event_page_content">
        <div className="event_page">
          <div>
            <h1 id="event_title">Project Demo</h1>
          </div>
          <div id="event_info">
            <h3 id="event_time">
              Date and Time: <span>Friday, February 28, 2020 @ 14:40</span>
            </h3>
            <h3 id="event_loc">
              Location: <span>Myhal Centre, Rm. 317</span>
            </h3>
          </div>
          <div id="event_details">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div>
            <img
              className="event_image"
              src={require("./images/boeing777x.jpeg")}
            />
          </div>
          <div>
            <img
              className="event_image"
              src={require("./images/shoko-enoshima.jpeg")}
            />
          </div>
          {/* <div id='survey_form'>
                        <SurveyQuestion/>
                    </div> */}
          <div id="SurveyPart">
            <div>
              <h2 className="event_section_title">Pre-event Survey</h2>
            </div>
            <div className="surveyResult">
              {/* <SurveyStats />
              <SurveyStats />
              <SurveyStats /> */}
              {this.state.comments.map((surveys) => (
                <SurveyStats options={surveys} key={uid(surveys)} />
              ))}
            </div>
            <FreeResponseResult />
            <div className="bottom_padder" />
          </div>
        </div>

        <div className="commentSection">
          <div id="CommentsContainer">
            {this.options.comments.map((comment) => (
              <DiscussionBoard options={comment} />
            ))}
          </div>
        </div>
        <div className="bottom_padder" />
      </div>
    );
  }
}

export default AdminEventPage;

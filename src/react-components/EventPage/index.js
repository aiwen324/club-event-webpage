import React from "react";

import "./style.css";
import SurveyQuestion from "../SurveyQuestion";
import DiscussionBoard from "../DisscussionBoard/DiscussionBoard.js";
import { Link as RouterLink } from "react-router-dom";
import Event_register from "../Event_register";
import FreeResponseQuestion from "../FreeResponseQuestion";
import SurveyStats from "../SurveyStats/SurveyStats.js";
import { uid } from "react-uid";

import { Button } from "@material-ui/core";
import { parseDescript } from "../../actions/user";

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
      { poster: "IMNF", content: "I love this activity!", date: "2 hours ago" },
    ],
    announcement: null,
  };

  handle_input_comment = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  post_comment = (event) => {
    const comments = this.state.comments;
    comments.push({
      poster: "IMNF",
      content: this.state.input_comment,
      date: "Just now",
    });
    this.setState({ comments: comments });
    this.setState({ input_comment: "" });
  };

  componentDidMount = () => {
    const announcement = this.props.location.state;
    console.log("Here is the announcement inside event page");
    console.log(announcement);
    this.setState({ announcement });
  };

  render() {
    const { commentsTable } = this.props;

    let paragraphArr = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ];
    let title = "Project Demo";
    let imageArr = [
      require("./images/boeing777x.jpeg"),
      require("./images/shoko-enoshima.jpeg"),
    ];
    let regRequired = false;
    if (this.state.announcement) {
      const { announcement } = this.state;
      paragraphArr = parseDescript(announcement);
      imageArr = announcement.imgPath;
      regRequired = announcement.registerFields? true: false;
    }

    return (
      <div className="event_page_content">
        <div className="event_page">
          <div>
            <h1 id="event_title">{title}</h1>
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
            {paragraphArr.map((paragraph) => (
              <p>{paragraph}</p>
            ))}
          </div>
          {imageArr.map((imagePath) => (
            <div>
              <img
                className="event_image"
                src={imagePath}
                alt="Failed to load the resource"
              />
            </div>
          ))}
          <div id="SurveyPart">
            <div>
              <h2 className="event_section_title">Registration Form</h2>
            </div>
            {annou<Event_register />}
            <div>
              <h2 className="event_section_title">Pre-event Survey</h2>
            </div>
            <SurveyQuestion />
            <SurveyQuestion />
            <SurveyQuestion />
            <FreeResponseQuestion />
          </div>

          <div id="submit_button">
            <Button type="submit" variant="contained" color="primary">
              Register & Submit
            </Button>
          </div>
          <div className="bottom_padder" />
        </div>

        <div className="commentSection">
          <div id="CommentsContainer">
            {/* <DiscussionBoard comments={this.state.comments[0]}></DiscussionBoard>
                        <DiscussionBoard comments={this.state.comments[1]}></DiscussionBoard> */}
            {this.state.comments.map((comment) => (
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
              <button className="comment-submit" onClick={this.post_comment}>
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

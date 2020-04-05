import React from "react";
import Surveys from "../Surveys/index.js";

import "./style.css";
import Posts from "../Posts";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import { getAnnouncementList } from "../../actions/user";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/");
  }

  state = {
    announcements: [],
  };

  componentDidMount() {
    getAnnouncementList(this.props.app, this);
  }

  renderAnnouncementAbstract = (announcement) => {
    const title = announcement.title;
    const text_content = announcement.text_content;
    console.log(text_content);
    const paragraphs = text_content
      .trim()
      .split(/\n+/)
      .map((p) => p.trim());
    const firstParagraph = paragraphs.length > 0 ? paragraphs[0] : "";
    return (
      <Link
        underline="none"
        component={RouterLink}
        to={{ pathname: "/event", state: { ...announcement } }}
      >
        <Posts title={title} paragraph={firstParagraph} />;
      </Link>
    );
  };

  render() {
    return (
      <div className="home_pg">
        <div id="title-container">
          <div id="Welcome-section">
            <h1 id="Welcome">Welcome to UTACG survey center</h1>
            <p>Your opinion is valuable to us</p>
          </div>
        </div>
        <div id="homePosts">
          {this.state.announcements.map((announcement) => {
            return this.renderAnnouncementAbstract(announcement);
          })}
          {/* <Link underline="none" component={RouterLink} to="/event">
            <Posts />
          </Link>

          <Link underline="none" component={RouterLink} to="/survey">
            <Surveys />
          </Link>
          <Link underline="none" component={RouterLink} to="/postid=3">
            <Posts />
          </Link>
          <Link underline="none" component={RouterLink} to="/your-target-path">
            <Posts />
          </Link> */}
        </div>
        <div id="bottom-padding" />
      </div>
    );
  }
}

export default Home;

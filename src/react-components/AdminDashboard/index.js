import React from "react";
import DashboardSidebar from "../DashboardSidebar";
import Posts from "../Posts";
import DashboardAddButtons from "../DashboardAddButtons";
import Surveys from "../Surveys/index.js";

import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { getAnnouncementList } from "../../actions/user";

import "./style.css";

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    if (!this.props.app.state.navBarHidden) {
      this.props.app.setState({ navBarHidden: true });
    }
    this.props.history.push("/admin");
  }

  state = {
    greeting: null,
    announcements: []
  };

  admain_status = 1;

  componentDidMount() {
    // Remove navbar
    // const nav_bar = document.getElementById('Navigation-bar')
    // if (nav_bar != null) {
    //     nav_bar.parentNode.removeChild(nav_bar)
    // }

    // Get greetings according to time of the day
    const date = new Date();
    const hour = date.getHours();
    let greeting = null;
    if (hour < 12) {
      greeting = "Good morning";
    } else if (hour >= 18) {
      greeting = "Good evening";
    } else {
      greeting = "Good afternoon";
    }
    this.setState({ greeting });
    getAnnouncementList(this.props.app, this);
  }

  renderAnnouncementAbstract = announcement => {
    const title = announcement.title;
    const text_content = announcement.text_content;
    console.log(text_content);
    const paragraphs = text_content
      .trim()
      .split(/\n+/)
      .map(p => p.trim());
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
    const { greeting } = this.state;
    const { user, history, app } = this.props;
    const { username } = user;

    return (
      <div id="admin_dashboard">
        <div id="sidebar">
          <DashboardSidebar app={app} history={history} />
        </div>
        <div>
          <img id="background_image" src={require("./images/shoko.png")} />
        </div>
        <h3 id="admin_greet">
          {greeting}, {username}!
        </h3>
        <div id="add_buttons">
          <DashboardAddButtons />
        </div>
        <div id="posts">
          {this.state.announcements.map(announcement => {
            return this.renderAnnouncementAbstract(announcement);
          })}
        </div>
      </div>
    );
  }
}

export default AdminDashboard;

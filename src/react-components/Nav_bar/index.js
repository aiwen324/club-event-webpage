import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import "./style.css";

class Navbar extends React.Component {
  render() {
    const { user, navBarHidden } = this.props;

    let name = "";
    if (!user) {
      name = "Sign in";
    } else {
      name = user.username;
    }

    return (
      <div id="Navigation-bar" style={navBarHidden ? { display: "none" } : {}}>
        <div id="accountInfo">
          <Link to="/login" component={RouterLink}>
            {name}
          </Link>
        </div>
        <ul>
          <li>
            <Link id="link" to="/" component={RouterLink}>
              Home
            </Link>
          </li>
          <li>
            {/* <Link id="link" h component={RouterLink}>
              Announcement
            </Link> */}
            <a href="#homePosts">Announcements</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;

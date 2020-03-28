import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Button, CssBaseline } from "@material-ui/core";
import "./style.css";

class Navbar extends React.Component {
  render() {
    const { user, navBarHidden } = this.props;

    let logOutButton;

    let name = "";
    if (!user) {
      name = "Sign in";
      logOutButton = null;
    } else {
      name = user.username;
      logOutButton = <Button>Log Out</Button>;
    }

    return (
      <div id="Navigation-bar" style={navBarHidden ? { display: "none" } : {}}>
        <div id="accountInfo">
          <Link to="/login" component={RouterLink}>
            {name}
          </Link>
          {logOutButton}
        </div>
        <ul>
          <li>
            <Link id="link" to="/" component={RouterLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="#homePosts">Announcements</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;

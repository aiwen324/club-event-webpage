import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Button, CssBaseline } from "@material-ui/core";
import "./style.css";
import { logout } from "../../actions/login_auth";

class Navbar extends React.Component {
  render() {
    const { user, navBarHidden } = this.props;

    let logOutButton;
    let loginLink;
    let name = "";
    if (!user) {
      name = "Sign in";
      logOutButton = null;
      loginLink = (
        <Link to="/login" component={RouterLink}>
          {name}
        </Link>
      );
    } else {
      name = user.username;
      logOutButton = (
        <Link
          href="#"
          onClick={e => {
            e.preventDefault();
            logout(this.props.app);
          }}
        >
          Log Out
        </Link>
      );
      const link = user.accountType === 0 ? "/" : "admin";
      loginLink = (
        <Link to={link} component={RouterLink}>
          {name}
        </Link>
      );
    }
    return (
      <div id="Navigation-bar" style={navBarHidden ? { display: "none" } : {}}>
        <ul id="accountInfo">
          <li>{loginLink}</li>
          <li>{logOutButton}</li>
        </ul>
        <ul>
          <li>
            <Link id="link" to="/" component={RouterLink}>
              Home
            </Link>
          </li>
          {/* <li>
            <Link href="/#homePosts">Announcements</Link>
          </li> */}
        </ul>
      </div>
    );
  }
}

export default Navbar;

import React from "react";
import "./App.css";

import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "./react-components/Home";
import SignIn from "./react-components/Login";
import Navbar from "./react-components/Nav_bar";
import EventPage from "./react-components/EventPage";
import SurveyPage from "./react-components/SurveyPage";
import AdminEdit from "./react-components/Admin_edit";
import AdminDashboard from "./react-components/AdminDashboard";
import SignUp from "./react-components/SignUp";
import AdminEventPage from "./react-components/AdminEventPage/index.js";
import AdminSurveyPage from "./react-components/AdminSurvey/index.js";
import { readCookie } from "./actions/login_auth";

class App extends React.Component {
  constructor(props) {
    super(props);
    readCookie(this);
  }

  state = {
    currentUser: null,
    navBarHidden: false,
  };

  componentDidUpdate() {
    // console.log("Current User when update", this.state.currentUser);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar
            user={this.state.currentUser}
            navBarHidden={this.state.navBarHidden}
            app={this}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={({ history }) => <Home history={history} />}
            />
            <Route
              exact
              path={["/admin", "/login"]}
              render={({ history }) => {
                if (!this.state.currentUser) {
                  return <SignIn history={history} app={this} />;
                } else if (this.state.currentUser.accountType === 1) {
                  console.log("Get here");
                  return (
                    <AdminDashboard
                      app={this}
                      history={history}
                      displayName={this.state.userDisplayName}
                      user={this.state.currentUser}
                    />
                  );
                } else if (this.state.currentUser.accountType === 0) {
                  return <Home history={history} />;
                }
              }}
            />
            <Route
              exact
              path="/signUp"
              render={({ history }) => <SignUp history={history} />}
            />
            <Route
              exact
              path="/event"
              render={({ location }) => (
                <EventPage app={this} location={location} />
              )}
            />
            <Route exact path="/survey" render={() => <SurveyPage />} />
            <Route
              exact
              path="/admin/edit_announce"
              render={({ history }) => <AdminEdit history={history} />}
            />
            <Route
              exact
              path="/adminEventPage"
              render={() => <AdminEventPage />}
            />
            <Route
              exact
              path="/adminSurveyPage"
              render={() => <AdminSurveyPage />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

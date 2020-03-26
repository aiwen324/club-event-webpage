import React from 'react';
import './App.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './react-components/Home'
import SignIn from './react-components/Login'
import Navbar from './react-components/Nav_bar'
import EventPage from './react-components/EventPage'
import SurveyPage from './react-components/SurveyPage'
import AdminEdit from './react-components/Admin_edit'
import AdminDashboard from './react-components/AdminDashboard'
import AdminEventPage from './react-components/AdminEventPage/index.js'
import AdminSurveyPage from './react-components/AdminSurvey/index.js'

const handle = (app) => (userId, userName, userDisplayName, admin) => {
  app.setState({
    userId: userId,
    userName: userName,
    userDisplayName: userDisplayName,
    admin: admin
  })
  console.log("Login successful")
}


class App extends React.Component {

  state = {
    userId: null,
    userName: "",
    userDisplayName: "",
    admin: false,
    currentUser: null,
    navBarHidden: false
  }

  componentDidUpdate() {
    console.log("Current User when update", this.state.currentUser)
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Navbar
          user={this.state.currentUser}
          navBarHidden={this.state.navBarHidden}
        />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() =>
              (<Home />)} />
            <Route exact path={['/admin', '/login']}
              render={({ history }) => {
                if (!this.state.currentUser) {
                  return (<SignIn handle={handle(this)} app={this} />)
                }
                else if (this.state.currentUser.account_type === 'admin') {
                  console.log("Get here");
                  return (<AdminDashboard app={this} history={history} displayName={this.state.userDisplayName} user={this.state.currentUser} />)
                } else if (this.state.currentUser.account_type === 'standard') {
                  return (<Home />)
                }
              }}
            />
            <Route exact path='/event' render={() =>
              (<EventPage />)
            } />
            <Route exact path='/survey' render={() =>
              (<SurveyPage />)
            } />
            <Route exact path='/admin/edit_announce' render={
              () => (<AdminEdit />)
            } />
            {/* <Route exact path='/admin' render={({ history }) =>
              (<AdminDashboard history={history} displayName={this.state.userDisplayName} user={this.state.currentUser} />)
            } /> */}
            <Route exact path='/adminEventPage' render={() =>
              (<AdminEventPage />)} />
            <Route exact path='/adminSurveyPage' render={() =>
              (<AdminSurveyPage />)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

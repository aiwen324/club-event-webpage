import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './react-components/Home'
import Login from './react-components/Login'
import Navbar from './react-components/Nav_bar'
import EventPage from './react-components/EventPage'
import SurveyPage from './react-components/SurveyPage'
import AdminEdit from './react-components/Admin_edit'
import AdminDashboard from './react-components/AdminDashboard'
import AdminEventPage from './react-components/AdminEventPage/index.js'
import AdminSurveyPage from './react-components/AdminSurvey/index.js'

const handle = (app) => (userId, userName, userDisplayName, admin) => {
  app.setState({
    ['userId']: userId,
    ['userName']: userName,
    ['userDisplayName']: userDisplayName,
    ['admin']: admin
  })
  console.log("Login successful")
}


class App extends React.Component {

  state = {
    userId: null,
    userName: "", 
    userDisplayName: "",
    admin: false,
  }

  render() {
    return (
      <div className="App">
        <Navbar displayName={this.state.userDisplayName}/>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => 
                            (<Home/>)}/>
            <Route exact path='/login/' 
                        render={() => (<Login handle={handle(this)}/>)}
                        />
            <Route path='/postid=:id' render={() => (<Login/>)} />
            <Route exact path='/event' render={() =>
                            (<EventPage/>)
            }/>
            <Route exact path='/survey' render={() =>
                            (<SurveyPage/>)
            }/>
            <Route exact path='/admin/edit_announce' render={
              ()=>(<AdminEdit/>)
            }/>
            <Route exact path='/admin' render={() =>
                            (<AdminDashboard displayName={this.state.userDisplayName}/>)
            }/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

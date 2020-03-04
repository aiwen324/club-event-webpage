import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './react-components/Home'
import Login from './react-components/Login'
import Navbar from './react-components/Nav_bar'
import EventPage from './react-components/EventPage'
import SurveyPage from './react-components/SurveyPage'
import AdminDashboard from './react-components/AdminDashboard'
import AdminEventPage from './react-components/AdminEventPage/index.js'
import AdminSurveyPage from './react-components/AdminSurvey/index.js'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => 
                          (<Home/>)}/>
          <Route exact path='/login/' render={() =>
                          (<Login/>)}/>
          <Route path='/postid=:id' render={() => (<Login/>)} />
          <Route exact path='/event' render={() =>
                          (<EventPage/>)
          }/>
          <Route exact path='/survey' render={() =>
                          (<SurveyPage/>)
          }/>
          <Route exact path='/admin' render={() =>
                          (<AdminDashboard/>)
          }/>
          <Route exact path='/adminEventPage' render={() =>
                          (<AdminEventPage/>)
          }/>
          <Route exact path='/adminSurveyPage' render={() =>
                          (<AdminSurveyPage/>)
          }/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

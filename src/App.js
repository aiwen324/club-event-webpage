import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './react-components/Home'
import Login from './react-components/Login'
import EventPage from './react-components/EventPage'

function App() {
  return (
    <div className="App">
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

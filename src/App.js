import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './react-components/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => 
                          (<Home/>)}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import firebase from 'firebase';
import './App.css';

import Navbar from '../../Components/Navbar/Navbar';
import LandingPage from '../LandingPage/LandingPage';
import Dashboard from '../Dashboard/Dashboard';

createBrowserHistory();

const config = {
  apiKey: 'AIzaSyCYPz3TccePYGO17K_a3S7rsVbYyS2Shiw',
  authDomain: 'language-tutor-a1bdd.firebaseapp.com',
  databaseURL: 'https://language-tutor-a1bdd.firebaseio.com',
  projectId: 'language-tutor-a1bdd',
  storageBucket: 'language-tutor-a1bdd.appspot.com',
  messagingSenderId: '829609721946',
};
firebase.initializeApp(config);

const PageNotFound = () => (
  <div className="container">
    <h1 className="glitch" data-text="Page Not Found">
      Page Not Found
    </h1>
  </div>
);

const App = () => (
  <div className="App">
    {/*eslint-disable */}
    <Router history={history}>
      {/* eslint-enable */}
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={Dashboard} />

          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;

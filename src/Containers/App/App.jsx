import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import './App.css';

import Navbar from '../../Components/Navbar/Navbar';
import LandingPage from '../LandingPage/LandingPage';
import Dashboard from '../Dashboard/Dashboard';
import AuthContainer from '../../Containers/AuthContainer/AuthContainer';
import About from '../../Components/About/About';
import Contact from '../../Components/Contact/Contact';

import appCreateStore from '../../Lib/app-create-store';

createBrowserHistory();
const store = appCreateStore();

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
  <Provider store={store}>
    <div className="App">
      {/*eslint-disable */}
      <Router history={history}>
        {/* eslint-enable */}
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/teacherSignup" component={AuthContainer} />
            <Route exact path="/Signup" component={AuthContainer} />
            <Route exact path="/Login" component={AuthContainer} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Contact" component={Contact} />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  </Provider>
);

export default App;

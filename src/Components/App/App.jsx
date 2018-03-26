import React from 'react';

import firebase from 'firebase';
import './App.css';

const config = {
  apiKey: 'AIzaSyCYPz3TccePYGO17K_a3S7rsVbYyS2Shiw',
  authDomain: 'language-tutor-a1bdd.firebaseapp.com',
  databaseURL: 'https://language-tutor-a1bdd.firebaseio.com',
  projectId: 'language-tutor-a1bdd',
  storageBucket: 'language-tutor-a1bdd.appspot.com',
  messagingSenderId: '829609721946',
};
firebase.initializeApp(config);

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome</h1>
    </header>
    <p className="App-intro">Hello group!</p>
  </div>
);

export default App;

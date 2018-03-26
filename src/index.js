import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/Containers/App/App';
import registerServiceWorker from './registerServiceWorker';

/*eslint-disable */
ReactDOM.render(<App />, document.getElementById("root"));
/* eslint-enable */

registerServiceWorker();

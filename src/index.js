import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/Containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';


import appCreateStore from './Lib/app-create-store';

const store = appCreateStore();
/*eslint-disable */
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
/* eslint-enable */

registerServiceWorker();

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../Reducer';
import thunk from './redux-thunk';
import reporter from './redux-reporter';

const appStoreCreate = () =>
  createStore(reducer, undefined, compose(applyMiddleware(thunk, reporter)));

export default appStoreCreate;

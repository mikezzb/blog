import React from 'react';
import ReactDOM from 'react-dom';
import { register } from 'register-service-worker';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import configureStore from './store';
import loadBlog from './store/Blog';
import { SERVER_URI } from './constants/config';

// axios.defaults.baseURL = 'http://localhost:5000/'; // for local
axios.defaults.baseURL = SERVER_URI; // for deploy
// axios.defaults.headers.common.Authorization = AUTH_TOKEN;

const SKIP = { dateBefore: '2030-05-17T12:18:08.801+00:00' };
const store = configureStore();
store.dispatch(loadBlog(SKIP) as any);
ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root')
);
const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
register(swUrl);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { register } from 'register-service-worker';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import configureStore from './store';
import loadBlog from './store/Blog';

// axios.defaults.baseURL = 'http://localhost:5000/'; // for local
axios.defaults.baseURL = 'https://nhfxrk08p1.execute-api.ap-northeast-1.amazonaws.com/dev/'; // for deploy
// axios.defaults.headers.common.Authorization = AUTH_TOKEN;

const SKIP = { dateBefore: '2030-05-17T12:18:08.801+00:00' };
const store = configureStore();
store.dispatch(loadBlog(SKIP));
ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root')
);
register();

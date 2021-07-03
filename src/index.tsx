import ReactDOM from 'react-dom';
import { register } from 'register-service-worker';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './App';
import store from './store';
import { SERVER_URI } from './constants/config';

// axios.defaults.baseURL = 'http://localhost:5000/'; // for local
axios.defaults.baseURL = SERVER_URI; // for deploy
// axios.defaults.headers.common.Authorization = AUTH_TOKEN;

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root'),
);
const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
register(swUrl);

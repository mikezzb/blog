import React, { useState, useReducer } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { USER_LOGIN, USER_CREATE } from '../constants/apis';
import * as actions from '../store/user/actions';

const ERRORS = Object.freeze({
  WRONG_PASSWORD: 0,
  USER_DNE: 1,
});

const Login = ({ displayLogin, handler }) => {
  const [isLogin, setIsLogin] = useState(false);

  const [form, dispatchForm] = useReducer(
    (state, action) => ({ ...state, ...action }),
    {
      email: '',
      password: '',
      username: '',
      iconURL: '',
    }
  );

  const onSubmit = e => {
    e.preventDefault();
    let user;
    if (isLogin) {
      user = {
        email: form.email,
        password: form.password,
      };
    }
    else {
      user = {
        email: form.email,
        password: form.password,
        username: form.username,
        iconURL: form.iconURL || 'https://pbs.twimg.com/media/CdnxG1vXEAACpY7?format=jpg&name=240x240',
      };
    }

    let serverResponse;

    axios.post(isLogin ? USER_LOGIN : USER_CREATE, user)
      .then(res => {
        serverResponse = res.data;
        if (isLogin) {
          if (serverResponse === ERRORS.WRONG_PASSWORD || serverResponse === ERRORS.USER_DNE) {
            alert(serverResponse === ERRORS.WRONG_PASSWORD ? 'Wrong Password' : 'Email account does not exist');
          }
          else { // loggedIn is true
            serverResponse = JSON.parse(serverResponse);
            Cookies.set('loggedInUser', serverResponse, { expires: 1 });
            displayLogin(serverResponse);
            alert(`Logged in as ${serverResponse.username}`);
          }
        }
        else {
          Cookies.set('loggedInUser', user, { expires: 1 });
          displayLogin(user);
          alert(`Sign up successfully as ${user.username}`);
        }
      })
      .catch(error => {
        alert(error);
      });

    dispatchForm({
      email: '',
      password: '',
      username: '',
    });
    handler();// to close the view
  };

  const switchMessage = isLogin ? 'Not having an account? ' : 'Got an account? ';
  const switchLabel = isLogin ? 'Log in' : 'Sign up';
  const usernameField = [
    <div className="form-group" key="usernameInputField">
      <input
        type="text"
        required
        className="form-control"
        placeholder="Username"
        value={form.username}
        onChange={e => dispatchForm({ username: e.target.value })}
        style={{ flexGrow: '1' }}
      />
    </div>,
  ];
  const iconURLField = [
    <div className="form-group">
      <input
        type="string"
        className="form-control"
        placeholder="User Icon URL (optional)"
        value={form.iconURL}
        onChange={e => dispatchForm({ iconURL: e.target.value })}
        style={{ flexGrow: '1' }}
      />
    </div>,
  ];
  return (
    <div className="loginWrapper">
      <div className="loginCard">
        <div className="divider">
          <div className="tagLogin">{switchLabel}</div>
          <div className="crossIcon" onClick={() => handler()} style={{ cursor: 'pointer' }}>
            X
          </div>
        </div>
        <form onSubmit={onSubmit} style={{}}>
          {isLogin ? null : usernameField}
          {' '}
          {/* not displaying usernameField if login */}
          <div className="form-group">
            <input
              type="email"
              required
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={e => dispatchForm({ email: e.target.value })}
              style={{ flexGrow: '1' }}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              required
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={e => dispatchForm({ password: e.target.value })}
              style={{ flexGrow: '1' }}
            />
          </div>
          {isLogin ? null : iconURLField}
          {' '}
          {/* not displaying usernameField if login */}
          <div className="form-group-submit">
            <input type="submit" value={switchLabel} className="submitButton" />
          </div>
          <div className="switchLogin">
            <p>{`${switchMessage} `}</p>
            <div className="clickMe" onClick={() => setIsLogin(!isLogin)}>{'Click me >.<'}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  displayLogin: user => {
    dispatch(actions.displayLogin(user));
  },
});

export default connect(null, mapDispatchToProps)(Login);

import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {
  ArticlePage,
  EditPage,
  HomePage
} from './pages';
import * as actions from './store/user/actions';

const App = props => (
  <div className="app">
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage
            {...props}
          />
        </Route>
        <Route exact path="/article/:id">
          <ArticlePage {...props} />
        </Route>
        <Route exact path="/edit">
          <EditPage {...props} />
        </Route>
      </Switch>
    </Router>
  </div>
);

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(actions.logout());
  },
});

export default connect(null, mapDispatchToProps)(App);

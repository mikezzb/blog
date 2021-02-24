import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import ArticleView from './components/ArticleView';
import BlockView from './components/BlockView';
import EditorView from './components/EditorView';
import * as actions from './store/user/actions';

const App = props => (
  <div className="app">
    <Router>
      <Switch>
        <Route exact path="/">
          <BlockView
            {...props}
          />
        </Route>
        <Route exact path="/article/:id">
          <ArticleView {...props} />
        </Route>
        <Route exact path="/edit">
          <EditorView {...props} />
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

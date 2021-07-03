import './App.css';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  ArticlePage,
  EditPage,
  HomePage,
} from './pages';

const App = () => (
  <div className="app">
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/article/:id">
          <ArticlePage />
        </Route>
        <Route exact path="/edit">
          <EditPage />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;

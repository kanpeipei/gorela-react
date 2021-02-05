import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './index.scss';
import TopComponent from "./Top";
import LoginComponent from "./Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TopComponent />
        </Route>
        <Route path="/login">
          <LoginComponent />
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


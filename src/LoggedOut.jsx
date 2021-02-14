import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TopComponent from "./Top";
import LoginComponent from "./Login";
import RegisterComponent from "./Register";

const LoggedOutComponent = (props) => {
  return (
    <Switch>
      <Route exact path="/">
        <TopComponent />
      </Route>
      <Route path="/login">
        <LoginComponent setIsLogin={props.setIsLogin} />
      </Route>
      <Route path="/register">
        <RegisterComponent setIsLogin={props.setIsLogin} />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}

export default LoggedOutComponent;
import React from 'react';
import {
  Switch,
  Route,
  Router,
  Redirect,
} from "react-router-dom";
import MenuComponent from "./Menu";
import ListComponent from "./List";
import DetailComponent from "./Detail";
import AccountComponent from "./Account";

const LoggedInComponent = (props) => {
  return (
    <div>
      <MenuComponent setIsLogin={props.setIsLogin} />
      <div className="isMenuVisible">
        <Switch>
          <Route exact path="/">
            <ListComponent />
          </Route>
          <Route path="/detail/:id">
            <DetailComponent />
          </Route>
          <Route path="/account/:id">
            <AccountComponent />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default LoggedInComponent;
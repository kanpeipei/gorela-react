import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import MenuComponent from "./Menu";
import ListComponent from "./List";

const LoggedInComponent = (props) => {
  return (
    <div>
      <MenuComponent setIsLogin={props.setIsLogin} />
      <div className="isMenuVisible">
        <Switch>
          <Route path="/list">
            <ListComponent />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default LoggedInComponent;
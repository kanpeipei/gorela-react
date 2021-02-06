import React from 'react';
import MenuComponent from "./Menu";

const LoggedInComponent = (props) => {
  return (
    <MenuComponent setIsLogin={props.setIsLogin} />
  )
}

export default LoggedInComponent;
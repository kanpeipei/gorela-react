import React from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Menu.scss';
import LogoComponent from "./Logo";

const MenuComponent = (props) => {

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    props.setIsLogin(false);
  }


  return (
    <div className="menu-Container center">
      <div className="menu-Container_Inner">
        <div className="menu-Container_Title center">
          <LogoComponent />
        </div>
        <Link
          to="create"
          className="menu-Container_Create card center"
        >
          <p>タスク作成</p>
        </Link>
        <div className="menu-Container_Items card">
          <Link
            to="list"
            className="menu-Container_Item center"
          >
            <p>リスト</p>
          </Link>
          <Link
            to="ranking"
            className="menu-Container_Item center"
          >
            <p>人気</p>
          </Link>
          <Link
            to="account"
            className="menu-Container_Item center"
          >
            <p>アカウント</p>
          </Link>
          <Link to="" onClick={logout} className="menu-Container_Item center">
            <p>ログアウト</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MenuComponent;

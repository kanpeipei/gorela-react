import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Top.scss';

const TopComponent = () => {
  return (
    <div className="top-MainVisual">
      <div className="top-MainVisual_Cards">
        <a className="top-MainVisual_LeftCard card center">
          <h1>タスクの共有を<br />社内から世界へ</h1>
        </a>
        <div className="top-MainVisual_RightCards">
          <Link to="/login" className="top-MainVisual_LoginCard card center">
            ログイン
          </Link>
          <a className="top-MainVisual_RegisterCard card center">
            新規登録
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopComponent;

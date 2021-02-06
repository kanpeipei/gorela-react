import React from 'react';
import {
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
          <Link to="/register" className="top-MainVisual_RegisterCard card center">
            新規登録
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopComponent;

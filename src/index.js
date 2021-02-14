import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import './index.scss';
import LoggedOutComponent from "./LoggedOut";
import LoggedInComponent from "./LoggedIn";

const App = () => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      {isLogin
      ? <LoggedInComponent setIsLogin={setIsLogin} />
      : <LoggedOutComponent setIsLogin={setIsLogin} />}
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default App;


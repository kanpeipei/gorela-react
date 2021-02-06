import React, { useState } from 'react';
import {Link} from "react-router-dom";
import './Login.scss';
import LogoComponent from './Logo';
import FormErrorComponent from "./FormError";
import InputTextComponent from './InputText';
import InputPasswordComponent from './InputPassword';
import SubmitButtonComponent from "./SubmitButton";
import httpPost from "./functions/http";

const LoginComponent = (props) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginError, setIsLoginError] = useState(false);

  const login = () => {
    const data = {
      username: username,
      password: password,
    };

    //エラーの初期化
    setIsLoginError(false);

    httpPost('login', data)
    .then((data) => {
      if(data.detail){
        if(data.detail[0] === "Unable to log in with provided credentials."){
          setIsLoginError(true);
          return;
        }
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_id', data.user_id);
      props.setIsLogin(true);
    });
  }

  return (
    <div className="login-Main center">
      <div className="login-Main_Card card">
        <div className="login-Main_Title">
          <Link to="/">
            <LogoComponent />
          </Link>
        </div>
        <div className="login-Main_Border"></div>
        <FormErrorComponent
          isError={isLoginError}
          errorSentence="ユーザーネーム、またはパスワードが間違っています。"
        />
        <div className="login-Main_Form">
          <form>
            <InputTextComponent placeholder='ユーザーネーム' value={username} onChange={setUsername} />
            <InputPasswordComponent placeholder='パスワード' value={password} onChange={setPassword} />
            <SubmitButtonComponent text="ログイン" onClick={login} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent;

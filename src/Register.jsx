import React, { useState } from 'react';
import {Link} from "react-router-dom";
import './Register.scss';
import LogoComponent from './Logo';
import FormErrorComponent from "./FormError";
import InputTextComponent from './InputText';
import InputPasswordComponent from './InputPassword';
import SubmitButtonComponent from "./SubmitButton";
import {httpPost} from "./functions/http";

const RegisterComponent = (props) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const register = () => {
    const inputData = {
      username: username,
      password: password,
    };

    //エラーの初期化
    setIsUsernameError(false);
    setIsPasswordError(false);

    // パスワードが確認用と一致しない場合
    if(password !== passwordConfirm){
      setIsPasswordError(true);
      return;
    }

    httpPost('users/signup', inputData)
    .then((res) => {
      if(res.username[0] === "accounts with this username already exists."){
        setIsUsernameError(true);
        return;
      }
      httpPost('login', inputData)
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user_id);
        props.setIsLogin(true);
      });
    });
  }

  return (
    <div className="register-Main center">
      <div className="register-Main_Card card">
        <div className="register-Main_Title">
          <Link to="/">
            <LogoComponent />
          </Link>
        </div>
        <div className="register-Main_Border"></div>
        <FormErrorComponent
          isError={isUsernameError}
          errorSentence="※このユーザーネームは既に使用されています。"
        />
        <FormErrorComponent
          isError={isPasswordError}
          errorSentence="※パスワードが一致していません。"
        />
        <div className="register-Main_Form">
          <form>
            <InputTextComponent placeholder='ユーザーネーム' value={username} onChange={setUsername} />
            <InputPasswordComponent placeholder='パスワード' value={password} onChange={setPassword} />
            <InputPasswordComponent placeholder='パスワード(確認用)' value={passwordConfirm} onChange={setPasswordConfirm} />
            <SubmitButtonComponent text="新規登録" onClick={register} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponent;

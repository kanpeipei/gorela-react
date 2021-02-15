import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import './AccountEdit.scss';
import FormErrorComponent from "./FormError";
import InputTextComponent from './InputText';
import TextareaComponent from "./Textarea";
import InputPasswordComponent from './InputPassword';
import SubmitButtonComponent from "./SubmitButton";
import {httpGet, httpPost, httpPut} from "./functions/http";

const AccountEditComponent = (props) => {
  let {id} = useParams();
  const userId = id;
  const [username, setUsername] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    httpGet(`users/${userId}/edit`)
    .then((result) => {
      setUsername(result.username);
      setIntroduction(result.introduction);
    });
  }, []);

  const edit = () => {

    const user = {
      username: username,
      introduction: introduction,
    };

    httpPut(`users/${userId}/edit`, user)
    .then((res) => {
      httpPost('login', {username: username, password:password})
      .then((data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user_id);
      });
    })

  }

  return (
    <div className="userEdit-Main center">
      <div className="userEdit-Main_Card card">
        <div className="userEdit-Main_Border"></div>
        <div className="userEdit-Main_Form">
          <form>
            <div className="userEdit-Main_Name">
              <InputTextComponent placeholder='ユーザーネーム' value={username} onChange={setUsername} />
            </div>
            <div className="userEdit-Main_Introduction">
              <TextareaComponent placeholder='自己紹介' value={introduction} onChange={setIntroduction} />
            </div>
            <div className="userEdit-Main_Password">
              <InputPasswordComponent placeholder='パスワードを入力してください。（必須）' value={password} onChange={setPassword} />
            </div>
            <div className="userEdit-Main_Button">
              <SubmitButtonComponent text='編集完了' onClick={edit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AccountEditComponent;

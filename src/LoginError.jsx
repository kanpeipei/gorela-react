import React, { useEffect, useState } from 'react';

const LoginErrorComponent = (props) => {
  const isRightUser = props.isRightUser;
  if(!isRightUser){
    return <p className="login-Main_Error">ユーザーネーム、またはパスワードが間違っています。</p>;
  }
  else{
    return null;
  }
}

export default LoginErrorComponent;
import React from 'react';

const FormErrorComponent = (props) => {
  const isError = props.isError;
  const errorSentence = props.errorSentence;
  if(isError){
    return <p className="formError">{errorSentence}</p>;
  }
  else{
    return null;
  }
}

export default FormErrorComponent;
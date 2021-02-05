import React, { useEffect, useState } from 'react';

const SubmitButtonComponent = (props) => {
  return (
    <button type="button" onClick={() => props.onClick()} >{props.text}</button>
  )
}

export default SubmitButtonComponent;

import React, { useEffect, useState } from 'react';

const InputPasswordComponent = (props) => {
  return (
    <input
      type="password"
      value={props.value}
      placeholder={props.placeholder}
      onChange={event => props.onChange(event.target.value)}
    />
  )
}

export default InputPasswordComponent;

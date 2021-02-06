import React from 'react';

const InputTextComponent = (props) => {
  return (
    <input
      type="text"
      value={props.value}
      placeholder={props.placeholder}
      onChange={event => props.onChange(event.target.value)}
    />
  )
}

export default InputTextComponent;

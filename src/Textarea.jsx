import React from 'react';

const TextareaComponent = (props) => {
  return (
    <textarea
      type="text"
      value={props.value}
      placeholder={props.placeholder}
      onChange={event => props.onChange(event.target.value)}
    ></textarea>
  )
}

export default TextareaComponent;

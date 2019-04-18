import React from 'react';
import './Input.scss';

export function Input(props) {

  return (
      <input 
        value={props.value} 
        onChange={props.onChange}
        className="rt-input" 
        type={props.type} 
        placeholder={props.placeholder}
        required={props.required} 
      />
  );
}
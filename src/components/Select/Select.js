import React from 'react';
import './Select.scss';

export function Select(props) {

  return (
      <select 
        value={props.value}
        onChange={props.onChange}
        className="rt-select"
        placeholder={props.placeholder}
        required={props.required}
      >
        {props.children}
      </select>
  );
}
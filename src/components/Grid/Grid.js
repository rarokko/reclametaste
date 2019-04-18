import React from 'react';
import './Grid.scss';

export function Grid(props) {

  return (
    <div
      className="rt-grid-container"
    >
      {props.children.map((item, index) => {
        return(
          <div className="rt-grid-item" key={`item_${index}`}>
            {item}
          </div>
        )
      })}
    </div>
  );
}
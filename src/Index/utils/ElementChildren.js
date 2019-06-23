import React from 'react';

function map(children, func) {
  let index = 0;

  return React.Children.map(children, child =>
    React.isValidElement(child) ? func(child, index++) : child,
  );
}

function forEach(children, func) {
  let index = 0;
  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) func(child, index++);
  });
}

export { map, forEach };

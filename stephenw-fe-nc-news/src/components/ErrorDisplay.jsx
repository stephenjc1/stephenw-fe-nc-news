import React from 'react';

const ErrorDisplay = (props) => {
  if (props.status === 404) {
    return (
      <p>Error! Code:{props.status}, {props.message}</p>
    );
  } else if (props.status === 400) {
    return (
      <p>Error! Code:{props.status}, {props.message}</p>
    )
  }
};

export default ErrorDisplay;
import React from 'react';
//TOOK SOME EXAMPLE FROM THE INTERNET>>>>
const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
    width: '90%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 20,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    transition: 'width 1s ease-in-out',
    borderRadius: 'inherit',
    textAlign: 'right',
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
import React from 'react'

const Notification = ({ message, error }) => {
  const regularStyle = {
    border: '2px solid green',
    fontStyle: 'bold',
    fontSize: 18,
    padding: '5px',
    margin: '10px',
  }
  const errorStyle = {
    border: '1px solid red',
    backgroundColor: 'bisque',
    fontStyle: 'bold',
    fontSize: 18,
    padding: '5px',
    margin: '10px',
  }
  let styleType = regularStyle

  if (message === '') {
    return null
  } else {
    styleType = error ? errorStyle : regularStyle
    return <div id="notification" style={styleType}>{message}</div>
  }
}

export default Notification

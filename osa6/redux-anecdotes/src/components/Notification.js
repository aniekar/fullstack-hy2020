import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const defaultStyle = {
    border: 'solid',
    padding: 10,
    margin: 5,
    borderWidth: 1
  }

  const invisibleStyle = {
    display: 'none'
  }

  const notification = useSelector(state => state.notification)
  const style = notification.message === '' ? invisibleStyle : defaultStyle
  
  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
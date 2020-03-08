import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log(notification)

  const defaultStyle = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    color: notification.success === true ? 'green' : 'red',
    background: 'bisque'
  }

  const invisibleStyle = {
    display: 'none'
  }

  const style = notification.message === '' ? invisibleStyle : defaultStyle

  return <div style={style}>{notification.message}</div>
}

export default Notification

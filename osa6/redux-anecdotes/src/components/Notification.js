import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const defaultStyle = {
    border: 'solid',
    padding: 10,
    margin: 5,
    borderWidth: 1
  }

  const invisibleStyle = {
    display: 'none'
  }

  const notification = props.notification
  const style = notification.message === '' ? invisibleStyle : defaultStyle

  return <div style={style}>{notification.message}</div>
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)

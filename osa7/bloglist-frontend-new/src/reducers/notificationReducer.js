const initialState = {
    message: '',
    success: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
        return {
            message: action.message,
            success: action.success
          }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

let timeoutId

export const setNotification = (message, success, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      success
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time * 1000)
  }
}

export const clearNotification = id => ({ type: 'CLEAR_NOTIFICATION' })

export default reducer

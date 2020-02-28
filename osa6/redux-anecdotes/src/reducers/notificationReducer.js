const initialState = {
    message: ''
  }

  const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_NOTIFICATION':
        return {
          message: action.message,
        }
      case 'CLEAR_NOTIFICATION':
      return initialState
      default:
        return state
    }
  }
  
  export const showNotification = (message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        message
      }
  }

//   export const clearNotification = () => {
//       return {
//           type: 'CLEAR_NOTIFICATION'
//       }
//   }
  
  export default notificationReducer
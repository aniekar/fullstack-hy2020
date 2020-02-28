export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

const initialstate = {
  filter: ''
}
const filterReducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      console.log(action.filter)
      return action.filter.toUpperCase()
    default:
      return state
  }
}

export default filterReducer

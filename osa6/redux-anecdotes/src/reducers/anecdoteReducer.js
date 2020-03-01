import anecdoteService from '../services/anecdotes'

export const voteForAnecdote = id => {
  return async dispatch => {
    await anecdoteService.voteForAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: {
        id: id
      }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const votedAnecdote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...votedAnecdote,
        votes: (votedAnecdote.votes += 1)
      }
      state.map(anecdote => (anecdote.id !== id ? anecdote : changedAnecdote))
      state.sort(function(a, b) {
        return b.votes - a.votes
      })
      return state
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort(function(a, b) {
        return b.votes - a.votes
      })
    default:
      return state
  }
}

export default reducer

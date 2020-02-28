import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import store from '../store'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  const vote = (id, anecdote) => {
    console.log('vote', id)
    dispatch(voteForAnecdote(id))
    dispatch(showNotification(`You voted for ${anecdote}`))
    setTimeout(() => {
      store.dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>
          Vote
        </button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const anecdotesToShow =
    filter.filter === ''
      ? anecdotes
      : anecdotes.filter(anecdote =>
          anecdote.content.toUpperCase().includes(filter)
        )

  return (
    <div>
      {anecdotesToShow.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  )
}

export default AnecdoteList

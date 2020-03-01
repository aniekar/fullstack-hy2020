import React from 'react'
import { connect } from 'react-redux'
//import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, voteForAnecdote }) => {
  const vote = (id, anecdote) => {
    console.log('vote', id)
    voteForAnecdote(id)
    // dispatch(showNotification(`You voted for ${anecdote}`))
    // setTimeout(() => {
    //   store.dispatch({ type: 'CLEAR_NOTIFICATION' })
    // }, 5000)
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

const AnecdoteList = props => {
  console.log(props.anecdotes)
  const vote = (id, anecdote) => {
    console.log('vote', id)
    props.voteForAnecdote(id)
    props.showNotification(`You voted for ${anecdote}`, 3)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  if (state.filter.filter == '') {
    return {
      anecdotes: state.anecdotes,
      notification: state.notification
    }
  } else {
    return {
      anecdotes: state.anecdotes.filter(anecdote =>
        anecdote.content.toUpperCase().includes(state.filter)
      ),
      notification: state.notification
    }
  }
}

const mapDispatchToProps = {
  voteForAnecdote,
  showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

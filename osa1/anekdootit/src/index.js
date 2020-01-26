import React, { useState } from "react"
import ReactDOM from "react-dom"

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const App = props => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  )
  const getNextAnecdote = () => {
    let randomIndex = Math.floor(Math.random() * Math.floor(anecdotes.length))
    return setSelected(randomIndex)
  }
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div>
        <Button text="vote" handleClick={handleVote} />
        <Button text="get next anecdote" handleClick={getNextAnecdote} />
      </div>
    </div>
  )
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"))

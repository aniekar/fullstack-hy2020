import React, { useState } from "react"
import ReactDOM from "react-dom"

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const Anecdote = props => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>has {props.numberOfVotes} votes</p>
    </div>
  )
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

  let max = Math.max(...votes)
  let maxIndex = votes.indexOf(max)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote
        anecdote={props.anecdotes[selected]}
        numberOfVotes={votes[selected]}
      />
      <div>
        <Button text="vote" handleClick={handleVote} />
        <Button text="get next anecdote" handleClick={getNextAnecdote} />
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <Anecdote
          anecdote={props.anecdotes[maxIndex]}
          numberOfVotes={max}
        />
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

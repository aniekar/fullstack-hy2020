import React, { useState } from "react"
import ReactDOM from "react-dom"

const Button = ({ handleClick, name }) => {
  return <button onClick={handleClick}>{name}</button>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () =>
  setGood(good + 1)

  const handleNeutral = () =>
  setNeutral(neutral + 1)

  const handleBad = () =>
  setBad(bad + 1)

  return (
    <div>
        <h1>Give feedback</h1>
        <Button handleClick={handleGood} name={"good"} />
        <Button handleClick={handleNeutral} name={"neutral"} />
        <Button handleClick={handleBad} name={"bad"} />
        <h2>Statistics</h2>
        <span>Good: {good} </span>
        <span>Neutral: {neutral} </span>
        <span>Bad: {bad} </span>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
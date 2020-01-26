import React, { useState } from "react"
import ReactDOM from "react-dom"

const Button = ({ handleClick, name }) => {
  return <button onClick={handleClick}>{name}</button>
}

const Statistics = props => {
  const { good, neutral, bad, all, average, positive } = props

  console.log(props)

  if (all === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <span>No feedback given yet :(</span>
      </div>
    )
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>
              <h2>Statistics</h2>
            </td>
          </tr>
        </thead>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = props => {
  const { text, value } = props

  if (text === "positive") {
    return (
      <tr>
        <td>{text}:</td>
        <td>{value}%</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  const all = good + neutral + bad
  const average = (good * 1 + bad * -1) / all
  const positive = (good / all) * 100

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} name={"good"} />
      <Button handleClick={handleNeutral} name={"neutral"} />
      <Button handleClick={handleBad} name={"bad"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))

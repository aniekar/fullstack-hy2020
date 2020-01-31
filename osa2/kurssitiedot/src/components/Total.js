import React from "react"

const Total = ({ parts }) => {
  const exerciseCount = parts.reduce(function (total, part) { return total + part.exercises}, 0)
  return <p><b>Number of exercises {exerciseCount}</b></p>
}

export default Total

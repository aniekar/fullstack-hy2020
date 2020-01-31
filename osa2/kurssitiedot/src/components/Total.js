import React from "react"

const Total = ({ parts }) => {
  console.log(parts)
  const exerciseCount = parts.reduce(function (total, part) { return total + part.exercises}, 0)
  return <p>Number of exercises {exerciseCount}</p>
}

export default Total

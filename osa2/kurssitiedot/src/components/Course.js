import React from "react"
import Header from "../components/Header"
import Content from "../components/Content"
import Total from "../components/Total"

const Course = ({ name, parts }) => {
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course

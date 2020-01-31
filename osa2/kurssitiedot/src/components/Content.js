import React from "react"
import Part from "../components/Part"

const Content = ({parts}) => {
    const partItems = parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises}/>)
    return (
    <div>{partItems}</div>
    )
}

export default Content
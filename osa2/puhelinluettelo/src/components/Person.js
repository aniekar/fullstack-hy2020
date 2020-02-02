import React from "react"

const Button = ({handleDelete, id}) => {
    const deletePerson = () => {
        handleDelete(id)
    }
    return(
        <button onClick={deletePerson} id={id}>Delete</button>
    )
}

const Person = ({ id, name, number, handleDelete }) => {
  return (
    <div>
      {name} {number} <Button handleDelete={handleDelete} id={id}/>
    </div>
  )
}

export default Person

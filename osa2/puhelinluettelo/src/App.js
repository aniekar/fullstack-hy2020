import React, { useState } from "react"
import Person from "./components/Person"
import FilterForm from "./components/FilterForm"
import PersonForm from "./components/PersonForm"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "123456789" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const addPerson = event => {
    event.preventDefault()
    if (!personIsADuplicate()) {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    } else {
      window.alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
    }
  }

  const personIsADuplicate = () => {
    let names = persons.reduce(
      (allNames, person) => allNames.concat(person.name),
      []
    )
    return names.includes(newName)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toUpperCase().includes(filter.toUpperCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new person</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </div>
  )
}

export default App

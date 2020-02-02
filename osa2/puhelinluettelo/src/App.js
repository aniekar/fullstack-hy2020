import React, { useState, useEffect } from "react"
import Person from "./components/Person"
import FilterForm from "./components/FilterForm"
import PersonForm from "./components/PersonForm"
import Notification from "./components/Notification"
import personservice from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [errorOccurred, setError] = useState(false)
  const [notification, setNotification] = useState("")

  useEffect(() => {
    personservice.getAll().then(initialEntries => {
      setPersons(initialEntries)
    })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    if (!personIsADuplicate()) {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personservice
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNotification(`${newPerson.name} was added`)
        })
        .catch(function(error) {
          setError(true)
          setNotification(
            `An error occurred while attempting to create ${newName}`
          )
        })
        .then(function() {
          setNewName("")
          setNewNumber("")
          setTimeout(() => {
            setNotification("")
            setError(false)
          }, 2000)
        })
    } else {
      const confirmation = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirmation) {
        updatePerson()
      }
      setNewName("")
      setNewNumber("")
    }
  }

  const updatePerson = () => {
    const person = persons.find(p => p.name === newName)
    const modifiedPerson = { ...person, number: newNumber }
    personservice
      .update(person.id, modifiedPerson)
      .then(function(returnedPerson) {
        setPersons(
          persons.map(p => (p.id !== returnedPerson.id ? p : returnedPerson))
        )
        setNotification(`${modifiedPerson.name} was updated`)
      })
      .catch(function(error) {
        setError(true)
        setNotification(
          `An error occurred while attempting to update ${modifiedPerson.name}`
        )
      })
      .then(function() {
        setNewName("")
        setNewNumber("")
        setTimeout(() => {
          setNotification("")
          setError(false)
        }, 2000)
      })
  }

  const personIsADuplicate = () => {
    let names = persons.reduce(
      (allNames, person) => allNames.concat(person.name),
      []
    )
    return names.includes(newName)
  }

  const handleDelete = id => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personservice
        .deleteOne(id)
        .then(function(response) {
          setNotification(`${personToDelete.name} was deleted`)
        })
        .catch(function(error) {
          setError(true)
          setNotification(
            `An error occurred while attempting to delete ${personToDelete.name}`
          )
        })
        .then(function() {
          setPersons(persons.filter(p => p.id !== id))
          setTimeout(() => {
            setNotification("")
            setError(false)
          }, 2000)
        })
    }
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
      <Notification message={notification} error={errorOccurred} />
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
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default App

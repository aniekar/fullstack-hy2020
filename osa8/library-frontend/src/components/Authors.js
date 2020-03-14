import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = props => {
  const authors = props.authors
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR)
  let authorNames = []
  let authorList = []
  //props.authors.map(a => ({ value: a.name, label: a.name }))

  if (!props.show) {
    return null
  }

  if (props.authors.data) {
    authorNames = props.authors.data.allAuthors.map(a => ({
      value: a.name,
      label: a.name
    }))
    authorList = props.authors.data.allAuthors
  }

  const submit = async event => {
    event.preventDefault()

    let setBornTo = parseInt(birthYear)
    editAuthor({ variables: { name, setBornTo } })

    setName('')
    setBirthYear('')
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authorList.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={{ value: name, label: name }}
            options={authorNames}
            onChange={value => setName(value.value)}
          />
        </div>
        <div>
          born
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">Set year</button>
      </form>
    </div>
  )
}

export default Authors

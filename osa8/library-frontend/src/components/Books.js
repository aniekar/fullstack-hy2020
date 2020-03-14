import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS, { pollInterval: 3000 })

  useEffect(() => {
    if (result.data && !result.loading) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books

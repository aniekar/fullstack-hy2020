import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = props => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')
  const getGenre = useQuery(ME)
  const recommendedBooks = useQuery(ALL_BOOKS, {
    variables: { genre },
    pollInterval: 3000
  })

  useEffect(() => {
    if (!getGenre.loading) {
      setGenre(getGenre.data.me.favouriteGenre)
    }
  }, [getGenre])

  useEffect(() => {
    if (!recommendedBooks.loading) {
      setBooks(recommendedBooks.data.allBooks)
    }
  }, [recommendedBooks])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendedations</h2>
      <p>
        books from your favourite genre <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
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

export default Recommendations

import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Select from 'react-select'

const Books = props => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS, { pollInterval: 3000 })
  const filteredResult = useQuery(ALL_BOOKS, { variables: { genre } })

  useEffect(() => {
    if (result.data && !result.loading) {
      console.log(result.data.allBooks)
      setBooks(result.data.allBooks)
      let genreArray = result.data.allBooks.map(book => book.genres)
      let allGenres = genreArray.flat()
      setGenres(allGenres)
    }
  }, [result])

  useEffect(() => {
    if (!filteredResult.loading) {
      setBooks(filteredResult.data.allBooks)
    }
  }, [filteredResult])

  let allGenres = genres.map(genre => ({
    value: genre,
    label: genre
  }))

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <h3>filter by genre</h3>
      <Select
        value={{ value: genre, label: genre }}
        options={allGenres}
        onChange={value => setGenre(value.value)}
      />
      <button onClick={() => setGenre('')}>Reset filter</button>
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

export default Books

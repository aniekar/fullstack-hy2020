import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'



const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 3000
  })
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])

  const showBooks = () => {
    getBooks()
    setPage('books')
  }

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult])

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => showBooks()}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App

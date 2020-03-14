import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import {
  useQuery,
  useMutation,
  useApolloClient,
  useSubscription
} from '@apollo/client'
import { ALL_AUTHORS, LOGIN, BOOK_ADDED } from './queries'
import Recommendations from './components/Recommendations'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      console.log(error)
      setToken('')
    }
  })
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 3000
  })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`New book added: ${subscriptionData.data.bookAdded.title}`)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  const handleLogin = (username, password) => {
    login({ variables: { username, password } })
    setPage('authors')
  }
  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommendations')}>
            recommendations
          </button>
        )}
        {token && <button onClick={handleLogout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Authors show={page === 'authors'} authors={authors} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommendations show={page === 'recommendations'} />
      <Login show={page === 'login'} handleLogin={handleLogin} />
    </div>
  )
}

export default App

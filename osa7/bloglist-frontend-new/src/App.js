import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog
} from './reducers/blogReducer'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Button from './components/Button'
import Header from './components/Header'
import Input from './components/Input'

import loginService from './services/login'
import storage from './utils/storage'
import styled from 'styled-components'

const UpperContainer = styled.div`
  margin: 0.25em;
  padding: 1em;
  background: Thistle;
  border: 1px solid MediumSlateBlue;
  border-radius: 2px;
  font-family: Helvetica;
`

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const showNotification = (message, success) => {
    dispatch(setNotification(message, success, 5))
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      setUsername('')
      setPassword('')
      setUser(user)
      showNotification(`${user.name} welcome back!`, true)
      storage.saveUser(user)
    } catch (exception) {
      showNotification('wrong username/password', false)
    }
  }

  const createNewBlog = async blog => {
    try {
      dispatch(createBlog(blog))
      showNotification(
        `a new blog '${blog.title}' by ${blog.author} added!`,
        true
      )
    } catch (exception) {
      showNotification('unable to add new blog', false)
    }
  }

  const handleLike = async id => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
    dispatch(likeBlog(likedBlog))
  }

  const handleRemove = async id => {
    const ok = window.confirm(`Are you sure you wish to delete?`)
    if (ok) {
      dispatch(deleteBlog(id))
      showNotification(`Blog with id ${id} was deleted`, true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  if (!user) {
    return (
      <UpperContainer>
        <Header>Login to application</Header>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            <Input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <Input
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button id="login">login</Button>
        </form>
      </UpperContainer>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Header>Blogs</Header>

      <Notification />

      <UpperContainer>
        {user.name} logged in <Button onClick={handleLogout}>logout</Button>
      </UpperContainer>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog createNewBlog={createNewBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username === blog.user.username}
        />
      ))}
    </div>
  )
}

export default App

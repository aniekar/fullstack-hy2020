import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState('')
  const [isError, setError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()
  const sortBlogs = () => {
    const sortedBlogs = blogs.sort(function(a, b) {
      return a.likes - b.likes
    })
    setBlogs(sortedBlogs)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(function(a, b) {
        return b.likes - a.likes
      })
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError(true)
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification('')
        setError(false)
      }, 5000)
    }
  }

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addLike = id => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        returnedBlog.user = blog.user
        setBlogs(blogs.map(blog => (blog.id !== id ? blog : returnedBlog)))
      })
      .catch(error => {
        setError(true)
        setNotification(`Blog not found on server`)
        setTimeout(() => {
          setNotification(null)
          setError(false)
        }, 5000)
      })
  }

  const loginForm = () => (
    // <Togglable buttonLabel="Show login form">
    <LoginForm
      handleLogin={handleLogin}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      username={username}
      password={password}
    />
    //</Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification message={notification} error={isError} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>Blogs</h2>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => addLike(blog.id)}
            />
          ))}
          <h2>Add new</h2>
          {blogForm()}
        </div>
      )}
    </div>
  )
}

export default App

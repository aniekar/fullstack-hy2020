import React, { useState } from 'react'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    props.handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  if (!props.show) {
    return null
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit" id="login-button">
        Login
      </button>
    </form>
  )
}

export default Login

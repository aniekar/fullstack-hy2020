import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import Header from './Header'
import Input from './Input'

const NewBlogContainer = styled.div`
margin: 0.25em;
padding: 0.25em;
background: Bisque;
border: 1px solid Thistle;
font-family: Arial;
`

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createNewBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Header>Create new</Header>
      <NewBlogContainer>
      <form onSubmit={handleNewBlog}>
        <div>
          <Input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <Input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <Input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button id="create">create</Button>
      </form>
      </NewBlogContainer>
    </div>
  )
}

export default NewBlog
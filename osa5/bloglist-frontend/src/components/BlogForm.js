import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [blogUrl, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    addBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          id="title"
          type="text"
          value={blogTitle}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id="author"
          type="text"
          value={blogAuthor}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id="url"
          type="text"
          value={blogUrl}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="add-button" type="submit">Add</button>
    </form>
  )
}

export default BlogForm

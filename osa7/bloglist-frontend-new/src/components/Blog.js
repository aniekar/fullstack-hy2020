import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from './Button'

const BlogContainer = styled.div`
background: Lavender;
font-size: 1em;
font-family: Arial;
margin: 1em;
padding: 0.3em 1em;
border: 2px solid MediumSlateBlue;
border-radius: 4px;
`

const Blog = ({ blog, handleLike, handleRemove, own }) => {
  const [visible, setVisible] = useState(false)

  const label = visible ? 'hide' : 'view'

  return (
    <BlogContainer>
      <div>
        <i>{blog.title}</i> by {blog.author} <Button onClick={() => setVisible(!visible)}>{label}</Button>
      </div>
      {visible&&(
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <Button onClick={() => handleLike(blog.id)}>like</Button>
          </div>
          <div>{blog.user.name}</div>
          {own&&<Button onClick={() => handleRemove(blog.id)}>remove</Button>}
        </div>
      )}
    </BlogContainer>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog
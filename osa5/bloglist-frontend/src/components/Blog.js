import React, { useState } from 'react'

const Blog = ({ blog, handleLike  }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: 'LightCyan',
  }
  const [blogOpen, setBlogOpen] = useState(false)
  const handleClick = () => {
    setBlogOpen(!blogOpen)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={handleClick}>Show</button>
      {blogOpen && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes} <button onClick={handleLike}>Like</button>
          </div>
          <div>Added by: {blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog

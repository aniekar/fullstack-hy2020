import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    await blogService.update(blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: { id: blog.id }
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    const response = await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort(function(a, b) {
        return b.votes - a.votes
      })
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      const id = action.data.id
      const likedBlog = state.find(b => b.id === id)
      const changedBlog = {
        ...likedBlog,
        votes: (likedBlog.likes += 1)
      }
      state.map(blog => (blog.id !== id ? blog : changedBlog))
      return state
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data)
    default:
      return state
  }
}

export default reducer

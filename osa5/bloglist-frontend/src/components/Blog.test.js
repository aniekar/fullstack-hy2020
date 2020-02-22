import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Only blog title, author and the Show button are rendered by default', () => {
  const blog = {
    title: 'Some random blog',
    author: 'Bob the Builder',
    url: 'http://www.bobthebuilderblog.com',
    likes: 0,
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent(
    'Some random blog Bob the Builder Show'
  )
})

test('After clicking the Show button url and likes are also rendered', async () => {

  const blog = {
    title: 'Some random blog',
    author: 'Bob the Builder',
    url: 'http://www.bobthebuilderblog.com',
    likes: 0,
    user: '5e48077704cdf42e6f314197'
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} handleLike={mockHandler} />)

  const button = component.getByText('Show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'http://www.bobthebuilderblog.com'
  )
  expect(component.container).toHaveTextContent('Likes: 0')
})

test('After clicking the Show button twice, the event handler is called twice', async () => {

    const blog = {
      title: 'Some random blog',
      author: 'Bob the Builder',
      url: 'http://www.bobthebuilderblog.com',
      likes: 0,
      user: '5e48077704cdf42e6f314197'
    }
  
    const mockHandler = jest.fn()
  
    const component = render(<Blog blog={blog} handleLike={mockHandler} />)
  
    const showButton = component.getByText('Show')
    fireEvent.click(showButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })

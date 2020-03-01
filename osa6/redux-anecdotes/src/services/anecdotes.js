import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const anecdoteObject = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

const voteForAnecdote = async id => {
  const anecdotes = await axios.get(baseUrl)
  const url = `${baseUrl}/${id}`
  const anecdote = anecdotes.data.find(a => a.id === id)
  const vote = { ...anecdote, votes: (anecdote.votes += 1) }

  axios.put(url, vote)
}

export default {
  getAll,
  createNew,
  voteForAnecdote
}

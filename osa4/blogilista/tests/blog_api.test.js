const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url:
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0,
	},
]

const testUser = {
	_id: '5e48077704cdf42e6f314197',
	users: [],
	username: 'testi123',
	name: 'Tarja Halonen',
	passwordHash:
		'$2b$10$DWzqW9MXD0ObONajgegJm.i3OnG.irj/ojmAXFLOznzPCH.ffbso123',
	__v: 0,
}

beforeEach(async () => {
	await Blog.deleteMany({})

	await User.deleteMany({})

	let userObject = new User(testUser)
	await userObject.save()

	let blogObject = new Blog(initialBlogs[0])
	await blogObject.save()

	blogObject = new Blog(initialBlogs[1])
	await blogObject.save()

	blogObject = new Blog(initialBlogs[2])
	await blogObject.save()
})

describe('GET-request tests', () => {
	test('/api/blogs returns blogs in JSON-format', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('/api/blogs returns three blogs', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body.length).toBe(initialBlogs.length)
	})
})

describe('id is formatted correctly', () => {
	test('id is defined', async () => {
		const response = await api.get('/api/blogs')
		const individualBlog = response.body[0]
		expect(individualBlog.id).toBeDefined()
	})
})

describe('POST-request tests', () => {
	test('successfull POST-request increases blog count by one', async () => {
		const newBlog = {
			title: 'imaginary blog title',
			author: 'Node Guru',
			url: 'https://www.nodegurublog.com',
			likes: 5,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAfterPost = await api.get('/api/blogs')
		expect(blogsAfterPost.body.length).toBe(initialBlogs.length + 1)
	})

	test('if the number of likes is not defined, it is set to 0', async () => {
		const blogWithNoLikes = {
			title: 'imaginary blog title',
			author: 'Node Guru',
			url: 'https://www.nodegurublog.com',
		}

		await api
			.post('/api/blogs')
			.send(blogWithNoLikes)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs')
		const lastBlog = response.body[response.body.length - 1]
		expect(lastBlog.likes).toBe(0)
	})

	test('fails with status code 400 if data invalid', async () => {
		const newBlog = {
			title: 'i do have a title',
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		const blogsAfterPost = await api.get('/api/blogs')
		expect(blogsAfterPost.body.length).toBe(initialBlogs.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})

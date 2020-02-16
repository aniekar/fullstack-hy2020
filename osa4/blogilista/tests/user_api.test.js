const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

const initialUsers = [
	{
		_id: '5e48077704cdf42e6f314197',
		users: [],
		username: 'testi123',
		name: 'Tarja Halonen',
		passwordHash:
			'$2b$10$DWzqW9MXD0ObONajgegJm.i3OnG.irj/ojmAXFLOznzPCH.ffbso123',
		__v: 0,
	},
	{
		_id: '5e48077704cdf42e6f314195',
		users: [],
		username: 'hdsfrf',
		name: 'Sauli Niinistö',
		passwordHash:
			'$2b$10$DWzqW9MXD0ObONajgegJm.i3OnG.irj/ojmAXFLOznzPCH.ffbso2',
		__v: 0,
	},
]

beforeEach(async () => {
	await User.deleteMany({})

	let userObject = new User(initialUsers[0])
	await userObject.save()

	userObject = new User(initialUsers[1])
	await userObject.save()
})

describe('user creation tests', () => {
	test('successfull POST-request increases user count by one', async () => {
		const newUser = {
			username: 'test',
			user: 'Tester',
			password: 'testermctester',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAfterPost = await api.get('/api/users')
		expect(usersAfterPost.body.length).toBe(initialUsers.length + 1)
	})

	test('if password is missing, server returns an error with status code 400', async () => {
		const userWithNoPassword = {
			username: 'test',
			user: 'Tester',
		}

        const response = await api.post('/api/users').send(userWithNoPassword)
		expect(response.status).toBe(400)
		expect(response.body.error).toBe('Password missing')

		const usersAfterPost = await api.get('/api/users')
		expect(usersAfterPost.body.length).toBe(initialUsers.length)
	})

	test('if password is missing, server returns an error with status code 400', async () => {
		const userWithShortPassword = {
			username: 'test',
			user: 'Tester',
			password: '01',
		}

		const response = await api.post('/api/users').send(userWithShortPassword)
		expect(response.status).toBe(400)
		expect(response.body.error).toBe('Password must be at least 3 characters long')

		const usersAfterPost = await api.get('/api/users')
		expect(usersAfterPost.body.length).toBe(initialUsers.length)
	})

	test('if username is not unique, server returns an error with status code 500', async () => {
		const duplicateUser = {
			username: 'testi123',
			user: 'Tarja Halonen',
			password: '013tarja',
		}

        const response = await api.post('/api/users').send(duplicateUser)
        expect(response.status).toBe(500)
        
		const usersAfterPost = await api.get('/api/users')
		expect(usersAfterPost.body.length).toBe(initialUsers.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})

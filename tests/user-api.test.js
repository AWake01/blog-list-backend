const bcrypt = require('bcrypt')
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')

const helper = require('./test_helper')
const { initialNotes } = require('../../../part3 Programming a server with NodeJS and Express/partA/REST/tests/test_helper')
const api = supertest(app)

//INITALISE DATA
beforeEach(async () => {
    console.log('Creating')
    await User.deleteMany({})
    const hash = await bcrypt.hash('root', 10)
    const newUser = new User({username: 'root', passwordHash: hash, name: 'root name'})
    await newUser.save()
    console.log('Created')
})

// //GET requests
// describe('GET requests', () => {
//     test('GET returns the correct number of blog posts', async () => {     //Pass
//         const response = await api.get('/api/blogs')
//         //console.log(response.body)

//         assert.strictEqual(response.body.length, helper.initalBlogs.length)
//     })

//     test('GET blog posts contains the parameter id (not _id)', async () => {     //Pass
//         const response = await api.get('/api/blogs')

//         response.body.forEach(blog => {
//             assert.notStrictEqual(blog.id, undefined)
//             assert.strictEqual(blog._id, undefined)
//         });

//         //assert.strictEqual(response.body[0].hasOwnProperty('id'), true)
//     })
// })

describe('user data validation', () => {
     test('POST adds a valid user', async () => {     //Pass - username&password 3c, username unique
        const usersAtStart = await helper.usersInDB()

        const newUser = {
            username: "valid username",
            password: "valid password",
            name: "name 1",
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    })

    test('POST with existing username', async () => {     //Fail
        const newUser = {
            username: "root", 
            password: "valid password",
            name: "name 2",
        }
        const usersAtStart = await helper.usersInDB()

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('POST with missing username', async () => {     //PASS
        const newUser = {
            password: "valid password",
            name: "name 3",
        }
        const usersAtStart = await helper.usersInDB()

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB()
        assert(result.body.error.includes('username missing'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('POST with missing password', async () => {     //PASS
        const newUser = {
            username: "valid username",
            name: "name 4",
        }
        const usersAtStart = await helper.usersInDB()

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB()
        assert(result.body.error.includes('password missing'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

//CLOSE CONNECTION
after(async () => {
    await mongoose.connection.close()
    console.log('mongoDB connection closed')
})


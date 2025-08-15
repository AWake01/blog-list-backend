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


describe('login with valid credidentials', () => {
     test('login with valid user', async () => {
        const usersAtStart = await helper.usersInDB()

        const login = {
            username: "root",
            password: "root",
        }

        const loginRequest = await api
        .post('/api/login')
        .send(login)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        //const usersAtEnd = await helper.usersInDB()
        assert(loginRequest.body.hasOwnProperty('token'))
        assert(loginRequest.body.hasOwnProperty('username'))
        assert(loginRequest.body.hasOwnProperty('name'))
    })
})

describe('login with invalid credidentials', () => {
    test('attempted login with invalid username', async () => {
        const usersAtStart = await helper.usersInDB()

        const login = {
            username: "x",
            password: "root",
        }

        const loginRequest = await api
        .post('/api/login')
        .send(login)
        .expect(401)
        .expect('Content-Type', /application\/json/)

        assert.strictEqual(loginRequest.body.error, 'invalid username or password');
    })

    test('attempted login with invalid password', async () => {
        const usersAtStart = await helper.usersInDB()

        const login = {
            username: "root",
            password: "x",
        }

        const loginRequest = await api
        .post('/api/login')
        .send(login)
        .expect(401)
        .expect('Content-Type', /application\/json/)

        console.log(loginRequest)

        assert.strictEqual(loginRequest.body.error, 'invalid username or password');
    })
})

//CLOSE CONNECTION
after(async () => {
    await mongoose.connection.close()
    console.log('mongoDB connection closed')
})


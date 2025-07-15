const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')

const helper = require('./test_helper')
const api = supertest(app)

//INITALISE DATA
beforeEach(async () => {
  //console.log('Creating')
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initalBlogs)
  //console.log('Created')
})

//GET requests
describe('GET requests', () => {
    test('GET returns the correct number of blog posts', async () => {     //Pass
        const response = await api.get('/api/blogs')
        //console.log(response.body)

        assert.strictEqual(response.body.length, helper.initalBlogs.length)
    })

    test('GET blog posts contains the parameter id (not _id)', async () => {     //Pass
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            assert.notStrictEqual(blog.id, undefined)
            assert.strictEqual(blog._id, undefined)
        });

        //assert.strictEqual(response.body[0].hasOwnProperty('id'), true)
    })
})

//CLOSE CONNECTION
after(async () => {
    await mongoose.connection.close()
    console.log('mongoDB connection closed')
})


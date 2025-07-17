const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')

const helper = require('./test_helper')
const { initialNotes } = require('../../../part3 Programming a server with NodeJS and Express/partA/REST/tests/test_helper')
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

//POST requests
describe('POST requests', () => {
    test('POST adds a new blog', async () => {     //Pass
        const newBlog = {
            title: "New Blog",
            author: "New Author ",
            url: "https://newBlog.com/",
            likes: 5,
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(blog => blog.title)

        assert.strictEqual(response.body.length, helper.initalBlogs.length + 1)
        assert(titles.includes('New Blog'))
    })

    test('POST likes property defaults to zero if missing', async () => {     //Pass
        const newBlog = {
            title: "Like Missing",
            author: "Author Like Missing ",
            url: "https://LikeMissing.com/",
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDB()
        const foundBlog = await blogs.find(blog => blog.title === newBlog.title)

        assert.strictEqual(foundBlog.likes, 0)
    })
})

//CLOSE CONNECTION
after(async () => {
    await mongoose.connection.close()
    console.log('mongoDB connection closed')
})


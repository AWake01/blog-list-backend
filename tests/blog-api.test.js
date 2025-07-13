const assert = require('node:assert')
const { test, after, describe, beforeEach } = require('node:test')

const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')

const helper = require('./test_helper')
const api = supertest(app)

//INITALISE DATA
beforeEach(async () => {
  console.log('Creating')
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initalBlogs)
  console.log('Created')
})
// //DUMMY TESTS
// test('dummy1'), async () => {
//     assert.strictEqual(true, true)
// }
// test('dummy2'), async () => {
//     assert.strictEqual(true, true)
// }

//GET
test('GET returns the correct number of blog posts'), async () => {     //Pass
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initalBlogs.length)
}
test('GET returns the incorrect number of blog posts'), async () => {     //Fail
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initalBlogs.length)
}

//CLOSE CONNECTION
after(async () => {
    await mongoose.connection.close()
    console.log('mongoDB connection closed')
})


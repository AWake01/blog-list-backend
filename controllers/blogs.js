const blogsRouter = require('express').Router()
const Blog = require("../models/blog")
//const app = require('../app')

//GET
//all
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

//by id
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(note) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

//POST
//blog
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})


module.exports = blogsRouter
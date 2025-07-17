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
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0, //Default to 0 if not provided
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})


module.exports = blogsRouter
const blogsRouter = require('express').Router()
const { toArray } = require('lodash')
const Blog = require("../models/blog")
const User = require("../models/user")
const { default: mongoose } = require('mongoose')
//const app = require('../app')

//GET
//all
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
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

  //Proxy first user in db
  const users = await User.find({})
  const proxyUserToSave = users[0]
  console.log("User: ", proxyUserToSave)

  if (!proxyUserToSave) {    return response.status(400).json({ error: 'userId missing or not valid' })  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0, //Default to 0 if not provided
    user: proxyUserToSave._id
  })

  const savedBlog = await blog.save()
  console.log("Proxy: ", proxyUserToSave)
  proxyUserToSave.blogs = proxyUserToSave.blogs.concat(savedBlog._id)
  await proxyUserToSave.save()

  if(!savedBlog.title || !savedBlog.url){ //Must have title and url
    response.status(400).end()
  } else {
    response.status(201).json(savedBlog)
  }
})

//DELETE
//blog
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

//PUT
//blog likes
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blogToUpdate = await Blog.findById(request.params.id)
  if(!blogToUpdate) {
    return response.status(404).end()
  }

  blogToUpdate.likes = body.likes

  await blogToUpdate.save()
  response.json(blogToUpdate)
})


module.exports = blogsRouter
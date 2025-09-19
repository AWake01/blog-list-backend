const blogsRouter = require('express').Router()
const { toArray } = require('lodash')
const Blog = require("../models/blog")
const User = require("../models/user")
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')

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

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) { return response.status(400).json({ error: 'userId missing or not valid' }) }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0, //Default to 0 if not provided
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  if(!savedBlog.title || !savedBlog.url){ //Must have title and url
    response.status(400)
  } else {
    response.status(201).json(savedBlog)
  }
})

//DELETE
//blog
blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'delete token invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)
  const userId = blogToDelete.user.toString()

  //console.log('Delete ', decodedToken.id, " ", userId.id)

  if(decodedToken.id != userId) {
    return response.status(400).json({ error: 'invalid user for DELETE' }) 
  }

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
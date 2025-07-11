const blogsRouter = require('express').Router()
const Blog = require("../models/blog")

//GET
//all
app.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

//POST
//blog
app.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})


modules.export = blogsRouter
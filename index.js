const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const Blog = require('./models/blog')
const config = require('./utils/config')

const app = express()

app.use(express.json())

const mongoUrl = 
mongoose.connect(config.MONGODB_URI)

app.use(express.json())

//GET
//all
app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

//POST
//blog
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

//CONNECTION
const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
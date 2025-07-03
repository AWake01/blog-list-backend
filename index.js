const express = require('express')
const mongoose = require('mongoose')

const Blog = require('./models/blog')

const app = express()

require('dotenv').config()
app.use(express.json())
const url = process.env.MONGODB_URI

const mongoUrl = 
mongoose.connect(url)

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
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
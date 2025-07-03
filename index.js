const express = require('express')
const mongoose = require('mongoose')

const app = express()

require('dotenv').config()
app.use(express.json())
const url = process.env.MONGODB_URI

//MONGODB
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {  //Convert id to string and remove unused fields in response
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

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
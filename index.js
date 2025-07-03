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

//CONNECTION
const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
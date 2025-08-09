const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const helper = require('../tests/test_helper')
//const app = require('../app')

//GET
//all
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

//by id
// blogsRouter.get('/:id', async (request, response) => {
//   const blog = await Blog.findById(request.params.id)
//   if(note) {
//     response.json(blog)
//   } else {
//     response.status(404).end()
//   }
// })

//POST
//blog
usersRouter.post('/', async (request, response) => {
   const { username, password, name} = request.body

   //Validation
   if(!username) {
    return response.status(400).json({ error: 'username missing'})
   }
   if(!password) {
    return response.status(400).json({ error: 'password missing'})
   } 
   if(username.length < 3) {
    return response.status(400).json({ error: 'username must have 3 characters minimum'})
   } 
   if(password.length < 3) {
    return response.status(400).json({ error: 'password must have 3 characters minimum'})
   } 
  //  const usernames = helper.usersInDB()//.map(user => user.username)
  //  if(usernames.includes(user => user.name === username)) {
  //   return response.status(400).json({ error: 'username must be unique'})
  //  } 

   const saltRounds = 10
   const passwordHash = await bcrypt.hash(password, saltRounds)

   const user = new User({
    username,
    passwordHash,
    name
   })

   const savedUser = await user.save()
   response.status(201).json(savedUser)
})

module.exports = usersRouter
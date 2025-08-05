require('dotenv').config()
const mongoose = require('mongoose')

//MONGODB
const userSchema = mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
})

userSchema.set('toJSON', {  //Convert id to string and remove unused fields in response
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
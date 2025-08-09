require('dotenv').config()
const mongoose = require('mongoose')

//MONGODB
const userSchema = mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ],
  username: {
    type: String,
    required: true,
    unique: true // this ensures the uniqueness of username
  },
  passwordHash: { type: String, required: true },
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
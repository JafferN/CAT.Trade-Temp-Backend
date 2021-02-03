const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userId: Number,
  group: String,
  signalAccessLevel: Number,
  expertiseLevel: Number
})

module.exports = mongoose.model('User', userSchema)
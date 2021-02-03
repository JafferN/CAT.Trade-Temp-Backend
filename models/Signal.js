const mongoose = require('mongoose')

const signalSchema = new mongoose.Schema({
  url: String,
  title: String,
  description: String,
  accessLevel: Number,
  coinpair: String,
  group: String,
  colour: String,
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Signal', signalSchema)
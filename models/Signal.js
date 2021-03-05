const mongoose = require('mongoose')

const signalSchema = new mongoose.Schema({
  url: {
    type: String,
    default: null
  },
  coinpair: {
    type: String,
    default: null
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  accessLevel: {
    type: String,
    default: 0
  },
  group: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: null
  },
  discordWebhookUrl: {
    type: String,
    default: null
  },
  colour: {
    type: Number,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Signal', signalSchema)
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    required: true
  },
  group: {
    type: String,
    default: null
  },
  signalAccessLevel: {
    type: Number,
    default: null
  },
  expertiseLevel: {
    type: Number,
    default: null
  },
  sendSignals: {
    type: Boolean,
    default: false
  },
  discordWebhookUrl: {
    type: String,
    default: null
  }
})

module.exports = mongoose.model('User', userSchema)
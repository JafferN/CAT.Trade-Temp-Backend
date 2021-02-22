const mongoose = require('mongoose')

const snapshotSchema = new mongoose.Schema({
  address: {
    type: String
  },
  balance: {
    type: String
  },
  maintained: {
    type: Boolean,
    default: true
  }
})

module.exports = mongoose.model('Snapshot', snapshotSchema)
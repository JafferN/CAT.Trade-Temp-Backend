const mongoose = require('mongoose')

const snapshotSchema = new mongoose.Schema({
  HolderAddress: {
    type: String
  },
  Balance: {
    type: String
  }
})

module.exports = mongoose.model('Snapshot', snapshotSchema)
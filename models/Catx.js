const mongoose = require('mongoose')

const catxSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Catx', catxSchema)
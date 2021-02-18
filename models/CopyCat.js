const mongoose = require('mongoose')

const copyCatSchema = new mongoose.Schema({
  copyCatId: {
    type: Number,
    unique: true,
    required: true
  },
  group: {
    type: String,
    default: null
  }
})

module.exports = mongoose.model('CopyCat', copyCatSchema)
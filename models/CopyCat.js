const mongoose = require('mongoose')

const copyCatSchema = new mongoose.Schema({
  copyCatId: Number,
  group: String
})

module.exports = mongoose.model('CopyCat', copyCatSchema)
// External Dependancies
const boom = require('boom')

// Get Data Models
const CopyCat = require('../models/CopyCat')

// Get all copyCats
exports.getCopyCats = async (req, reply) => {
  try {
    const copyCats = await CopyCat.find({})
    return copyCats
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get copyCats by group name
exports.getGroupCopyCats = async (req, reply) => {
  try {
    const name = req.params.name
    const copyCats = await CopyCat.find({ group: name })
    return copyCats
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new copyCat
exports.addCopyCat = async (req, reply) => {
  try {
    const copyCat = new CopyCat(req.body)
    return copyCat.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing copyCat
exports.updateCopyCat = async (req, reply) => {
  try {
    const id = req.params.id
    const copyCat = req.body
    const { ...updateData } = copyCat
    const update = await CopyCat.findOneAndUpdate({ copyCatId: id }, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a copyCat
exports.deleteCopyCat = async (req, reply) => {
  try {
    const id = req.params.id
    const copyCat = await CopyCat.findByIdAndRemove({ copyCatId: id })
    return copyCat
  } catch (err) {
    throw boom.boomify(err)
  }
}
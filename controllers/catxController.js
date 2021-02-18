// External Dependancies
const boom = require('boom')

// Get Data Models
const Catx = require('../models/Catx')
const Snapshot = require('../models/Snapshot')

// Get all catx holders
exports.getCatx = async (req, reply) => {
  try {
    const catx = await Catx.find({})
    return catx
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single catx holder by address
exports.getSingleCatx = async (req, reply) => {
  try {
    const address = req.params.address
    await Catx.find({ address: address })
    snapshot = await Snapshot.find({ HolderAddress: address.toLowerCase() })
    return snapshot
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new catx holder
exports.addCatx = async (req, reply) => {
  try {
    const catx = new Catx(req.body)
    catx.save()
    snapshot = await Snapshot.find({ HolderAddress: catx.address })
    return snapshot
  } catch (err) {
    throw boom.boomify(err)
  }
}

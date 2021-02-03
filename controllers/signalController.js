// External Dependancies
const boom = require('boom')

// Get Data Models
const Signal = require('../models/Signal')
const User = require('../models/User')

// Get signal subscriptions
const subscriptions = require('../websockets').subscriptions.signals

const sendSignalWs = async (signal) => {
  subscriptions.forEach(subbed => {
    const user = subbed.user
    const conn = subbed.conn
    if (conn.socket._readyState === 1 &&
      user.signalAccessLevel >= signal.accessLevel &&
      (!signal.group || signal.group === user.group)) {
      conn.socket.send(JSON.stringify({ topic: 'signal', data: signal }))
    }
  })
}

// Get all signals
exports.getSignals = async (req, reply) => {
  try {
    const signals = await Signal.find({})
    return signals
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new signal
exports.addSignal = async (req, reply) => {
  try {
  const signal = new Signal(req.body)
    await sendSignalWs(signal)
    return signal.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get all signals for a user
exports.getUserSignals = async (req, reply) => {
  try {
    const id = req.params.id
    const user = await User.find({ userId: id })
    const signals = await Signal.find({})
    return signals.filter(signal => user[0].signalAccessLevel >= signal.accessLevel && (!signal.group || signal.group === user[0].group))
  } catch (err) {
    throw boom.boomify(err)
  }
}

const user = require('./user')
const copyCat = require('./copyCat')
const signal = require('./signal')
const bybitHistory = require('./bybitHistory')

module.exports = [...user, ...copyCat, ...signal, ...bybitHistory]
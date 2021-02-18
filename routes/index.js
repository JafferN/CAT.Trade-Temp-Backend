const user = require('./user')
const copyCat = require('./copyCat')
const signal = require('./signal')
const catx = require('./catx')
const bybitHistory = require('./bybitHistory')

module.exports = [...user, ...copyCat, ...signal, ...catx, ...bybitHistory]
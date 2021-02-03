// Import our Controllers
const signalController = require('../controllers/signalController')

const routes = [
  {
    method: 'GET',
    url: '/signals',
    handler: signalController.getSignals
  },
  {
    method: 'POST',
    url: '/signals',
    handler: signalController.addSignal
  }
]

module.exports = routes

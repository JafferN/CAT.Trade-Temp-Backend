// Import our Controllers
const signalController = require('../controllers/signalController')

const routes = [
  {
    method: 'GET',
    url: '/api/signals',
    handler: signalController.getSignals
  },
  {
    method: 'POST',
    url: '/api/signals',
    handler: signalController.addSignal
  }
]

module.exports = routes

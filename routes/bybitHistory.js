// Import our Controllers
const bybitHistoryController = require('../controllers/bybitHistoryController')

const routes = [
  {
    method: 'GET',
    url: '/api/bybit_history',
    handler: bybitHistoryController.getHistory
  }
]

module.exports = routes

// Import our Controllers
const userController = require('../controllers/userController')
const signalController = require('../controllers/signalController')

const routes = [
  {
    method: 'GET',
    url: '/api/users/:id',
    handler: userController.getSingleUser
  },
  {
    method: 'GET',
    url: '/api/users/:id/signals',
    handler: signalController.getUserSignals
  },
  {
    method: 'POST',
    url: '/api/users',
    handler: userController.addUser
  },
  {
    method: 'PUT',
    url: '/api/users/:id',
    handler: userController.updateUser
  },
]

module.exports = routes

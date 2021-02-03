// Import our Controllers
const userController = require('../controllers/userController')
const signalController = require('../controllers/signalController')

const routes = [
  {
    method: 'GET',
    url: '/users/:id',
    handler: userController.getSingleUser
  },
  {
    method: 'GET',
    url: '/users/:id/signals',
    handler: signalController.getUserSignals
  },
  {
    method: 'POST',
    url: '/users',
    handler: userController.addUser
  },
  {
    method: 'PUT',
    url: '/users/:id',
    handler: userController.updateUser
  },
]

module.exports = routes

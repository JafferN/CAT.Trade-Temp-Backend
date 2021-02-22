// Import our Controllers
const catxController = require('../controllers/catxController')

const routes = [
  {
    method: 'GET',
    url: '/catx/:address',
    handler: catxController.getSingleCatx
  },
  {
    method: 'POST',
    url: '/catx',
    handler: catxController.addCatx
  },
  {
    method: 'POST',
    url: '/catx/check_addresses',
    handler: catxController.checkAddresses
  }
]

module.exports = routes

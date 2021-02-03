// Import our Controllers
const copyCatController = require('../controllers/copyCatController')

const routes = [
  {
    method: 'GET',
    url: '/api/copy_cats',
    handler: copyCatController.getCopyCats
  },
  {
    method: 'GET',
    url: '/api/copy_cats/:group',
    handler: copyCatController.getGroupCopyCats
  },
  {
    method: 'POST',
    url: '/api/copy_cats',
    handler: copyCatController.addCopyCat
  },
  {
    method: 'PUT',
    url: '/api/copy_cats/:id',
    handler: copyCatController.updateCopyCat
  }
]

module.exports = routes

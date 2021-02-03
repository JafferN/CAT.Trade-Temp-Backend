// Import our Controllers
const copyCatController = require('../controllers/copyCatController')

const routes = [
  {
    method: 'GET',
    url: '/copy_cats',
    handler: copyCatController.getCopyCats
  },
  {
    method: 'GET',
    url: '/copy_cats/:group',
    handler: copyCatController.getGroupCopyCats
  },
  {
    method: 'POST',
    url: '/copy_cats',
    handler: copyCatController.addCopyCat
  },
  {
    method: 'PUT',
    url: '/copy_cats/:id',
    handler: copyCatController.updateCopyCat
  }
]

module.exports = routes

const router = require('express').Router()
const clientController = require('../controllers/client.controller')
const { auth } = require('../utils/middlewares')

router.route("/listar").get(clientController.list)
router.route("/crear").post(clientController.create)


module.exports = router
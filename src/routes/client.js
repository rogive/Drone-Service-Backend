const router = require('express').Router()
const clientController = require('../controllers/client.controller')
const { auth } = require('../utils/middlewares')

router.route("/listar").get(clientController.list)
router.route("/crear").post(clientController.signup)
router.route("/login").post(clientController.signin)
router.route("/listar/:id").get(clientController.findUser)
router.route("/actualizar/:id").put(clientController.update)
router.route("/eliminar/:id").delete(clientController.destroy)
router.route("/filtrar").post(clientController.filter)

module.exports = router
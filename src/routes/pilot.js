const router = require('express').Router()
const pilotController = require('../controllers/pilot.controller')
const { auth } = require('../utils/middlewares')

router.route("/listar").get(pilotController.list)
router.route("/crear").post(pilotController.signup)
router.route("/login").post(pilotController.signin)
router.route("/listar/:id").get(auth, pilotController.findUser)
router.route("/actualizar/:id").put(pilotController.update)
router.route("/eliminar/:id").delete(pilotController.destroy)

module.exports = router
const router = require('express').Router()
const pilotController = require('../controllers/pilot.controller')


router.route("/listar").get(pilotController.list)
router.route("/crear").post(pilotController.create)
router.route("/listar/:id").get(pilotController.show)
router.route("/actualizar/:id").put(pilotController.update)
router.route("/eliminar/:id").delete(pilotController.destroy)

module.exports = router
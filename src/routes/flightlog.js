const router = require('express').Router()
const flightlogController = require('../controllers/flightlog.controller')


router.route("/listar").get(flightlogController.list)
router.route("/crear").post(flightlogController.create)
router.route("/listar/:id").get(flightlogController.show)
router.route("/listar/piloto/:id").get(flightlogController.showpilot)
router.route("/actualizar/:id").put(flightlogController.update)
router.route("/eliminar/:id").delete(flightlogController.destroy)

module.exports = router
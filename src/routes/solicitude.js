const router = require('express').Router()
const solicitudeController = require('../controllers/solicitude.controller')


/* router.route("/listar").get(solicitudeController.list) */
router.route("/crear").post(solicitudeController.create)
/* router.route("/listar/:id").get(solicitudeController.show)
router.route("/listar/piloto/:id").get(solicitudeController.showpilot)
router.route("/actualizar/:id").put(solicitudeController.update)
router.route("/eliminar/:id").delete(solicitudeController.destroy) */

module.exports = router
const router = require('express').Router()
const serviceController = require('../controllers/service.controller')


router.route("/listar").get(serviceController.list)
router.route("/crear").post(serviceController.create)
router.route("/listar/:id").get(serviceController.show)
router.route("/listar/piloto/:id").get(serviceController.showpilot)
router.route("/actualizar/:id").put(serviceController.update)
router.route("/eliminar/:id").delete(serviceController.destroy)

module.exports = router
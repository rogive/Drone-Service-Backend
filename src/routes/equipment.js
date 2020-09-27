const router = require('express').Router()
const equipmentController = require('../controllers/equipment.controller')

router.route("/listar").get(equipmentController.list)
router.route("/crear").post(equipmentController.create)
router.route("/listar/:id").get(equipmentController.show)
router.route("/listar/piloto/:id").get(equipmentController.showpilot)
router.route("/actualizar/:id").put(equipmentController.update)
router.route("/eliminar/:id").delete(equipmentController.destroy)

module.exports = router
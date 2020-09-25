const router = require('express').Router()
const othersController = require('../controllers/others.controller')


router.route("/listar").get(othersController.list)
router.route("/crear").post(othersController.create)
router.route("/listar/:id").get(othersController.show)
router.route("/listar/piloto/:id").get(othersController.showpilot)
router.route("/actualizar/:id").put(othersController.update)
router.route("/eliminar/:id").delete(othersController.destroy)

module.exports = router
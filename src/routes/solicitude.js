const router = require('express').Router()
const requestController = require('../controllers/request.controller')


/* router.route("/listar").get(requestController.list) */
router.route("/crear").post(requestController.create)
/* router.route("/listar/:id").get(requestController.show)
router.route("/listar/piloto/:id").get(requestController.showpilot)
router.route("/actualizar/:id").put(requestController.update)
router.route("/eliminar/:id").delete(requestController.destroy) */

module.exports = router
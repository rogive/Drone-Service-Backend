const router = require('express').Router()
const certificateController = require('../controllers/certificate.controller')


router.route("/listar").get(certificateController.list)
router.route("/crear").post(certificateController.create)
router.route("/listar/:id").get(certificateController.show)
router.route("/listar/piloto/:id").get(certificateController.showpilot)
router.route("/actualizar/:id").put(certificateController.update)
router.route("/eliminar/:id").delete(certificateController.destroy)

module.exports = router
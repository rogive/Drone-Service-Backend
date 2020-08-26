const router = require('express').Router()
const mediaController = require('../controllers/media.controller')


router.route("/listar").get(mediaController.list)
router.route("/crear").post(mediaController.create)
router.route("/listar/:id").get(mediaController.show)
router.route("/listar/piloto/:id").get(mediaController.showpilot)
router.route("/actualizar/:id").put(mediaController.update)
router.route("/eliminar/:id").delete(mediaController.destroy)

module.exports = router
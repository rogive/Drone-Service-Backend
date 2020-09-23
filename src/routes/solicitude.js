const router = require("express").Router();
const solicitudeController = require("../controllers/solicitude.controller");
const { paymentCheck } = require('../utils/middlewares')

router.route("/listar").get(solicitudeController.list);
router.route("/crear").post(solicitudeController.create);
router.route("/listar/:id").get(solicitudeController.show);
router.route("/listar/cliente/:id").get(solicitudeController.showclient);
router.route("/actualizar/:id").put(solicitudeController.update);
router.route("/eliminar/:id").delete(solicitudeController.destroy);
router.route("/filtrar").post(solicitudeController.filter);
router.route("/pagarSolicitud").put(paymentCheck, solicitudeController.paySolicitude);

module.exports = router;

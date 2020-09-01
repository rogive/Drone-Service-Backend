const router = require('express').Router()
const querieController = require('../controllers/querie.controller')
const { auth } = require('../utils/middlewares')

router.route("/listar").get(querieController.list)
router.route("/crear").post(querieController.create)


module.exports = router
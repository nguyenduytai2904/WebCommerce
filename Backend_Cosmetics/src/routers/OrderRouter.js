const express = require("express")
const router = express.Router()
const OrderController = require('../controllers/OrderController')
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware")



router.post('/create', OrderController.createOrder)









module.exports = router
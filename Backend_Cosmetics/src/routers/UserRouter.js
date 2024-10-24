const express = require("express")
const router = express.Router()
const userController = require('../controllers/UserController')
const { authMiddleware } = require("../middleware/authMiddleware")
const { authUserMiddleware } = require("../middleware/authMiddleware")



router.post('/signup', userController.createUser)
router.post('/signin', userController.Signin)
router.post('/log-out', userController.logoutUser)
router.put('/updateUser/:id', authUserMiddleware, userController.updateUser)
router.delete('/deleteUser/:id', authMiddleware, userController.deleteUser)
router.get('/getAll', authMiddleware, userController.getAllUser)
router.get('/getUserDetail/:id', authUserMiddleware, userController.getUserDetail)
router.post('/refreshToken', userController.jwtRefreshTokenService)
router.post('/delete-many', authMiddleware, userController.deleteMany)





module.exports = router
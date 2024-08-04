const express =require('express')
const { renderLoginPage, renderRegisterPage, handleLogin, handleRegister } = require('../controllers/authController')
const router = express.Router()

router.route("/login").get(renderLoginPage).post(handleLogin)
router.route("/register").get(renderRegisterPage).post(handleRegister)



module.exports = router

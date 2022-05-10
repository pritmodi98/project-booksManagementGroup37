const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const userLogin = require("../controllers/loginController")

router.post("/register",userController.createUser)
router.post("/login",userLogin.userLogin)

module.exports=router;


const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const userLogin = require("../controllers/loginController")

router.post("/register",userController.createUser)
router.post("/login",userLogin.userLogin)
router.put('/books/:bookId',bookController.updateBookById)

module.exports=router;


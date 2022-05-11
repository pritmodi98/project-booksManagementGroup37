const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const userLogin = require("../controllers/loginController")

router.post("/register",userController.createUser)
router.post("/login",userLogin.userLogin)
<<<<<<< HEAD
router.put('/books/:bookId',bookController.updateBookById)
=======
router.post("/books",bookController.createBook)
router.get("/books",bookController.getBook)

>>>>>>> 471fe218ef171da09fb1bcd3b9193e25932def37

module.exports=router;


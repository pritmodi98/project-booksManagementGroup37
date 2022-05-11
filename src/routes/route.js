const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const userLogin = require("../controllers/loginController")
const reviewController = require("../controllers/reviewController")


router.post("/register",userController.createUser)
router.post("/login",userLogin.userLogin)
router.post("/books",bookController.createBook)
router.get("/books",bookController.getBook)
router.post("/books/:bookId/review",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)

module.exports=router;


const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const userController=require("../controllers/userController")

router.post('/register',userController.createUser)
=======
const userController = require("../controllers/userController")

router.post("/register",userController.createUser)
>>>>>>> b57feecdf395b9c696184b1ef1964bd626b6a9b1

module.exports=router;


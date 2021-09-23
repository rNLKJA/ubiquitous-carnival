  const express = require('express');

const userRouter = express.Router();

const userController = require('../controller/userController.js');
const passport = require('passport');
require('../config/passport')(passport);

userRouter.get('/logout' , userController.handleLogout)
userRouter.get('/jwtTest',userController.isAuth)
userRouter.post('/login',userController.handleLogin)
userRouter.post('/signup',userController.register)

module.exports = userRouter;
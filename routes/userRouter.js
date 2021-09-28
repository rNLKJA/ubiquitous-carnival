  const express = require('express');

const userRouter = express.Router();

const userController = require('../controller/userController.js');
const passport = require('passport');
require('../config/passport')(passport);

userRouter.get('/logout' , userController.handleLogout)
userRouter.get('/jwtTest',passport.authenticate('jwt', { session: false }) , (req,res) => userController.isAuth(req,res))
userRouter.post('/login',userController.handleLogin)
userRouter.post('/signup',userController.register)

module.exports = userRouter;
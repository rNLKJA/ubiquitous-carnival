  const express = require('express');

const userRouter = express.Router();
const { emailAuthSend,emailCodeVerify } = require('../config/emailAuth');
const userController = require('../controller/userController.js');
const passport = require('passport');
require('../config/passport')(passport);

userRouter.get('/logout' , userController.handleLogout)
userRouter.get('/jwtTest',userController.isAuth)
userRouter.post('/login',userController.handleLogin)
userRouter.post('/signup',userController.register)

userRouter.post('/sendEmailcode', emailAuthSend)
userRouter.post('/emailVerify', emailCodeVerify)
userRouter.post('/test', userController.test_post)
module.exports = userRouter;
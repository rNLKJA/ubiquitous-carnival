  const express = require('express');

const userRouter = express.Router();
const emailAuth = require('../config/emailAuth');
const userController = require('../controller/userController.js');
const passport = require('passport');
require('../config/passport')(passport);

userRouter.get('/logout' , userController.handleLogout)
userRouter.get('/jwtTest',passport.authenticate('jwt', { session: false }) , (req,res) => userController.isAuth(req,res))
userRouter.post('/login',userController.handleLogin)
userRouter.post('/signup', emailCodeVerify, userController.register)

userRouter.post('/sendEmailcode', emailAuth.emailAuthSend)
userRouter.post('/emailVerify', emailAuth.emailCodeVerify)
userRouter.post('/fastRegisterPrepare', userController.emailFastRegister, emailAuth.emailRegisterCodeSend)
userRouter.post('/fastRegisterConfirm', emailAuth.emailRegisterVerify, userController.emailFastRegisterConfirm)

//this router is for test and debug of email fast register
//the function will contacin a page that able to post to /fastRegisterConfirm with accountId
userRouter.get('/fastRegister/:accountId', userControll.postTofastRegisterConfirm)
module.exports = userRouter;
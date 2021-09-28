const express = require('express')

const profileRouter = express.Router()

const profileController = require("../controller/profileController.js")
const passport = require('passport');
const { upload } = require('../config/upload')
require('../config/passport')(passport);
// const photoUpload = require('../config/upload')

profileRouter.post('/profile/updateProfile', passport.authenticate('jwt', { session: false }), (req,res) => profileController.updateProfile(req,res))

profileRouter.post('/profile/addPhone', passport.authenticate('jwt', { session: false }), (req,res) => profileController.addPhone(req,res))

profileRouter.post('/profile/delPhone', passport.authenticate('jwt', { session: false }), (req,res) => profileController.delPhone(req,res))

profileRouter.post('/profile/addEmail', passport.authenticate('jwt', { session: false }), (req,res) => profileController.addEmail(req,res))

profileRouter.post('/profile/delEmail', passport.authenticate('jwt', { session: false }), (req,res) => profileController.delEmail(req,res))

profileRouter.get('/profile/showProfile', passport.authenticate('jwt', { session: false }), (req,res) => profileController.showProfile(req,res))

profileRouter.post('/uploadUserImage', upload.single('portrait'), (req,res) => profileController.uploadPhoto(req,res))

module.exports = profileRouter
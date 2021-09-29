const express = require('express')

const profileRouter = express.Router()

const profileController = require("../controller/profileController.js")
const passport = require('passport');
const { upload } = require('../config/upload')
require('../config/passport')(passport);
// const photoUpload = require('../config/upload')

profileRouter.post('/updateProfile', passport.authenticate('jwt', { session: false }), (req,res) => profileController.updateProfile(req,res))

profileRouter.post('/addPhone', passport.authenticate('jwt', { session: false }), (req,res) => profileController.addPhone(req,res))

profileRouter.post('/delPhone', passport.authenticate('jwt', { session: false }), (req,res) => profileController.delPhone(req,res))

profileRouter.post('/addEmail', passport.authenticate('jwt', { session: false }), (req,res) => profileController.addEmail(req,res))

profileRouter.post('/delEmail', passport.authenticate('jwt', { session: false }), (req,res) => profileController.delEmail(req,res))

//profileRouter.get('/showProfile', passport.authenticate('jwt', { session: false }), (req,res) => profileController.showProfile(req,res))

profileRouter.get('/showProfile', profileController.showProfile)

profileRouter.post('/uploadUserImage', upload.single('portrait'), (req,res) => profileController.uploadPhoto(req,res))

module.exports = profileRouter
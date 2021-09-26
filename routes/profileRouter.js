const express = require('express')

const profileRouter = express.Router()

const profileController = require("../controller/profileController.js")
const passport = require('passport');
require('../config/passport')(passport);

profileRouter.post('/profile/updateProfile', passport.authenticate('jwt', { session: false }), (req,res) => profileController.updateProfile(req,res))

profileRouter.post('/profile/addPhone', passport.authenticate('jwt', { session: false }), (req,res) => profileController.addPhone(req,res))

profileRouter.post('/profile/delPhone', passport.authenticate('jwt', { session: false }), (req,res) => profileController.delPhone(req,res))

profileRouter.post('/profile/addEmail', passport.authenticate('jwt', { session: false }), (req,res) => profileController.addEmail(req,res))

profileRouter.post('/profile/delEmail', passport.authenticate('jwt', { session: false }), (req,res) => profileController.delEmail(req,res))

profileRouter.get('/profile/showProfile', passport.authenticate('jwt', { session: false }), (req,res) => profileController.showProfile(req,res))

module.exports = profileRouter
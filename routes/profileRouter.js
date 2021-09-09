const express = require('express')

const profileRouter = express.Router()

const profileController = require("../controller/profileController.js")

profileRouter.post('/updateProfile', passport.authenticate('jwt', { session: false }), (req,res) => profileController.updateProfile(req,res))

profileRouter.post('/addPhone', passport.authenticate('jwt', { session: false }), (req,res) => profileController.addPhone(req,res))

profileRouter.post('/delPhone', passport.authenticate('jwt', { session: false }), (req,res) => profileController.delPhone(req,res))

profileRouter.post('/addEmail', passport.authenticate('jwt', { session: false }), (req,res) => profileController.addEmail(req,res))

profileRouter.post('/delEmail', passport.authenticate('jwt', { session: false }), (req,res) => profileController.delEmail(req,res))

profileRouter.get('/showProfile', passport.authenticate('jwt', { session: false }), (req,res) => profileController.showProfile(req,res))

module.exports = profileRouter
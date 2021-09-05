const express = require('express')

const profileRouter = express.Router()

const profileController = require("../controller/profileController.js")

profileRouter.post('/updateProfile', profileController.updateProfile)

profileRouter.post('/addPhone', profileController.addPhone)

profileRouter.post('/delPhone', profileController.delPhone)

profileRouter.post('/addEmail', profileController.addEmail)

profileRouter.post('/delEmail', profileController.delEmail)

module.exports = profileRouter
const express = require('express')

const profileRouter = express.Router()

const profileController = require("../controller/profileController.js")

profileRouter.post('/updateProfile', profileController.updateProfile)

profileRouter.post('/addPhones', profileController.addPhones)

module.exports = profileRouter
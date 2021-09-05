const express = require('express');

const contactRouter = express.Router()

const expressValidator = require('express-validator')

const contactController = require('../controller/contactController.js')

contactRouter.get('/')

contactRouter.get('/createContact', contactController.createNewContact)
contactRouter.get('/showContact', contactController.showAllContact)

module.exports = contactRouter
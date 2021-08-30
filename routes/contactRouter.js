const express = require('express');

const contactRouter = express.Router()

const expressValidator = require('express-validator')

const contactController = require('../controller/contactController.js')

contactRouter.get('/')

contactRouter.get('/createController', contactController.createNewContact)

module.exports = contactRouter
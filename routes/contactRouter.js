const express = require('express');

const contactRouter = express.Router()

const expressValidator = require('express-validator')

const contactController = require('./controller/contactController')

contactRouter.get('/')

contactRouter.get('/createController')
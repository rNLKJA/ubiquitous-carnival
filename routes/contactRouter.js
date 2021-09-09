const express = require('express');

const contactRouter = express.Router()

const expressValidator = require('express-validator')

const contactController = require('../controller/contactController.js')

contactRouter.get('/')

contactRouter.get('/createContact', passport.authenticate('jwt', { session: false }), (req,res) => contactController.createNewContact(req, res))
contactRouter.get('/showContact', passport.authenticate('jwt', { session: false }), (req,res) => contactController.showAllContact(req,res))

module.exports = contactRouter
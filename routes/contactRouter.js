const express = require('express');

const contactRouter = express.Router()

const expressValidator = require('express-validator')

const contactController = require('../controller/contactController.js')
const passport = require('passport');
require('../config/passport')(passport);

contactRouter.get('/')

contactRouter.post('/createContact', contactController.createNewContact)
contactRouter.get('/showContact', passport.authenticate('jwt', { session: false }), (req,res) => contactController.showAllContact(req,res))
contactRouter.post('/showOneContact', passport.authenticate('jwt', { session: false }), (req,res) => contactController.showOneContact(req,res))
module.exports = contactRouter
const express = require('express');

const contactRouter = express.Router()

const expressValidator = require('express-validator')

const contactController = require('../controller/contactController.js')
const passport = require('passport');
const { upload } = require("../config/upload")
require('../config/passport')(passport);

contactRouter.get('/')

contactRouter.post('/createContact', passport.authenticate('jwt', { session: false }), (req,res) => contactController.createNewContact(req, res))
contactRouter.get('/showContact', passport.authenticate('jwt', { session: false }), (req,res) => contactController.showAllContact(req,res))
contactRouter.post('/showOneContact', passport.authenticate('jwt', { session: false }), (req,res) => contactController.showOneContact(req,res))

contactRouter.post('/uploadContactImage', upload.single('portrait'), (req,res) => contactRouter.contactPhotoUpload(req,res))
module.exports = contactRouter
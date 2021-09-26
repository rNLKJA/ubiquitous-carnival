const express = require('express');

const recordRouter = express.Router()

const expressValidator = require('express-validator')

const recordController = require('../controller/recordController.js')
const passport = require('passport');
require('../config/passport')(passport);

recordRouter.get('/')

recordRouter.post('/record/createRecord', passport.authenticate('jwt', { session: false }), (req,res) => recordController.createRecord(req, res))
recordRouter.get('/record/showRecord', passport.authenticate('jwt', { session: false }), (req,res) => recordController.showAllRecords(req,res))
module.exports = recordRouter
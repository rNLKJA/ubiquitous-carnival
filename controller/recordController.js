const mongoose = require('mongoose')
const Record = mongoose.model('Record')
const passport = require('passport');
const User = mongoose.model('User')
const { records } = require('../models/recordSchema')

require('../config/passport')(passport);


/**
* create a new Record Function
* @param {express.Request} req - information json for add a record
* @param {express.Response} res - response from the system.
*/
const createRecord = async (req, res) => {
    /*
    request header: username
    request body:
    {   
        "clientUsername" : "Harrison12138",
        "firstName": "Hongji",
        "lastName": Huang,
        "dateTime": "10/10/2000",
        "location": "University of Melbourne"
    }*/
    const username = req.header.userName
    const {clientUsername, firstName, lastName, dateTime, location} = req.body
    if (dateTime==null) dateTime = new Date.now()
    try {
        newRecord = await Record.create({
            "lastName": lastName,
            "firstName": firstName,
            "dateTime": dateTime,
            "location": location,
            "ownerAccount" : username,
            "linkedAccount" : clientUsername
        })

        newRecord.save()
                    .then(data => {
                        console.log("Create record successfully " + data.userName)
                        res.send(data)
                    })
                    .catch(err => {
                        res.send(err)
                    })
    }catch(err){
        res.send("Database query failed")
    }
}

/**
* const show the specific record
* @param {express.Request} req 
* @param {express.Response} res - response from the system.
*/
const showSpecificRecord = async (req,res) => {
    try{
        RecordDetail = await Record.findOne({_id:mongoose.Types.ObjectId(req.user._id)}).lean()
        res.send(RecordDetail)
    }catch (err){
        res.send(err)
    }
}

/**
* Register Post Function
* @param {express.Request} req 
* @param {express.Response} res - response from the system.
*/
const showAllRecords = async (req,res) => {
    const ownerAccount = await User.findOne({_id: mongoose.Types.ObjectId(req.user._id)}).records("RecordList.record").lean()
    res.json(ownerAccount.recordList)
}

module.exports = {
    createRecord,
    showSpecificRecord,
    showAllRecords
}
const mongoose = require('mongoose')
const Record = mongoose.model('Record')
const passport = require('passport')
const User = mongoose.model('User')
const Contact = mongoose.model('Contact')
const { populate } = require('../models/recordSchema')

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
        "contact_id" : 12545485,
        "clientUsername" : "Harrison12138" or "null",
        "dateTime": "10/10/2000",
        "location": "University of Melbourne"
    }*/
    const username = req.header.userName
    const {contact_id, clientUsername, dateTime, location} = req.body
    if (dateTime==null) dateTime = new Date.now()
    try {
        meetingPerson = await Contact.findOne({_id: mongoose.Types.ObjectId(contact_id)}).lean(),
        newRecord = await Record.create({
            "meetingPerson": meetingPerson,
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
* show All Records for the user
* @param {express.Request} req 
* @param {express.Response} res - response from the system.
*/
const showAllRecords = async (req,res) => {
    const ownerAccount = await User.findOne({_id: mongoose.Types.ObjectId(req.user._id)}).populate("RecordList.record").lean()
    res.json(ownerAccount.recordList)
}

module.exports = {
    createRecord,
    showAllRecords
}
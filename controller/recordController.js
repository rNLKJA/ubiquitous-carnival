const mongoose = require('mongoose')
const Record = mongoose.model('Record')
const passport = require('passport');
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
        "clientUsername" : "Single",
        "firstName": "Hongji",
        "lastName": Huang,
        "dateTime": "10/10/2000",
        "location": "University of Melbourne"
    }*/
    const username = req.header.userName
    const {clientUsername, firstName, lastName, dateTime, location} = req.body
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

module.exports = {
    createRecord
}
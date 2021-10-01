/**
 * @module Record
 */
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
    request header: user
    request body:
    {  
        "contact_id": "6131e5b0e0accb25d09663f6",
        "dateTime": "2000/10/10",
        "location": "University of Melbourne",
        "notes": "the notes",
        "linkedAccount": "account",
        "ownerAccount" : "ownerAccount"
    }*/
    try {
        const {contact_id, dateTime, location, notes, linkedAccount} = req.body
        if (dateTime==null) {
            dateTimeOut = new Date.now()
        } else {
            dateTimeOut = new Date(dateTime)
        }
        
        meetingPerson = await Contact.findOne({_id: mongoose.Types.ObjectId(contact_id)}).lean()
        if (meetingPerson == null) throw err
        newRecord = await Record.create({
            "meetingPerson": contact_id,
            "dateTime": dateTimeOut,
            "location": location,
            "notes": notes,
            "linkedAccount" : linkedAccount,
            "ownerAccount" : req.user._id
        })
        await newRecord.save()
        await User.findOneAndUpdate(
            { _id: req.user._id }, 
            { $push: { 
                recordList: newRecord._id
            } 
            })
        res.json(newRecord)
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
    const ownerAccount = await User.findOne({_id: mongoose.Types.ObjectId(req.user._id)}).lean()
    const recordListIds = ownerAccount.recordList;
    recordList = new Array();
    var order;
    for (order in recordListIds) {
        record = await Record.findOne({_id: mongoose.Types.ObjectId(recordListIds[order])}).populate("meetingPerson").populate("linkedAccount").lean()
        recordList.push(record)
    }
    if(recordList != null) res.json(recordList)
}

/**
* search the records for the user, by meetingPerson or location or occupation
* @param {express.Request} req - the query json from front end
* @param {express.Response} res - response from the system.
*/
const searchRecord = async (req, res) => {
    const validationErrors = expressValidator.validationResult(req)
    if (!validationErrors.isEmpty()){
        return res.status(422).render('error', {errorCode: '422', message: 'Search works on alphabet characters only.'})
    }
    var query = {}

    if (req.body.meetingPerson != ''){
        query["meetingPerson"] = {$regex: new RegExp(req.body.meetingPerson, 'i') }
    }
    if (req.body.location != ''){
        query["location"] = {$regex: new RegExp(req.body.location, 'i') }
    }
    if (req.body.occupation != ''){
        query["occupation"] = {$regex: new RegExp(req.body.occupation, 'i') }
    }
    if (req.body.dateTime != ''){
        try {
            const searchDate = new Date(req.body.dateTime)
            var matchRecords = await Record.find({dateTime: {$lt: searchDate.getTime()}})
            res.json(matchRecords)
            return
        } catch (err) {
            console.log(err)
        }
    }
    try {
		const records = await Record.find(query).lean()
		res.json(records)	
	} catch (err) {
		console.log(err)
	}
}


module.exports = {
    createRecord,
    showAllRecords,
    searchRecord
}
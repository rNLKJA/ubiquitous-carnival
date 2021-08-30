// mongodb schema
const mongoose = require('mongoose')

const contactListSchema = new mongoose.Schema({
    contact: {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'},
    addSince: {type: Date, required: true, default: Date.now}
})

const recordListSchema = new mongoose.Schema({
    record: {type: mongoose.Schema.Types.ObjectId, ref: 'Record'},
    meetingTime: {type:Date, required: true, default: Date.now}
})
// create mongoose schema
const userSchema = new mongoose.Schema({
	loginID: {type: String, required: true},
	password: {type: String, required: true},
	lastName: {type: String},
	firstName: {type: String},
	portrait: { // store profile picture
        data: Buffer,
        contentType: String
    },
	occupation: {type: String},
	email: {type: Array}, 
	phone: {type: Array},
	userID: {type: String},
	status: {type: String}, // active, pending ? if only two status, consider use boolean
	contactList: [contactListSchema], // store a list of contact objects
	recordList: [recordListSchema]
})

const User = mongoose.model('User', userSchema)
const ContactList = mongoose.model('ContactList', contactListSchema)
const RecordList = mongoose.model('RecordList', recordListSchema)
module.exports = {User, ContactList, RecordList}
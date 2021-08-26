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
	lastName: {type: String, required: true},
	firstName: {type: String, required: true},
	portrait: { // store profile picture
        data: Buffer,
        contentType: String
    },
	occupation: {type: String, required: true},
	email: {type: Array, required: true},
	phone: {type: Array, required: true},
	userID: {type: Array, required: true},
	status: {type: String, required: true}, // active, pending ? if only two status, consider use boolean
	contactList: [contactListSchema], // store a list of contact objects
	recordList: [recordListSchema]
})

const User = mongoose.model('Users', userSchema)
const ContactList = mongoose.model('ContactList', contactListSchema)
const RecordList = mongoose.model('RecordList', recordListSchema)
module.exports = User
// mongodb schema
const mongoose = require("mongoose");

// create mongoose schema
const recordSchema = new mongoose.Schema({
    // Name of meeting person
	lastName: {type: String, required: true},
	firstName: {type: String, required: true},
	dateTime: {type: Date, required: true},
    location: {type: String, required: true},
    notes: {type: Array},
    pictures: [{
		data: Buffer,
		contentType: String 
	}],
    ownerAccount: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    meetingPersonAccount: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record
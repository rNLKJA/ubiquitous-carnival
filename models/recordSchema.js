// mongodb schema
const mongoose = require('mongoose');

// create mongoose schema
const recordSchema = new mongoose.Schema({
    // Name of meeting person
    meetingPerson: {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'},
	dateTime: {type: Date, required: true},
    location: {type: String, required: true},
    notes: {type: String},
    pictures: [{
		data: Buffer,
		contentType: String 
	}],
    linkedAccount: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    ownerAccount: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Contact = mongoose.model('Contact')
const ContactList = mongoose.model('ContactList')

const path = require('path')

const createNewContact = async (req, res) => {
    try {
        // Check if contact has account in app
            // Link
        // create formed schema for new contact

        //
        const onwerAccount = await User.findOne({_id:req.body.onwerAccount})
        const newContact = await Contact.create({
            "lastName": req.body.LastName,
            "firstName": req.body.FirstName,
            "portriat" : req.body.Portriat,
            "email": req.body.Email,
            "phone" : req.body.Phone,
            "meetRecord": req.body.MeetRecord,
            "occupation": req.body.Occupation,
            "addDate": Date.now,
            "note": req.body.Note,
            "status": req.body.Status,
            "onwerAccount" : req.body.onwerAccount,
            "linkedAccount" : req.body.linkedAccount
        })
        const formedContact = new Contact(newContact)
        const ContactIdLink = new ContactList({contact: formedContact.linkedAccount})
        
    }catch(err){
        res.send("Database query failed")
        throw(err)
    }
}
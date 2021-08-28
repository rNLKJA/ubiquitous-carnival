const mongoose = require('mongoose')
const User = mongoose.model('User')
const Contact = mongoose.model('Contact')
const ContactList = mongoose.model('ContactList')

const path = require('path')

const createNewContact = async (req, res) => {
    try {
        // if req is a user id
        if (req.body.userId){
            const existAccountContact = await User.findOne({userID: req.body.userId}).lean()
        } else {
            const existAccountContact = await User.findOne({lastName: req.body.lastName, firstName: req.body.firstName, 
                phone: req.body.phone, email:req.body.email}).lean()
        } 
        //

        // Check if contact has account in app
        
            // Link
        // create formed schema for new contact

        //
        const onwerAccount = await User.findOne({_id:req.body.onwerAccount}).lean()
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
            "linkedAccount" : existAccountContact
        })
        const formedContact = new Contact(newContact)
        const ContactIdLink = new ContactList({contact: formedContact.linkedAccount, addSince: Date.now})
        await onwerAccount.contactList.push(ContactIdLink)
        formedContact.save()
    }catch(err){
        res.send("Database query failed")
        throw(err)
    }
}
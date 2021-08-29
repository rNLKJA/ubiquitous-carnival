const mongoose = require('mongoose')
const User = mongoose.model('User')
const Contact = mongoose.model('Contact')
const ContactList = mongoose.model('ContactList')

const path = require('path')

const createNewContact = async (req, res) => {
    try {
        const onwerAccount = await User.findOne({_id:req.body.onwerAccount}).lean()
        // if req is a user id
        const existAccountContact
        if (req.body.userId){
            existAccountContact = await User.findOne({userID: req.body.userId}).lean()
        } else {
        // Check if contact has account in app
            existAccountContact = await User.findOne({lastName: req.body.lastName, firstName: req.body.firstName, 
                phone: req.body.phone, email:req.body.email}).lean()
        } 
        //
        const newContact
        if (existAccountContact == null) {
            newContact = await Contact.create({
                "lastName": req.body.lastName,
                "firstName": req.body.firstName,
                "portriat" : req.body.portriat,
                "email": req.body.email,
                "phone" : req.body.phone,
                "meetRecord": req.body.meetRecord,
                "occupation": req.body.occupation,
                "addDate": Date.now,
                "note": req.body.note,
                "status": true,
                "onwerAccount" : mongoose.Types.ObjectId(req.body.onwerAccount),
                "linkedAccount" : null
            })
        } else {
            newContact = await Contact.create({
                "lastName": existAccountContact.lastName,
                "firstName": existAccountContact.firstName,
                "portriat" : existAccountContact.portriat,
                "email": existAccountContact.email,
                "phone" : existAccountContact.phone,
                "meetRecord": existAccountContact.meetRecord,
                "occupation": existAccountContact.occupation,
                "addDate": Date.now,
                "note": existAccountContact.note,
                "status": true,
                "onwerAccount" : mongoose.Types.ObjectId(req.body.onwerAccount),
                "linkedAccount" : existAccountContact._id
            })
        }
        // const formedContact = new Contact(newContact)
        // formedContact.save()
        const ContactIdLink = new ContactList({contact: newContact._id, addSince: Date.now})
        await onwerAccount.contactList.push(ContactIdLink)
        
        
    }catch(err){
        res.send("Database query failed")
        throw(err)
    }
}
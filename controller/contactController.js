const mongoose = require('mongoose')
const { populate } = require('../models/contactSchema')

const passport = require('passport');
require('../config/passport')(passport);

const User = mongoose.model('User')
const Contact = mongoose.model('Contact')
const ContactList = mongoose.model('ContactList')

/**
* check if duplication contact exist for this account Function
* @param {express.Request} req - basic information for add a contact and who is adding this contact
*/
const duplicateContact = async (req, res) => {
    const inputContact = await Contact.findOne({lastName: req.body.lastName, 
        firstName: req.body.firstName, 
        phone: req.body.phone, 
        email:req.body.email,
        onwerAccount: req.body.onwerAccount}).lean()
    res.send(inputContact)
}

/**
* check if contact exist in system Function
* @param {express.Request} req - basic information for add a contact
*/
const existAccount = async (req, res) => {
    const inputContact = await User.findOne({lastName: req.body.lastName, 
        firstName: req.body.firstName, 
        phone: req.body.phone, 
        email:req.body.email}).lean()
    res.send(inputContact)
    }

    /**
* Register Post Function
* @param {express.Request} req - basic information for add a contact and who is adding this account.
* @param {express.Response} res - response from the system.
*/
const createNewContact = async (req, res) => {
    try {
        //!! can not use object id as input 
        const onwerAccount = await User.findOne({_id:req.body.onwerAccount})
        // if req is a user id
        let existAccountContact = null
        let dupContact = null
        if (req.body.userId){
            existAccountContact = await User.findOne({userID: req.body.userId}).lean()
        } else {
        // Check if contact has account in app
            existAccountContact = await User.findOne({
                lastName: req.body.lastName, 
                firstName: req.body.firstName, 
                phone: req.body.phone, 
                email:req.body.email}).lean()
            dupContact = await Contact.findOne({
                lastName: req.body.lastName, 
                firstName: req.body.firstName, 
                phone: req.body.phone, 
                email:req.body.email,
                onwerAccount: req.body.onwerAccount}).lean()
        } 
        //!!gengerate one meeting record automatically!
        console.log(req.body.lastName)
        let newContact = null
        if (existAccountContact == null && dupContact == null) {
            newContact = await Contact.create({
                "lastName": req.body.lastName,
                "firstName": req.body.firstName,
                "portriat" : req.body.portriat,
                "email": req.body.email,
                "phone" : req.body.phone,
                "meetRecord": req.body.meetRecord,
                "occupation": req.body.occupation,
                "addDate": Date.now(),
                "note": req.body.note,
                "status": true,
                "onwerAccount" : mongoose.Types.ObjectId(req.body.onwerAccount),
                "linkedAccount" : null
            })
        } else if (existAccountContact != null && dupContact != null) {
            newContact = await Contact.create({
                "lastName": existAccountContact.lastName,
                "firstName": existAccountContact.firstName,
                "portriat" : existAccountContact.portriat,
                "email": existAccountContact.email,
                "phone" : existAccountContact.phone,
                "meetRecord": existAccountContact.meetRecord,
                "occupation": existAccountContact.occupation,
                "addDate": Date.now(),
                "note": existAccountContact.note,
                "status": false,
                "onwerAccount" : mongoose.Types.ObjectId(req.body.onwerAccount),
                "linkedAccount" : existAccountContact._id
            })
        } else if (dupContact != null){
            res.send({})
            return
        }
        // const formedContact = new Contact(newContact)
        // formedContact.save()
        const ContactIdLink = new ContactList({contact: newContact._id, addSince: Date.now})
        await onwerAccount.contactList.push(ContactIdLink)
        console.log(onwerAccount)
        await onwerAccount.save()
        res.send(newContact)
    }catch(err){
        res.send("Database query failed")
        throw(err)
    }
}
/**
* Register Post Function
* @param {express.Request} req - who is ask for showing all contact.
* @param {express.Response} res - response from the system.
*/
const showAllContact = async (req,res) => {
    const onwerAccount = await User.findOne({$or :
        [{userID: req.body.userID}, 
        {_id: mongoose.Types.ObjectId(req.body.objectId)}]}).populate("contactList.contact").lean()
    res.send(onwerAccount.contactList)
    
}

module.exports = {
    createNewContact,
    showAllContact,
    existAccount,
    duplicateContact
}
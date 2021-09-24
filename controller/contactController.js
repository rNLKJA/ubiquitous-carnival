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
        ownerAccount: req.body.ownerAccount}).lean()
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
        const ownerAccount = await User.findOne({_id:req.user._id})
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
                ownerAccount: req.user._id}).lean()
        } 
        //!!gengerate one meeting record automatically!
        console.log(req.body.lastName)
        let newContact = null
        if (existAccountContact == null && dupContact == null) {
            newContact = await Contact.create({
                "lastName": req.body.lastName,
                "firstName": req.body.firstName,
                "portraits" : req.body.portraits,
                "email": req.body.email,
                "phone" : req.body.phone,
                "meetRecord": req.body.meetRecord,
                "occupation": req.body.occupation,
                "addDate": Date.now(),
                "note": req.body.note,
                "status": true,
                "ownerAccount" : mongoose.Types.ObjectId(req.user._id),
                "linkedAccount" : null
            })
        } else if (existAccountContact != null && dupContact != null) {
            newContact = await Contact.create({
                "lastName": existAccountContact.lastName,
                "firstName": existAccountContact.firstName,
                "portraits" : existAccountContact.portraits,
                "email": existAccountContact.email,
                "phone" : existAccountContact.phone,
                "meetRecord": existAccountContact.meetRecord,
                "occupation": existAccountContact.occupation,
                "addDate": Date.now(),
                "note": existAccountContact.note,
                "status": false,
                "ownerAccount" : mongoose.Types.ObjectId(req.user._id),
                "linkedAccount" : existAccountContact._id
            })
        } else if (dupContact != null){
            res.send({})
            return
        }
        // const formedContact = new Contact(newContact)
        // formedContact.save()
        const ContactIdLink = new ContactList({contact: newContact._id, addSince: Date.now})
        await ownerAccount.contactList.push(ContactIdLink)
        console.log(ownerAccount)
        await ownerAccount.save()
        res.json(newContact)
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
    const ownerAccount = await User.findOne({$or :
        [{userID: req.body.userID}, 
        {_id: mongoose.Types.ObjectId(req.user._id)}]}).populate("contactList.contact").lean()
    res.json(ownerAccount.contactList)
    
}

/**
* Register Post Function
* @param {express.Request} req - give the object id if contact, or LinkedAccount Id if account exist, 
* @param {express.Response} res - response from the system.
*/
const showOneContact = async (req,res) => {
    try{
        const contactDetail = await Contact.findOne({_id:mongoose.Types.ObjectId(req.body.contactId)}).lean()
        res.send(contactDetail)
    } catch (err) {
        res.send(err)
    }
}

const searchContact = async (req, res) => {
    const validationErrors = expressValidator.validationResult(req)
    if (!validationErrors.isEmpty()){
        return res.status(422).render('error', {errorCode: '422', message: 'Search works on alphabet characters only.'})
    }
    var query = {}
    if (req.body.nofillter == true){
        //direct search by name?
        var nameSearch = req.body.searchContent.split(" ")
        var matchContacts = []
        try{
            for (var i = 0; i <= nameSearch.length(); i++){
            var potentailContacts = await Contact.find({$or :
                [{firstName: nameSearch[i]}, 
                {lastName: nameSearch[i]}]}).lean()
            matchContacts = [...new Set([...matchContacts, ...potentailContacts])]
            }
            res.json(matchContacts)
            return
        }catch(err){
            console.log(err)
        }
    }
    // if name in submited form
    if (req.body.lastName != ''){
        query["lastName"] = {$regex: new RegExp(req.body.lastName, 'i') }
    }
    if (req.body.firstName != ''){
        query["firstName"] = {$regex: new RegExp(req.body.firstName, 'i') }
    }
    if (req.body.phone != ''){
        query["phone"] = req.body.phone
    }
    if (req.body.email != ''){
        query["email"] = {$regex: new RegExp(req.body.email, 'i') }
    }
    if (req.body.occupation != ''){
        query["occupation"] = {$regex: new RegExp(req.body.occupation, 'i') }
    }
    if (req.body.addDate != ''){
        try {
            const searchDate = new Date(req.body.addDate)
            var matchContacts = await Contact.find({addDate: {$lt: searchDate.getTime()}})
            res.json(matchContacts)
            return
        } catch (err) {
            console.log(err)
        }
    }
    try {
		const contacts = await Contact.find(query).lean()
		res.json(contacts)	
	} catch (err) {
		console.log(err)
	}
}

module.exports = {
    createNewContact,
    showAllContact,
    existAccount,
    duplicateContact,
    showOneContact
}
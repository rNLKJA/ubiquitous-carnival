const mongoose = require('mongoose')
const userModel = mongoose.model('User')
const fs = require('fs')
const passport = require('passport');
require('../config/passport')(passport);

/**
* Upload the firstName, lastName and occupation
* @param {express.Request} req - Username, firstName, lastName and occupation from client
* @param {express.Response} res - response from the system.
*/
const updateProfile = async(req, res) => {
    /*{   
        "userName": "Harrison123",
        "firstName": "Hongji",
        "lastName": "Huang",
        "occupation": "Student",
        "status" : "Single"
    }*/

    const {userName, firstName, lastName, occupation, status} = req.body

    await userModel.updateOne({userName: userName}, 
        {
            firstName: firstName,
            lastName: lastName,
            occupation: occupation,
            status: status
        },
        function(err) {
            if(err) res.send("update fail")
            else    res.send("update success")
        }
    )
}


/**
* Add the phone number
* @param {express.Request} req - Username and phone number from client
* @param {express.Response} res - response from the system.
*/
const addPhone = async(req, res) => {
    /*{   
        "userName": "Harrison123",
        "phone": "0415467321"
    }*/

    try {
        const {userName, phone} = req.body
    
        const updatePhone = await userModel.findOneAndUpdate( 
            {userName: userName},
            { $push: {"phone": phone}},
            { upsert: true, new: true }
        )
        res.send("update success")

    } 
    catch(err) {
        res.send("update fail")
        throw(err)
    }
}

/**
* delete the phone number
* @param {express.Request} req - Username and phone number that want to delete
* @param {express.Response} res - response from the system.
*/
const delPhone = async(req, res) => {
    /*{   
        "userName": "Harrison123",
        "phone": "0415467321"
    }*/
    const {userName, phone} = req.body
    await userModel.updateOne(
        {userName: userName},
        {$pull:{"phone": phone}},
        function(err) {
            if(err) res.send("delete fail")
            else    res.send("delete success")
        }
    )
}

/**
* Add the email address
* @param {express.Request} req - Username and email address from client
* @param {express.Response} res - response from the system.
*/
const addEmail = async(req, res) => {
    /*{   
        "userName": "Harrison123",
        "email": "1637520754@qq.com"
    }*/
   try {
        const {userName, email} = req.body

        await userModel.findOneAndUpdate( 
            {userName: userName},
            { $push: {"email": email}},
            { upsert: true, new: true }
        )
        res.send("update success")

   } 
   catch(err) {
       res.send("update fail")
       throw(err)
   }
}

/**
* delete the email address
* @param {express.Request} req - Username and email address that want to delete
* @param {express.Response} res - response from the system.
*/
const delEmail = async(req, res) => {
    /*{   
        "userName": "Harrison123",
        "email": "1637520754@qq.com"
    }*/
    const {userName, email} = req.body
    await userModel.updateOne(
        {userName: userName},
        {$pull:{"email": email}},
        function(err) {
            if(err) res.send("delete fail")
            else    res.send("delete success")
        }
    )
}
/**
 * function that allow user upload their photo and store in database
 * @param  {express.Request} req contain the file information of uploaded file
 * @param  {express.Response} res contain the user information after uploaded
 */
const uploadPhoto = async (req, res) => {
    var img = {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype
    }
    try{
        //TODO: replace body._id to user._id 
        await userModel.updateOne({_id: req.body._id}, {portrait: img})
        const user = await userModel.findOne({_id: req.body._id})
        console.log('update success')
        res.send(user)
    }catch(err){
        console.log(err)
    }
    
}

//================================function for show the profile======================================//
/**
* Get the profile data of user
* @param {express.Request} req
* @param {express.Response} res - response from the system.
*/
const showProfile = async(req, res) => {
    try {
        res.json({
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            occupation: req.user.occupation,
            status: req.user.status,
            email: req.user.email,
            phone: req.user.phone
        })
    } 
    catch(err) {
        res.send("show fail")
    }
}

module.exports = {
    updateProfile,
    uploadPhoto,
    addPhone,
    delPhone,
    addEmail,
    delEmail,
    showProfile
}
const mongoose = require('mongoose')
const userModel = mongoose.model('User')
const fs = require('fs')
const passport = require('passport');
require('../config/passport')(passport);

/**
* Upload the firstName, lastName and occupation
* @param {express.Request} req - firstName, lastName and occupation from client
* @param {express.Response} res - response from the system.
*/
const updateProfile = async(req, res) => {
    /*{   
        "firstName": "Hongji",
        "lastName": "Huang",
        "occupation": "Student",
        "status" : "Single"
    }*/

    const {firstName, lastName, occupation, status} = req.body

    await userModel.updateOne({_id: req.user._id}, 
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
* @param {express.Request} req - phone number from client
* @param {express.Response} res - response from the system.
*/
const addPhone = async(req, res) => {
    /*{   
        "phone": "0415467321"
    }*/

    try {
        const updatePhone = await userModel.findOneAndUpdate( 
            {_id: req.user._id},
            { $push: {"phone": req.body.phone}},
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
        "phone": "0415467321"
    }*/
    await userModel.updateOne(
        {_id: req.user._id},
        {$pull:{"phone": req.body.phone}},
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
        "email": "1637520754@qq.com"
    }*/
   try {
        await userModel.findOneAndUpdate( 
            {_id: req.user._id},
            { $push: {"email": req.body.email}},
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
        "email": "1637520754@qq.com"
    }*/
    await userModel.updateOne(
        {_id: req.user._id},
        {$pull:{"email": req.body.email}},
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
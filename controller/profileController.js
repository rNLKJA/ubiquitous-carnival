//const mongoose = require('mongoose')
//const usersModel = mongoose.model('User')
const usersModel = require('../models/userSchema.js')

const updateProfile = async(req, res) => {
    /*
    req Jason format example:
    {   userName: "Harrison123",
        firstName: "Hongji",
        lastName: "Huang",
        occupation: "Student"
    }
    */
    const {userName, firstName, lastName, occupation} = req.body
    
    await usersModel.update({userName: userName}, 
        {$set:{
            firstName: firstName,
            lastName: lastName,
            occupation: occupation
        }}, 
        function(err) {
            if(err) console.log("update fail")
        }
    )

}

const updatePhoneNumber = async(req, res) => {
    /*
    req Jason format example:
    {   userName: "Harrison123",
        phone: 0415467321
    }
    */
    const {userName, phoneNumber} = req.body.phoneNumber

    const userInfo = await User.findOne({userName: userName}).lean()

    userInfo.phone.push(phoneNumber)

    await usersModel.update( {userName: userName},
        {$set:{
            phone: userInfo.phone
        }},
        function(err) {
            if(err) console.log("update fail")
        }
    )
}

module.exports = {
    updateProfile,
    updatePhoneNumber
}
const mongoose = require('mongoose')
const userModel = require('../models/userSchema.js')

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

    await userModel.updateOne({userName: userName}, 
        {
            firstName: firstName,
            lastName: lastName,
            occupation: occupation
        },
        function(err) {
            if(err) {
                res.send("update fail")
            } else {
                res.send("update success")
            }
        }
    )
}

const addPhones = async(req, res) => {
    /*
    req Jason format example:
    {   userName: "Harrison123",
        phone: 0415467321
    }
    */
    const {userName, phoneNumber} = req.body.phoneNumber

    const userInfo = await userModel.findOne({userName: userName}).lean()

    userInfo.phone.push(phoneNumber)

    await userModel.updateOne( {userName: userName},
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
    addPhones
}
const mongoose = require('mongoose')
const userModel = require('../models/userSchema.js')

const updateProfile = async(req, res) => {
    /*
    req Jason format example:
    {   
        "userName": "Harrison123",
        "firstName": "Hongji",
        "lastName": "Huang",
        "occupation": "Student"
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
            if(err) res.send("update fail")
            else    res.send("update success")
        }
    )
}

const addPhones = async(req, res) => {
    /*
    req Jason format example:
    {   
        "userName": "Harrison123",
        "phone": "0415467321"
    }
    */
   try {
        const {userName, phone} = req.body
    
        const updatePhone = await userModel.findOneAndUpdate( 
            {userName: userName},
            { $push: {"phone": phone}},
            { upsert: true, new: true }
        )

        res.send("update success")

   } catch(err) {
       res.send("update fail")
       throw(err)
   }
}

module.exports = {
    updateProfile,
    addPhones
}
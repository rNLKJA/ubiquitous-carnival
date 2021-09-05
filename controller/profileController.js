const mongoose = require('mongoose')
const userModel = mongoose.model('User')

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

//================================function for show the profile======================================//
/**
* Get the profile data of user
* @param {express.Request} req - Username from client
* @param {express.Response} res - response from the system.
*/
const showProfile = async(req, res) => {
    /*{   
        "userName": "Harrison123",
    }*/
    try {
        const {userName} = req.body
    
        const userProfile = await userModel.findOne({userName: userName}).lean()

        res.send({
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            occupation: userProfile.occupation,
            status: userProfile.status,
            email: userProfile.email,
            phone: userProfile.phone
        })

    } 
    catch(err) {
        res.send("show fail")
        throw(err)
    }
}

module.exports = {
    updateProfile,
    addPhone,
    delPhone,
    addEmail,
    delEmail,
    showProfile
}
const mongoose = require('mongoose')
const userModel = mongoose.model('User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const passport = require('passport');

require('../config/passport')(passport);


/**
* check Current User Authentication
* @param {express.Request} req 
* @param {express.Response} res - response from the system.
*/
const isAuth = (req, res) => {
      console.log("isAuth",req.user.userName )
      res.status(200).send(req.user.userName);
};

/**
* handle user Login and issues token to client
* @param {express.Request} req - request that contain information of userName and passport
* @param {express.Response} res - response from the system contain information if login successfully
*/
const handleLogin = async (req, res, next) => {
    console.log(req.body.userName + " is trying to login in backend")
    // passport.authenticate is provided by passport to authenticate
    // users
    // 'login' is the name of strategy that we have defined in the
    // passport.js file in the config folder
    // user and info should be passed by the 'login' strategy
    // to passport.authenticate -- see the code for the strategy
    passport.authenticate('local-login', async (err, user, info) => {
        try {
            console.log(info)
            // if there were errors during executing the strategy
            // or the user was not found, we display and error
            if (err || !user) {
                return res.json({
                    auth: false,
                    message: 'user not found',
                })
            }

            // otherwise, we use the req.login to store the user details
            // in the session. By setting session to false, we are essentially
            // asking the client to give us the token with each request
            req.login(user, {
                session: false
            }, async (error) => {

                if (error) {
                    
                    return  res.json({
                        auth: false,
                        message: 'user not found',
                    })}

                // We don't want to store sensitive information such as the
                // user password in the token so we pick only the user's email 
                const body = {
                    _id: user.userName
                };

                //Sign the JWT token and populate the payload with the user email 
                const token = jwt.sign({
                    body
                }, process.env.PASSPORT_KEY);

                //Send back the token to the client
                res.status(200); // OK status
                // send the token 

                console.log("you got the token " + token)
                res.json({
                    auth: true,
                    token : "Bearer " + token,
                    message: 'Your token release successfully'
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);

};

/**
* handle user Register a account and add them to database
* @param {express.Request} req - request that contain information of user
* @param {express.Response} res - response from the system contain information if register successfully
*/
const register = async (req, res) => {
    /*
    Jason format example (This should be the format for the request body):
     { userName: 'Harrison',
       email: 'hohuang@student.unimelb.edu.au',
       password: 'Harrison_59347835',
       re_password: 'Harrison_59347835' }
    */

    //1. get the input from the user
    const {
        userName,
        email,
        password,
        re_password
    } = req.body


    // //username regex
    // const userNameReg = /^[A-Za-z][A-Za-z0-9_]{7,19}$/
    // //email check regex
    // const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // //Use 8 or more characters with a mix of letters, numbers & symbols
    // const passwordReg = /^[A-Za-z\d@$!%*?&]{8,}$/
    // console.log({
    //     userName,
    //     email,
    //     password,
    //     re_password
    // })
    //use regex to check the all the user inputs
    // if (!emailReg.test(email)) {
    //     res.send('Incorrect email format, please try again you dump ass')
    // } else if (!userNameReg.test(userName)) {
    //     res.send('Username should start with an alphabet and length as 8-20')
    // } else if (!passwordReg.test(password)) {
    //     res.send('Use 8 or more characters with a mix of letters, numbers & symbols')
    // } else

    // for easy testing, delete the regex test
    if (password != re_password) {
        res.send('The passwords is different from you typed before')
    } else {

        try {
            const user_email = await userModel.findOne({
                email: email
            })
            const user_name = await userModel.findOne({
                userName: userName
            })

            if (user_email) {
                console.log("email has been used for someone else")
                res.send("email has been used for someone else")
            } else if (user_name) {
                console.log("uerName has been used for someone else")
                res.send("userName has been used for someone else")
            } else {
                const userPassword = await bcrypt.hash(password, 10)

                const newUser = await new userModel({
                    userName: userName,
                    email: email,
                    password: userPassword
                })

                newUser.save()
                    .then(data => {
                        console.log("signup successfully " + data.userName)
                        res.send({status: true ,data: data.userName})
                    })
                    .catch(err => {
                        res.send(err)
                    })
            }
        }catch(err){
            console.log(err)
        }

    }
}

/**
 * this middleware function will create a temporary user document wait for new user finish regist
 * @param  {express.Request} req contain contact information that used to create user
 * @param  {express.Response} res contain obejct id of temporary user document
 * @param  {express.Next} next
 */
const emailFastRegister = async (req, res, next) => {
    try{
        const newUser = await new userModel({
        "lastName": req.body.lastName,
        "firstName": req.body.firstName,
        "email": req.body.email,
        "phone" : req.body.phone,
        "occupation": req.body.occupation,
        "status": false,
        })
        await newUser.save()
        // save user id for send email 
        res.locals._id = newUser._id
        // send new User object to front end to trigger function to connect contact with an account 
        res.send(newUser._id)
        //delete temporary user after 16 minutes
        setTimeout(async () => {
            const temUser = await userModel.findOne({_id:mongoose.Types.ObjectId(newUser._id)})
            if (temUser.staus == false){
                await userModel.deleteMany({ _id:mongoose.Types.ObjectId(newUser._id) });
            }
          }, 1000 * 60 * 16);
        next()
    }catch(err){
        console.log(err)
    }

}

/**
 * confirm user register through email link, activity user's account
 * @param  {express.Request} req this contain register information of temporary user
 * @param  {express.Response} res this contain auth result of temporary user register
 */
const emailFastRegisterConfirm = async (req, res) => {
    // should we adding email to this part?
    if (res.locals.authResult == 0){
        res.send("auth fail!!")
    }
    const {
        userName,
        password,
        re_password
    } = req.body
    if (password != re_password) {
        res.send('The passwords is different from you typed before')
    } else {

        try {
            const user_name = await userModel.findOne({
                userName: userName
            })

            if (user_name) {
                console.log("uerName has been used for someone else")
                res.send("userName has been used for someone else")
            } else {
                const userPassword = await bcrypt.hash(password, 10)
                constnewUser = await userModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body._id)},
                {userName: userName, password: userPassword, status:true}, {new:true})
                res.send("your account is active now!")
            }
        }catch(err){
            console.log(err)
        }
        
    }

}

module.exports = {
    handleLogin,
    register,
    isAuth,
    emailFastRegisterConfirm,
    emailFastRegister
}

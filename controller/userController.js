const mongoose = require('mongoose')
const userModel = mongoose.model('User')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { json } = require('express');
const passport = require('passport');
const { promisify } = require('util');

require('../config/passport')(passport);

const handleLogout = (req, res) => {
    res.cookie('jwt' , 'none' , {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
        
    })
    console.log("log out succussfully")
    res.status(200).json({status: true,message: "logout successful"})
}


// this route is used to check the authentication of user. a true status will return if user pass the jwt test


const isAuth = async(req, res) => {
    console.log("is auth")
    let currentUser;
    if (req.cookies.jwt && req.cookies.jwt != "none") {
        const token = req.cookies.jwt;
        const decoded = await promisify(jwt.verify)(token, process.env.PASSPORT_KEY);
        console.log(decoded, " decode<--")
        currentUser = await userModel.findOne(decoded._id);
        currentUser.password = undefined
      } else {
        currentUser =  null;
      }    

      console.log(currentUser)

      res.status(200).send({ currentUser });
};


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
                res.cookie('jwt', token, {
                    maxAge: 60 * 60 * 24 * 30,
                    HttpOnly: true,
                    Secure: true,
                });

                console.log("you got the token " + token)
                res.json({
                    auth: true,
                    token : token,
                    message: 'Your token release successfully'
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);

};


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
                        res.send(data)
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


const emailFastRegister = (req, res, next) => {
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
        req.locals._id = newUser._id
        res.send(newUser._id)
        setTimeout(async () => {
            await userModel.deleteMany({ _id:mongoose.Types.ObjectId(newUser._id) });
          }, 1000 * 60 * 16);
        next()
    }catch(err){
        console.log(err)
    }

}

const emailFastRegisterConfirm = (req, res) => {
    // should we adding email to this part?
    if (req.locals.authResult == 0){
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
    handleLogout,
    emailFastRegisterConfirm,
    emailFastRegister
}
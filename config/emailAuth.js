const ExpressHandlebars = require("express-handlebars/lib/express-handlebars");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const EmailAuth = mongoose.model("EmailAuth");
const EmailRegister = mongoose.model("EmailRegister")

const transport = nodemailer.createTransport(
  smtpTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "team4399Auth@gmail.com",
      pass: "Team4399.com",
    },
  }),
);

transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  }
});
/**
 * this function can random generator a code with certain length
 * @param  {int} length length of the code generated
 */
const autoCodeGenerator = (length) => {
  var code = "";
  for (let i = 0; i < length; i++) {
    code += parseInt(Math.random() * 10);
  }
  return code;
};

// eamil reg for check form of input eamil
/**
 * this function will send a email that user input to implement email verify
 * @param  {express.Request} req this contains the eamil that user input when register
 * @param  {express.Response} res this contain the response from system of email sending result
 */
const emailAuthSend = async (req, res) => {
  const email = req.body.email; // read email from the request formdata field
  // console.log(email);

  const authCode = autoCodeGenerator(6);
  transport.sendMail(
    {
      from: "team4399Auth@gmail.com",
      to: email,
      subject: "vertify your email with code",
      html: `
          <h4>Hello!</h4>
          <p>You are registing account in <b>4399CRM</b></p>
          <p>Your verify code is：<strong style="color: #ff4e2a;">${authCode}</strong></p>
          <p><b>This code will expire in 5 mins</b></p>`
    },
    function (error, data) {
      console.log(error);
      // assert(error, 500, "fail to send vertify code")
      transport.close();
    },
  );
  try {
    await EmailAuth.deleteMany({ email: email });
    const AuthDocument = new EmailAuth({ email: email, authCode: authCode });
    await AuthDocument.save();
    setTimeout(async () => {
      await EmailAuth.deleteMany({ email: email });
    }, 1000 * 60 * 5);
    res.send("your email code has been send!");
  } catch (err) {
    console.log(err);
  }
};

/**
 * this function will compare the input verify code with database to finish email verify
 * @param  {express.Request} req this contains the email and verify code that user input
 * @param  {express.Response} res this contains the response of system if fail to verify
 * @param  {express.Next} next this will led to next (middleware) function
 */
const emailCodeVerify = async (req, res, next) => {
  const verify = EmailAuth.find({
    email: req.body.email,
    authCode: req.body.authCode,
  }).lean();
  console.log(verify);
  if (!verify.length) {
    return res.send("wrong code!");
  }
  await EmailAuth.deleteMany({ email: req.body.email });
  delete req.body.authCode;
  next();
};

/**
 * this function will send a link to user who register while others adding them as contact for finish register
 * @param  {express.Request} req contain temporary user information and object id 
 * @param  {express.Request} res system response of result message of email sending
 *
 */
const emailRegisterCodeSend = async (req, res) => {
  const email = req.body.email;
  // get user id from previous middle ware function
  const registerAccount = res.locals._id; // read email from the request formdata field
  // console.log(email);

  const registeCode = autoCodeGenerator(10);
  //TODO:replace to front end website
  const fastRegisterLink = "http://localhost:5000/user/fastRegister/"+ registerAccount
  transport.sendMail(
    {
      from: "team4399Auth@gmail.com",
      to: email,
      subject: "Complete your resigter by access the Link",
      html: `
          <h4>Hello!</h4>
          <p>You are registing account in <b>4399CRM</b></p>
          <p>Your fast register link：<strong style="color: #ff4e2a;">${fastRegisterLink}</strong></p>
          <p><b>This code will expire in 5 mins</b></p>`
    },
    function (error, data) {
      console.log(error);
      // assert(error, 500, "fail to send vertify code")
      transport.close();
    },
  );
  try {
    await EmailRegister.deleteMany({ registerAccount:mongoose.Types.ObjectId(registerAccount) });
    const RegisterDocument = new EmailRegister({registerAccount:mongoose.Types.ObjectId(registerAccount), fastRegisterCode: registeCode });
    await RegisterDocument.save();
    setTimeout(async () => {
      await EmailRegister.deleteMany({ registerAccount:mongoose.Types.ObjectId(registerAccount) });
    }, 1000 * 60 * 15);
    res.send("your email code has been send!");
  } catch (err) {
    console.log(err);
  }
};

/**
 * this function will verify whether email register opened in right time range
 * @param  {express.Request} req contain information that user input to finish fast register
 * @param  {express.Response} res system response
 * @param  {express.Next} next this will led to next (middleware) function
 */
const emailRegisterVerify = async (req, res, next) => {
  const verify = EmailRegister.find({
    registerAccount: mongoose.Types.ObjectId(req.body._id)
  }).lean();
  console.log(verify);
  if (!verify.length) {
    re.locals.authResult = 0
    next();
  }
  res.locals.authResult = 1
  await EmailAuth.deleteMany({ registerAccount: mongoose.Types.ObjectId(req.body._id) });
  next();
};

module.exports = {
  emailAuthSend,
  emailCodeVerify,
  emailRegisterCodeSend,
  emailRegisterVerify
};
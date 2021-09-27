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
  } else {
    console.log("Server is ready to take our messages");
  }
});

const autoCodeGenerator = (length) => {
  var code = "";
  for (let i = 0; i < length; i++) {
    code += parseInt(Math.random() * 10);
  }
  return code;
};

// eamil reg for check form of input eamil
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


const emailRegisterCodeSend = async (req, res) => {
  const email = req.body.email;
  const registerAccount = req.locals._id; // read email from the request formdata field
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

const emailRegisterVerify = async (req, res, next) => {
  const verify = EmailRegister.find({
    registerAccount: mongoose.Types.ObjectId(req.body._id)
  }).lean();
  console.log(verify);
  if (!verify.length) {
    req.locals.authResult = 0
    next();
  }
  req.locals.authResult = 1
  await EmailAuth.deleteMany({ registerAccount: mongoose.Types.ObjectId(req.body._id) });
  next();
};

module.exports = {
  emailAuthSend,
  emailCodeVerify,
  emailRegisterCodeSend,
  emailRegisterVerify
};

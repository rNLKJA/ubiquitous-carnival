const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const EmailAuth = mongoose.model("EmailAuth");

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

const autoCodeGenerator = () => {
  var code = "";
  for (let i = 0; i < 6; i++) {
    code += parseInt(Math.random() * 10);
  }
  return code;
};

// eamil reg for check form of input eamil
const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailAuthSend = async (req, res) => {
  const email = req.fields.email; // read email from the request formdata field
  // console.log(email);

  const authCode = autoCodeGenerator();
  if (1) {
    transport.sendMail(
      {
        from: "team4399Auth@gmail",
        to: email,
        subject: "vertify your email with code",
        html: `
            <h4>Hello!</h4>
            <p>You are registing account in <b>4399CRM</b></p>
            <p>Your verify code is：<strong style="color: #ff4e2a;">${authCode}</strong></p>
            <p><b>This code will expire in 5 mins</b></p>`,
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
  } else {
    console.log("not valid email!");
    // assert(false, 422, "not valid email!")
  }
};

const emailCodeVerify = async (req, res, next) => {
  const verify = EmailAuth.findOne({
    email: req.body.email,
    authCode: req.body.authCode,
  });
  if (verify == null) {
    assert(false, 422, "something wrong with auth code");
    return;
  }
  await EmailAuth.deleteMany({ email: req.body.email });
  delete req.body.authCode;
  next();
};

module.exports = {
  emailAuthSend,
  emailCodeVerify,
};

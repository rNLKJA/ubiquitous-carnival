// obtain required APIs
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
var cookieParser = require("cookie-parser");
const cors = require("cors");

// construct app
const app = express();
const jwt = require("jsonwebtoken");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
require("./models/database");
require("./config/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express-formidable
// app.use(formidable());

app.use(
  session({
    secret: process.env.PASSPORT_KEY,
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  }),
);

app.use(cookieParser());
//middleware that's required for passport to operate
app.use(passport.initialize());
// middleware to store user object
app.use(passport.session());

app.use(express.static("public"));

// start app
app.get("/", (req, res) => {
  console.log("Hey, there is an access request !!! ");
  res.send(
    '<p>The server is currently listening on port 4399</p>\
				<iframe src="https://giphy.com/embed/fWj2TR9mfYJ56" width="480"\
				height="264" frameBorder="0" class="giphy-embed" allowFullScreen>\
				</iframe><p hidden><a href="https://giphy.com/gifs/supernatural-yes\
				-dean-winchester-fWj2TR9mfYJ56">via GIPHY</a></p>',
  );
});

// TODO: remove testing module
//const contactRouter = require('./routes/contactRouter.js')
//app.use('/contact', contactRouter)

// router for testing
const profileRouter = require("./routes/profileRouter");
const contactRouter = require("./routes/contactRouter");
const userRouter = require("./routes/userRouter");
app.use("/profile", profileRouter);
app.use("/contact", contactRouter);
app.use("/user", userRouter);

// handling invalid links
app.all("*", (req, res) => {
  // 'default' route to catch user errors
  res.status(404).send();
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `the team 4399's server is listening at PORT: ${process.env.PORT}`,
  );
});

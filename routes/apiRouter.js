// import required libraries
const express = require("express");

// define the router
const apiRouter = express.Router();

// path environment variable
const path = require("path");

apiRouter.get("/testing", (req, res) => {
  res.send("testing");
});

apiRouter.get("/contactController", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/API documents/contactController.html"),
  );
});

apiRouter.get("/recordController", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/API documents/recordController.html"),
  );
});

apiRouter.get("/emailAuth", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/API documents/emalAuth.html"));
});

apiRouter.get("/profileController", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/API documents/profileController.html"),
  );
});

apiRouter.get("/userController", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/API documents/userController.html"),
  );
});

module.exports = apiRouter;

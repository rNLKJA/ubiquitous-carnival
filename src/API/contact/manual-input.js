import React, { useState } from "react";
import "./contact.css";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";
import "./manual-input.css";

const AddUser = () => {
  return (
    <React.Fragment>
      <div className="sub-container">
        <a href="javascript:history.go(-1)" className="back-button">
          Back
        </a>

        <form
          className="contact-form"
          method="POST"
          action="http://localhost:5000/contact/createContact"
        >
          <label for="lastName">Last Name: </label>
          <input
            name="lastName"
            type="text"
            placeholder="Please enter the First Name"
          ></input>

          <label for="firstName">First Name: </label>
          <input
            name="firstName"
            type="text"
            placeholder="Please enter the Last Name"
          ></input>

          <label for="email">E-mail: </label>
          <input
            name="email"
            type="email"
            placeholder="Please enter the E-mail"
          ></input>

          <label for="phone">Phone: </label>
          <input
            name="phone"
            type="text"
            placeholder="Please enter the phone number"
          ></input>

          <label for="occupation">Occupation: </label>
          <input
            name="occupation"
            type="text"
            placeholder="Please enter the occupation"
          ></input>

          <input type="submit" value="Create" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddUser;

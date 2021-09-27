import React, { useState } from "react";
import "./contact.css";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";

const AddUser = () => {
  return (
    <React.Fragment>
      <div className="sub-container">
        <form
          className="contact-form"
          method="POST"
          action="http://localhost:5000/contact/createContact"
        >
          <label for="lastName">First Name: </label>
          <input
            name="lastName"
            type="text"
            placeholder="Please enter the First Name"
          ></input>

          <label for="lastName">First Name: </label>
          <input
            name="lastName"
            type="text"
            placeholder="Please enter the First Name"
          ></input>

          <label for="lastName">First Name: </label>
          <input
            name="lastName"
            type="text"
            placeholder="Please enter the First Name"
          ></input>

          <label for="lastName">First Name: </label>
          <input
            name="lastName"
            type="text"
            placeholder="Please enter the First Name"
          ></input>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddUser;

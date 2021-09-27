import React, { useState } from "react";
import "./contact.css";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";
import "./manual-input.css";
import axios from "axios";

const AddUser = () => {
  const BASE_URL = "https://crm4399.herokuapp.com";
  // const BASE_URL = "http://localhost:5000";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const contact = {
      firstName,
      lastName,
      email,
      phone,
      occupation,
    };

    axios
      .post(BASE_URL + "/contact/createContact", contact)
      .then(() => console.log("Create a new contact"))
      .catch((err) => {
        console.error(err);
      });

    alert("You've create a new contact!");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setOccupation("");
  };

  return (
    <React.Fragment>
      <div className="sub-container">
        <a href="javascript:history.go(-1)" className="back-button">
          Back
        </a>

        <form className="contact-form" method="POST" onSubmit={handleSubmit}>
          <label for="lastName">Last Name: </label>
          <input
            name="lastName"
            type="text"
            placeholder="Please enter the First Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          ></input>

          <label for="firstName">First Name: </label>
          <input
            name="firstName"
            type="text"
            placeholder="Please enter the Last Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          ></input>

          <label for="email">E-mail: </label>
          <input
            name="email"
            type="email"
            placeholder="Please enter the E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>

          <label for="phone">Phone: </label>
          <input
            name="phone"
            type="text"
            placeholder="Please enter the phone number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          ></input>

          <label for="occupation">Occupation: </label>
          <input
            name="occupation"
            type="text"
            placeholder="Please enter the occupation"
            onChange={(e) => setOccupation(e.target.value)}
            value={occupation}
          ></input>

          <input type="submit" value="Create" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddUser;

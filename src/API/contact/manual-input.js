import React, { useState } from "react";
import "./contact.css";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";
import "./manual-input.css";
// import axios from "axios";
import fetchClient from "../axiosClient/axiosClient";

const AddUser = () => {
  const BASE_URL = "https://crm4399.herokuapp.com";
  // const BASE_URL = "http://localhost:5000";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [meetRecord, setMeetRecord] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const contact = {
      firstName,
      lastName,
      email,
      phone,
      occupation,
      portraits: "",
      meetRecord,
      note,
    };

    fetchClient
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
    setMeetRecord("");
    setNote("");
  };

  return (
    <React.Fragment>
      <div className="sub-container">
        <a href="javascript:history.go(-1)" className="back-button">
          Back
        </a>

        <form className="contact-form" method="POST" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name: </label>
          <input
            name="firstName"
            type="text"
            placeholder="Please enter the Last Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
          ></input>

          <label htmlFor="lastName">Last Name: </label>
          <input
            name="lastName"
            type="text"
            placeholder="Please enter the First Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
          ></input>

          <label htmlFor="email">E-mail: </label>
          <input
            name="email"
            type="email"
            placeholder="Please enter the E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          ></input>

          <label htmlFor="phone">Phone: </label>
          <input
            name="phone"
            type="text"
            placeholder="Please enter the phone number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
          ></input>

          <label htmlFor="occupation">Occupation: </label>
          <input
            name="occupation"
            type="text"
            placeholder="Please enter the occupation"
            onChange={(e) => setOccupation(e.target.value)}
            value={occupation}
            required
          ></input>

          <label htmlFor="meetRecord">Meeting Record: </label>
          <input
            name="meetRecord"
            type="text"
            placeholder="Please enter the meetRecord"
            onChange={(e) => setMeetRecord(e.target.value)}
            value={meetRecord}
            required
          ></input>

          <label htmlFor="note">Notes: </label>
          <input
            name="note"
            type="text"
            placeholder="Add Notes"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          ></input>

          <input type="submit" value="Create" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddUser;

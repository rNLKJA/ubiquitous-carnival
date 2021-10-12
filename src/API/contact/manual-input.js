import React, { useState, useEffect } from "react";
import "./contact.css";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";
import "./manual-input.css";
// import axios from "axios";
import fetchClient from "../axiosClient/axiosClient";
import { Link } from "react-router-dom";
import Heading from "../heading/heading.jsx";
import NavBar from "../nav/Navbar";

const AddUser = () => {
  useEffect(() => {
    document.title = "Add a new Contact";
  }, []);
  const BASE_URL = "https://crm4399.herokuapp.com";
  // const BASE_URL = "http://localhost:5000";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  // const [meetRecord, setMeetRecord] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contact = {
      firstName,
      lastName,
      email,
      phone,
      occupation,
      portraits: "",
      // meetRecord,
      note,
    };

    await fetchClient
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
    // setMeetRecord("");
    setNote("");

    // window.location.href = "/contact";
  };

  // const [image, setImage] = useState("");

  // const uploadImage = async (e) => {
  //   e.preventDefault();
  //   // console.log(image);

  //   const formData = new FormData();
  //   formData.append("portrait", image);

  //   await fetchClient
  //     .post("http://localhost:5000/profile/uploadUserImage", formData)
  //     .then((res) => console.log(res));

  //   console.log("posted");
  // };

  return (
    <React.Fragment>
      <Heading />
      <NavBar />
      <div className="sub-container">
        <Link to="/addUser">
          <a href="/addUser" className="back-button">
            Back
          </a>
        </Link>

        {/* <div className="upload-img">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={uploadImage}>Upload</button>
        </div> */}

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
            type="tel"
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="Please enter the phone number follow the pattern #### ### ###"
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

          {/* <label htmlFor="meetRecord">Meeting Record: </label>
          <input
            name="meetRecord"
            type="text"
            placeholder="Please enter the meetRecord"
            onChange={(e) => setMeetRecord(e.target.value)}
            value={meetRecord}
          ></input> */}

          <label htmlFor="note">Notes: </label>
          <textarea
            name="note"
            type="text"
            placeholder="Add Notes"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          ></textarea>

          <input type="submit" value="Create" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddUser;

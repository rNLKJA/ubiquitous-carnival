import React, { useState } from "react";
import "./contact.css";
import fetchClient from "../axiosClient/axiosClient";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";
import Heading from "../heading/heading.jsx";
import NavBar from "../nav/Navbar";
import { Link } from "react-router-dom";

const AddUser = () => {
  const [contact, setContact] = useState({ userName: "" });
  const [userName, setUserName] = useState("");
  const BASE_URL = "https://crm4399.herokuapp.com";
  const submitUserID = async (e) => {
    e.preventDefault();

    const contact = {
      userName,
    };

    await fetchClient
      .post(BASE_URL + "/contact/createContactByUserName", contact)
      .then((res) => console.log(res)) // TODO: duplicate account issue
      .catch((err) => {
        console.error(err);
      });

    setUserName("");
  };

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
        <h1>Add by User ID</h1>
        <form className="newID" method="POST" onSubmit={submitUserID}>
          <input
            name="firstName"
            type="text"
            placeholder="Please enter the User Name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          />
          <input type="submit" value="Create" />
          <br />
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddUser;

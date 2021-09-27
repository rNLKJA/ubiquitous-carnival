import React, { useState } from "react";
import "./contact.css";
import NavBar from "../nav/navbar-addContact";

const AddUser = () => {
  return (
    <React.Fragment>
      <div className="sub-container">
        <NavBar />
        {/* <div className="add-contact-container">
          <a href="./addUser/qr-code">
            <div className="qr-code">
              <img src={qr_code} alt="qr-code"></img>
              <h1>Scan QR Code</h1>
            </div>
          </a>
     
		      <a href="./addUser/user-id">
            <div className="user-id">
              <img src={user} alt="manual input"></img>
              <h1>Search By User Id</h1>
            </div>
          </a>

          <a href="./addUser/manual-input">
            <div className="manual">
              <img src={hand_write} alt="manual input"></img>
              <h1>Manual Input</h1>
            </div>
          </a>
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default AddUser;

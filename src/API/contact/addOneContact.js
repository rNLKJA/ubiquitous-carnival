import React, { useState } from "react";
import "./contact.css";
import NavBar from "../nav/navbar-addContact";

const AddUser = () => {
  return (
    <React.Fragment>
      <div className="sub-container">
        <div className="add-contact-container">
          <NavBar />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddUser;

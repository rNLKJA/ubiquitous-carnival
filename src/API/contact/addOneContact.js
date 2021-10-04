import React, { useEffect } from "react";
import "./contact.css";
import NavBar from "../nav/navbar-addContact";

const AddUser = () => {
  useEffect(() => {
    document.title = "Add a new Contact";
  }, []);
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

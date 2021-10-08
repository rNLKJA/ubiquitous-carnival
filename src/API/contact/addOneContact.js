import React, { useEffect } from "react";
import "./contact.css";
import NavBar from "../nav/navbar-addContact";
import NavBarBottom from "../nav/Navbar";
import Heading from "../heading/heading.jsx";

const AddUser = () => {
  useEffect(() => {
    document.title = "Add a new Contact";
  }, []);
  return (
    <React.Fragment>
      <Heading />
      <div className="sub-container">
        <div className="add-contact-container">
          <NavBar />
        </div>
      </div>
      <NavBarBottom />
    </React.Fragment>
  );
};

export default AddUser;

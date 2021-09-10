import React from "react";
import "./contact.css";
import { useContacts } from "../../BackEndAPI/contactAPI";

const Contact = () => {
  const contacts = useContacts();
  return (
    <div className="sub-container">
      <div className="contact">
        <div className="contactList">
          <div className="contactList-items">{contacts[0]}</div>
        </div>
        <div className="contactDetail"></div>
      </div>
    </div>
  );
};

export default Contact;

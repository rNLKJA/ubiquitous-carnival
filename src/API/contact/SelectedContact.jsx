import React, { useState, useEffect } from "react";
import "./editContact.css";
// import portrait from "./portrarit.png";

const SelectedContact = ({ setOneContact, oneContact, deleteHandler }) => {
  // set selectedContact state with an additional property named edit
  // if edit === true, allow user edit form
  const [selectedContact, setSelectedContact] = useState({
    ...oneContact,
    edit: false,
  });

  console.log(selectedContact);

  return (
    <React.Fragment>
      <button
        className="back"
        onClick={() => {
          setOneContact({ ...oneContact, selected: false });
        }}
      >
        Back
      </button>
      {/* <img src={portrait} alt="protrait.png" style={{ paddingTop: "15px" }} /> */}

      <DisplayContact
        contact={selectedContact}
        setContact={setSelectedContact}
      />

      <button
        className="delete-btn"
        style={{ color: "red" }}
        onClick={() => deleteHandler()}
      >
        Delete The Contact
      </button>
    </React.Fragment>
  );
};

export default SelectedContact;

export const DisplayContact = ({ contact, setContact }) => {
  return (
    <React.Fragment>
      <button
        className="edit-btn"
        onClick={() => setContact({ ...contact, edit: !contact.edit })}
      >
        Edit
      </button>
      <form className="edit-contact-form">
        <label>First Name: </label>
        <input
          value={contact.firstName}
          className="contact-input"
          readOnly={contact.edit}
        ></input>

        <label>Last Name: </label>
        <input
          value={contact.lastName}
          className="contact-input"
          readOnly={contact.edit}
        ></input>

        <label>Occupation: </label>
        <input
          value={contact.occupation}
          className="contact-input"
          readOnly={contact.edit}
        ></input>

        <label>Email Address</label>
        {contact.email.map((mail) => {
          return (
            <input
              value={mail}
              className="contact-input"
              readOnly={contact.edit}
              key={new Date().toISOString()}
            />
          );
        })}

        <label>Phone:</label>
        {contact.phone.map((phone) => {
          return (
            <input
              value={phone}
              className="contact-input"
              readOnly={contact.edit}
              key={new Date().toISOString()}
            />
          );
        })}

        <label>Notes:</label>
        <textarea
          style={{ height: "auto" }}
          value={contact.note}
          readOnly={contact.edit}
        ></textarea>
      </form>
    </React.Fragment>
  );
};

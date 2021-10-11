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
  if (contact.edit) {
    return (
      <React.Fragment>
        <button
          className="edit-btn"
          onClick={() => setContact({ ...contact, edit: false })}
        >
          Edit
        </button>
        <form className="edit-contact-form">
          <label>First Name: </label>
          <input className="contact-input" value={contact.firstName}></input>

          <label>Last Name: </label>
          <input className="contact-input" value={contact.lastName}></input>

          <label>Occupation: </label>
          <input className="contact-input" value={contact.occupation}></input>

          <label>Email Address</label>
          {contact.email.map((mail) => {
            return (
              <input
                className="contact-input"
                value={mail}
                key={new Date().toISOString()}
              />
            );
          })}
          <button className="field-add-btn">Add Email</button>

          <label>Phone:</label>
          {contact.phone.map((phone) => {
            return (
              <input
                className="contact-input"
                value={phone}
                key={new Date().toISOString()}
              />
            );
          })}
          <button className="field-add-btn">Add Phone</button>

          <label>Notes:</label>
          <textarea style={{ height: "auto" }} value={contact.note}></textarea>
        </form>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <button onClick={() => setContact({ ...contact, edit: true })}>
          Edit
        </button>
        <form className="edit-contact-form">
          <label>First Name: </label>
          <input
            value={contact.firstName}
            className="contact-input"
            readOnly
          ></input>

          <label>Last Name: </label>
          <input
            value={contact.lastName}
            className="contact-input"
            readOnly
          ></input>

          <label>Occupation: </label>
          <input
            value={contact.occupation}
            className="contact-input"
            readOnly
          ></input>

          <label>Email Address</label>
          {contact.email.map((mail) => {
            return (
              <input
                value={mail}
                className="contact-input"
                readOnly
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
                readOnly
                key={new Date().toISOString()}
              />
            );
          })}

          <label>Notes:</label>
          <textarea
            style={{ height: "auto" }}
            value={contact.note}
            readOnly
          ></textarea>
        </form>
      </React.Fragment>
    );
  }
};

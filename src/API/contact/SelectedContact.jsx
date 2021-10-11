import React, { useState, useEffect } from "react";
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

      <DisplayContact contact={selectedContact} />

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

export const DisplayContact = ({ contact }) => {
  if (contact.edit) {
  } else {
    return (
      <form style={{ textAlign: "left", padding: "20px" }}>
        <label>First Name: </label>
        <input value={contact.firstName} readOnly></input>

        <label>Last Name: </label>
        <input value={contact.lastName} readOnly></input>

        <label>Occupation: </label>
        <input value={contact.occupation} readOnly></input>

        <label>Email Address</label>
        {contact.email.map((mail) => {
          return <input value={mail} readOnly key={new Date().toISOString()} />;
        })}

        <label>Phone:</label>
        {contact.phone.map((phone) => {
          return (
            <input value={phone} readOnly key={new Date().toISOString()} />
          );
        })}

        <label>Notes:</label>
        <textarea
          style={{ height: "auto" }}
          value={contact.note}
          readOnly
        ></textarea>
      </form>
    );
  }
};

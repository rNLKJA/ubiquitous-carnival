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
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        deleteHandler={deleteHandler}
      />
    </React.Fragment>
  );
};

export default SelectedContact;

export const DisplayContact = ({
  selectedContact,
  setSelectedContact,
  deleteHandler,
}) => {
  const [contact, setContact] = useState(selectedContact);

  const handleSave = async (e) => {
    e.preventDefault();

    console.log(contact);
  };

  return (
    <React.Fragment>
      <button
        className="edit-btn"
        onClick={() => setContact({ ...contact, edit: !contact.edit })}
      >
        {contact.edit ? "Edit" : "Cancel"}
      </button>

      <form className="edit-contact-form">
        <label>First Name: </label>
        <input
          type="text"
          value={contact.firstName}
          className="contact-input"
          readOnly={contact.edit}
          onChange={(e) =>
            setContact({ ...contact, firstName: e.target.value })
          }
          required
        ></input>

        <label>Last Name: </label>
        <input
          type="text"
          value={contact.lastName}
          className="contact-input"
          readOnly={contact.edit}
          onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
        ></input>

        <label>Occupation: </label>
        <input
          type="text"
          value={contact.occupation}
          className="contact-input"
          readOnly={contact.edit}
          onChange={(e) =>
            setContact({ ...contact, occupation: e.target.value })
          }
          required
        ></input>

        <label>Phone:</label>
        {contact.phone.map((phone) => {
          return (
            <input
              value={phone}
              className="contact-input"
              readOnly={contact.edit}
              key={new Date().toISOString()}
              required
              minLength={10}
              maxLength={10}
              // onChange={(e) =>
              //   setContact({ ...contact, phone: e.target.value })
              // }
            />
          );
        })}

        {!contact.edit ? (
          <button className="field-add-btn">Add Phone</button>
        ) : null}

        <label>Email Address</label>
        {contact.email.map((mail) => {
          return (
            <input
              value={mail}
              type="email"
              className="contact-input"
              readOnly={contact.edit}
              key={new Date().toISOString()}
              required
              // onChange={(e) =>
              //   setContact({ ...contact, email: e.target.value })
              // }
            />
          );
        })}

        {!contact.edit ? (
          <button className="field-add-btn">Add Email</button>
        ) : null}

        <label>Notes:</label>
        <textarea
          style={{ height: "auto" }}
          value={contact.note}
          readOnly={contact.edit}
          onChange={(e) => setContact({ ...contact, note: e.target.value })}
        ></textarea>

        {!contact.edit ? (
          <button
            type="submit"
            className="save-btn"
            onSubmit={() => handleSave()}
          >
            Save Change
          </button>
        ) : null}

        <button
          className="delete-btn"
          style={{ color: "red" }}
          onClick={() => {
            if (window.confirm("Are you sure you wanna delete this contact?")) {
              deleteHandler();
            }
          }}
        >
          Delete The Contact
        </button>
      </form>
    </React.Fragment>
  );
};

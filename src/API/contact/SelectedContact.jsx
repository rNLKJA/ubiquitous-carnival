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
  const [phones, setPhones] = useState(
    ConvertListStringToListObject(contact.phone, "phone"),
  );
  const [emails, setEmails] = useState(
    ConvertListStringToListObject(contact.email, "email"),
  );

  const handleAddPhone = (e) => {
    e.preventDefault();
    setPhones([...phones, { phone: "" }]);
  };

  const handleAddEmail = (e) => {
    e.preventDefault();
    setEmails([...emails, { email: "" }]);
  };

  const removeHandler = (e, index, type) => {
    e.preventDefault();
    if (type === "phone") {
      setPhones((prev) => prev.filter((item) => item !== prev[index]));
    }

    if (type === "email") {
      setEmails((prev) => prev.filter((item) => item !== prev[index]));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    console.log(contact);
  };

  const phoneOnChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setPhones((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      });
    });
  };

  const emailOnChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setEmails((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      });
    });
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
        {phones.map((phone, i) => {
          return (
            <div key={`${phone}-${i}`} className="multi-field">
              <div className="multi-field-input">
                <input
                  type="text"
                  value={phone.phone}
                  className="contact-input"
                  name="phone"
                  readOnly={contact.edit}
                  required
                  minLength={10}
                  onChange={(e) => phoneOnChange(i, e)}
                />
              </div>
              <button
                className="multi-field-btn"
                onClick={(e) => removeHandler(e, i, "phone")}
              >
                X
              </button>
            </div>
          );
        })}

        {!contact.edit ? (
          <button className="field-add-btn" onClick={handleAddPhone}>
            Add Phone
          </button>
        ) : null}

        <label>Email Address</label>
        {emails.map((mail, i) => {
          return (
            <div key={`${mail}-${i}`} className="multi-field">
              <div className="multi-field-input">
                <input
                  value={mail.email}
                  type="email"
                  name="email"
                  className="contact-input"
                  readOnly={contact.edit}
                  required
                  onChange={(e) => emailOnChange(i, e)}
                />
              </div>
              <button
                className="multi-field-btn"
                onClick={(e) => removeHandler(e, i, "email")}
              >
                X
              </button>
            </div>
          );
        })}

        {!contact.edit ? (
          <button className="field-add-btn" onClick={handleAddEmail}>
            Add Email
          </button>
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

const ConvertListStringToListObject = (items, type) => {
  var result = [];
  if (type === "phone") {
    for (let i = 0; i < items.length; i++) {
      result.push({ phone: items[i] });
    }
  }

  if (type === "email") {
    for (let i = 0; i < items.length; i++) {
      result.push({ email: items[i] });
    }
  }
  return result;
};

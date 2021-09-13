import React from "react";
import { useState, useEffect } from "react";
import "./contact.css";
import { useContacts } from "../../BackEndAPI/contactAPI";
// import { requirePropFactory } from "@material-ui/core";
import Loading from "./pending";

const Contact = () => {
  const { loading, contacts, error } = useContacts();
  const [oneContact, setOneContact] = useState({
    firstName: "",
    lastName: "",
    email: [],
    linkedAccount: null,
    occupation: "",
    phone: [],
    selected: false,
  });

  useEffect(() => {
    console.log("Display Contact Changed");
    console.log(oneContact);
  }, [oneContact]);

  return (
    <div className="sub-container">
      <div className="contact">
        <div className="contactList">
          <div className="contactList-items">
            {contacts.map((person) => (
              <Person
                prop={person}
                key={person._id}
                setOneContact={setOneContact}
              />
            ))}
          </div>
        </div>
        {!oneContact.selected && (
          <div className="contactDetail">
            <Loading msg={"Please Select A Contact"} />
          </div>
        )}
        {oneContact.selected && (
          <div className="contactDetail">
            <img
              src={require("./portrarit.png")}
              alt="protrait.png"
              style={{ paddingTop: "15px" }}
            />
            <div className="name">
              <label>First Name: </label>
              {oneContact.firstName}
            </div>
            <div className="name">
              <label>Last Name: </label>
              {oneContact.lastName}
            </div>
            <div className="occupation">
              <label>Occupation: </label>
              {oneContact.occupation}
            </div>
            <div className="linkedAccount">
              <label>Linked Account: </label>
              {oneContact.linkedAccount}
            </div>
            <div className="email">
              {oneContact.email.map((mail) => {
                return (
                  <label key={new Date().toISOString()}>
                    Email Address: {mail}
                  </label>
                );
              })}
            </div>
            <div className="phone">
              {oneContact.phone.map((phone) => {
                return (
                  <label
                    key={new Date().toISOString()}
                    style={{ color: "rgb(47,71,137)" }}
                  >
                    Phone: {phone}
                  </label>
                );
              })}
            </div>
            <div className="note" style={{ height: "300px" }}>
              <input value={oneContact.note}></input>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;

export const Person = ({ prop, setOneContact }) => {
  return (
    <div
      className="person"
      onClick={() => setOneContact({ ...prop.contact, selected: true })}
    >
      <div className="profile">
        <img
          src={require("./index.jpg")}
          alt={`${prop.lastname} portfolio`}
        ></img>
      </div>
      <div className="info">
        <p>
          <b className="class">FN: </b>
          {prop.contact.firstName}
        </p>
        <p>
          <b className="class">LN: </b>
          {prop.contact.lastName}
        </p>
        <p>
          <b className="class">Work: </b>
          {prop.contact.occupation}
        </p>
      </div>
    </div>
  );
};

export const PersonInfo = ({ prop }) => {
  return <div className="personInfo"></div>;
};

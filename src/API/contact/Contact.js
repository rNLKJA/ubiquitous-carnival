import React from "react";
import "./contact.css";
import { useContacts } from "../../BackEndAPI/contactAPI";

const Contact = () => {
  const { loading, contacts, error } = useContacts();
  console.log(contacts);

  return (
    <div className="sub-container">
      <div className="contact">
        <div className="contactList">
          <div className="contactList-items">
            {contacts.map((person) => (
              <Person prop={person} key={person._id} />
            ))}
            {contacts.map((person) => (
              <Person prop={person} key={person._id} />
            ))}
            {contacts.map((person) => (
              <Person prop={person} key={person._id} />
            ))}

            {contacts.map((person) => (
              <Person prop={person} key={person._id} />
            ))}
            {contacts.map((person) => (
              <Person prop={person} key={person._id} />
            ))}
            {contacts.map((person) => (
              <Person prop={person} key={person._id} />
            ))}
            {contacts.map((person) => (
              <Person prop={person} key={person._id} />
            ))}
            {contacts.map((person) => (
              <Person prop={person} key={person._id} />
            ))}
            {contacts.map((person) => (
              <Person prop={person} key={person._id} />
            ))}
          </div>
        </div>
        <div className="contactDetail"></div>
      </div>
    </div>
  );
};

export default Contact;

export const Person = ({ prop }) => {
  return (
    <div className="person">
      <p>First Name: {prop.contact.firstName}</p>
      <p>Last Name: {prop.contact.lastName}</p>
      <p>Occupation: {prop.contact.occupation}</p>
    </div>
  );
};

export const PersonInfo = ({ prop }) => {
  return <div className="personInfo"></div>;
};

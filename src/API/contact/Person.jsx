import React from "react";
import portrait from "./index.jpg";

const Person = ({ prop, setOneContact }) => {
  return (
    <div
      className="person"
      onClick={() => {
        setOneContact({ ...prop.contact, selected: true });
      }}
    >
      <div className="profile">
        <img src={portrait} alt={`${prop.lastname} portfolio`}></img>
      </div>
      <div className="info">
        <p>
          <b className="class">First Name: </b>
          {prop.contact.firstName}
        </p>
        <p>
          <b className="class">Last Name: </b>
          {prop.contact.lastName}
        </p>
        <p>
          <b className="class">Occupation: </b>
          {prop.contact.occupation}
        </p>
      </div>
    </div>
  );
};

export default Person;

import React from "react";
import Person from "./Person";

const People = ({ contacts, setOneContact }) => {
  return (
    <div>
      {contacts.map((person) => {
        return (
          <Person
            prop={person}
            key={person._id}
            setOneContact={setOneContact}
          />
        );
      })}
    </div>
  );
};

export default People;

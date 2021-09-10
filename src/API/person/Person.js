import React from "react";
import LogOut from "../auth/Logout";


const Person = () => {
  return (
    <div className="sub-container">
      <h1>Personal Information</h1>
      <button className="btn btn-primary" onClick={LogOut}>logout</button>
    </div>
  );
};

export default Person;

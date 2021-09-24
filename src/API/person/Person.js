import React from "react";
import axios from "axios";
import LogoutUser from "../../hooks/useLogout";


const Person = (props) => {

  return (
    <div className="sub-container">
      <h1>Personal Information</h1>
      <button className="btn btn-primary" onClick={LogoutUser}>logout</button>
    </div>
  );
};


export default Person;

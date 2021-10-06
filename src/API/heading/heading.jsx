import React from "react";
import logo from "./logo.png";

const Heading = () => {
  return (
    <div className="heading">
      <a href="/">
        <img className="logo" src={logo} alt="4399CRM logo"></img>
      </a>
    </div>
  );
};

export default Heading;

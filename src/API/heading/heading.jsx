import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";

const Heading = () => {
  return (
    <div className="heading">
      <Link to="/">
        <img className="logo" src={logo} alt="4399CRM logo"></img>
      </Link>
    </div>
  );
};

export default Heading;

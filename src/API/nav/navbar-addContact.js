// import required dependencies
import React from "react";
import { Link } from "react-router-dom";
import qr_code from "./qr-code.png";
import hand_write from "./notes.png";
import user from "./user.png";
import "./contactNav.css";

// define navigation bar component
const Navbar = () => {
  return (
    <div className="addContact-nav">
      {/* link to contact route */}
      {/* <Link to="/addUser/qr-code">
        <div className="qr-code">
          <img src={qr_code} alt="qr-code"></img>
          <h1>Scan QR Code</h1>
        </div>
      </Link> */}

      {/* link to contact route */}
      {/* <Link to="/addUser/user-id">
        <div className="user-id">
          <img src={user} alt="manual input"></img>
          <h1>Search By User Id</h1>
        </div>
      </Link> */}

      {/* link to contact route */}
      {/* <Link to="/addUser/manual-input">
        <div className="manual">
          <img src={hand_write} alt="manual input"></img>
          <h1>Manual Input</h1>
        </div>
      </Link> */}
    </div>
  );
};

export default Navbar;

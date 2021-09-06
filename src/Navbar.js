// import required dependencies
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h4>
        <ul className="nav-links">
          <li style={{ fontsize: 20 }}>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/map">Google Map API</Link>
          </li>
          <li>
            <Link to="calendar">Google Calendar API</Link>
          </li>
        </ul>
      </h4>
    </nav>
  );
};

export default Navbar;

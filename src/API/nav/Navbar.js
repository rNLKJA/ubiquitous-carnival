// import required dependencies
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        {/* link to contact route */}
        <Link to="/contact">
          <img
            className="nav-icon"
            src={require("./icon/contact.png")}
            alt="contact-icon"
          />
        </Link>
      </div>

      {/* link to records route */}
      <div className="navbar">
        <Link to="/record">
          <img
            className="nav-icon"
            src={require("./icon/record.png")}
            alt="record-icon"
          />
        </Link>
      </div>

      {/* link to calendar route */}
      {/* <div className="navbar">
        <Link to="/calendar">
          <img className="nav-icon" src={require("./icon/calendar.png")} />
        </Link>
      </div> */}
      {/* disable calendar display function */}

      {/* link to search route */}
      <div className="navbar">
        <Link to="/search">
          <img
            className="nav-icon"
            src={require("./icon/Search.png")}
            alt="search-icon"
          />
        </Link>
      </div>

      {/* link to map route */}
      <div className="navbar">
        <Link to="/map">
          <img
            className="nav-icon"
            src={require("./icon/map.png")}
            alt="map-icon"
          />
        </Link>
      </div>

      {/* link to personal setting route */}
      <div className="navbar">
        <Link to="/setting">
          <img
            className="nav-icon"
            src={require("./icon/set.png")}
            alt="set-icon"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

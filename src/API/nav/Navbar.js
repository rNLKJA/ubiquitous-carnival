// import required dependencies
import React from "react";
import { Link } from "react-router-dom";
import settingIMG from "./icon/set.png";
import contactIMG from "./icon/contact.png";
import recordIMG from "./icon/record.png";
import mapIMG from "./icon/map.png";

// define navigation bar component
const Navbar = () => {
  return (
    <nav className="main-nav">
      <div className="navbar">
        {/* link to contact route */}
        <Link to="/contact">
          <img className="nav-icon" src={contactIMG} alt="contact-icon" />
        </Link>
      </div>

      {/* link to records route */}
      <div className="navbar">
        <Link to="/record">
          <img className="nav-icon" src={recordIMG} alt="record-icon" />
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
      {/* <div className="navbar">
        <Link to="/search">
          <img
            className="nav-icon"
            src={settingIMG}
            alt="search-icon"
          />
        </Link>
      </div> */}

      {/* link to map route */}
      <div className="navbar">
        <Link to="/map">
          <img className="nav-icon" src={mapIMG} alt="map-icon" />
        </Link>
      </div>

      {/* link to personal setting route */}
      <div className="navbar">
        <Link to="/setting">
          <img
            className="nav-icon"
            src={settingIMG}
            alt="set-icon"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

// import required dependencies
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        {/* link to contact route */}
        <Link to="/contact">
          <img className="nav-icon" src={require("./icon/contact.png")} />
        </Link>
      </div>

      {/* link to records route */}
      <div className="navbar">
        <Link to="/record">
          <img className="nav-icon" src={require("./icon/record.png")} />
        </Link>
      </div>

      {/* link to calendar route */}
      <div className="navbar">
        <Link to="/calendar">
          <img className="nav-icon" src={require("./icon/calendar.png")} />
        </Link>
      </div>

      {/* link to search route */}
      <div className="navbar">
        <Link to="/search">
          <img className="nav-icon" src={require("./icon/Search.png")} />
        </Link>
      </div>

      {/* link to map route */}
      <div className="navbar">
        <Link to="/map">
          <img className="nav-icon" src={require("./icon/map.png")} />
        </Link>
      </div>

      {/* link to personal setting route */}
      <div className="navbar">
        <Link to="/setting">
          <img className="nav-icon" src={require("./icon/set.png")} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

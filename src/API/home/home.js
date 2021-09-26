// import required dependencies
import React from "react";
import img from "./home-gif.gif";

const Home = () => {
  return (
    <div className="sub-container">
      <div className="home">
        <React.Fragment>
          <img title="home-gif" src={img} width="50%" alt="" />
          <p style={{ fontFamily: "Astloch" }}>Enjoy Your Day!</p>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Home;

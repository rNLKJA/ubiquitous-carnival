// import required dependencies
import React from "react";
import img from "./home-gif.gif";

const Home = () => {
  return (
    <div className="sub-container">
      <div className="home">
        <React.Fragment>
          <img title="home-gif" src={img} width="50%" alt="" />
        </React.Fragment>
      </div>
    </div>
  );
};

export default Home;

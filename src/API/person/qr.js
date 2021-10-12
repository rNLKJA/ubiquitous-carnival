import React, { useState } from "react";
import { useShowProfile } from "../../BackEndAPI/profileAPI";
import { Link } from "react-router-dom";
import QRCode from "qrcode";
import Heading from "../heading/heading.jsx";
import Navbar from "../nav/Navbar";

const ShowQrCode = () => {
  const [imageUrl, setImageUrl] = useState();
  const { loading, profile, error } = useShowProfile();

  if (error) {
    return (
      <React.Fragment>
        <Heading />
        <Navbar />
        <div className="sub-container">
          <div className="sub-container">Error</div>;
        </div>
      </React.Fragment>
    );
  }

  if (loading) {
    return (
      <React.Fragment>
        <Heading />
        <Navbar />
        <div className="sub-container">
          <div className="loading">
            <h1>Loading Your Information</h1>
            <h1>(っ˘ω˘ς )</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }

  const generateQR = async () => {
    try {
      const response = await QRCode.toDataURL(profile.userName);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (profile.userName) {
    generateQR();
  }

  return (
    <React.Fragment>
      <Heading />
      <Navbar />
      <div className="sub-container">
        {imageUrl ? <img src={imageUrl} alt="img" /> : null}
        <Link to="/setting">
          <button className="back-button">Back</button>
        </Link>
      </div>
    </React.Fragment>
  );
};
export default ShowQrCode;

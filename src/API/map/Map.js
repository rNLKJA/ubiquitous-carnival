import React, { useEffect } from "react";
import Map1 from "./google_map/map_acmp";

const Map = () => {
  useEffect(() => {
    document.title = "Contact";
  }, []);
  return (
    <div className="sub-container">
      <div className="map-container">
        <Map1 />
      </div>
    </div>
  );
};

export default Map;

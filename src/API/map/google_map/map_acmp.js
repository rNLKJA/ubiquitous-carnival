import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

// obtain user geolocation based on user search
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useShowAllRecords } from "../../../BackEndAPI/recordAPI";
import Error from "../../error/Error";
// import { formatRelative } from "date-fns";
import mapStyle from "./mapStyles";
// import { Info, LaptopWindows } from "@material-ui/icons";
import "./map.css";

import compass from "../compass.png";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "73vh",
};

const center = {
  lat: -37.7982,
  lng: 144.961,
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

// return map component
const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // const screenWidth = useState(window.innerWidth);

  // console.log(screenWidth[0])

  const { loading, records, error } = useShowAllRecords();

  // set the address location
  const [address, setAddress] = useState({
    ...center,
    text: "The University of Melbourne",
  });
  const [selected, setSelected] = useState(null);

  if (false) {
    console.log(address);
  }

  // console.log(address)
  // set the callback function
  // const onMapClick = useCallback((event) => {
  //   fetchAddress(
  //     {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //     },
  //     setAddress,
  //   );
  // }, []);

  // pin the location
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  // save map component
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // set react reference function
  const mapRef = useRef();

  // error handling, check the google map is loading correctly
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading map";

  if (error) {
    return (
      <div className="sub-container">
        <Error msg={"There is something wrong with Contact X_X"} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="sub-container">
        <div className="loading">
          <h1>Loading the Map</h1>
          <h1>(っ˘ω˘ς )</h1>
          <h1>Please Wait</h1>
        </div>
      </div>
    );
  }

  // return component
  return (
    <div className="google-map">
      <React.Fragment>
        {/* <h3>IT project: group 4399</h3>
        <h4>
          Current Address Information: lat {address.lat} && lng {address.lng} &&
          Address:
          {address.text}
        </h4> */}

        <h1 className="heading-map">Map</h1>

        {/* define the address search box and locate button  */}
        <div className="top-bar">
          <Search
            key={new Date().toISOString()}
            panTo={panTo}
            setAddress={setAddress}
          />
          <Locate panTo={panTo} setAddress={setAddress} />
        </div>

        {/* load google API libraries */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
          options={options}
          // onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {/* create marker to pin the location */}

          {records.map((record) => {
            // console.log(record);
            return (
              <Marker
                position={{ ...record }}
                key={new Date().toISOString()}
                icon={{
                  url: "./google-maps.png",
                  scaledSize: new window.google.maps.Size(50, 50),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                }}
                onClick={() => {
                  setSelected(record);
                }}
              />
            );
          })}

          {/* open up a info window when use click on it */}
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div>
                <form style={{ width: "300px" }}>
                  <label>You Met</label>
                  <input
                    className="form-control"
                    value={
                      selected.meetingPerson.firstName +
                      " " +
                      selected.meetingPerson.lastName
                    }
                    readonly
                  />
                  <label>On</label>

                  <input
                    className="form-control"
                    type="text"
                    value={selected.dateTime
                      .replace("T", " ")
                      .replace(".000Z", "")}
                    readonly
                  />

                  <label>At</label>
                  <input
                    className="form-control"
                    type="text"
                    value={selected.location
                      .replace(/VIC [a-zA-Z0-9.]*/i, "")
                      .replace(/[\u4e00-\u9fa5]/g, "")}
                    readonly
                  />
                  {selected.notes && (
                    <div>
                      <label>Notes:</label>
                      <textarea
                        className="form-control"
                        type="text"
                        readonly
                        value={selected.notes}
                        style={{ border: "0", height: "auto" }}
                      ></textarea>
                    </div>
                  )}
                </form>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
        {/* <div>Map</div> */}
        {/* <div>API KEY: {process.env.REACT_APP_GOOGLE_MAPS_API_KEY}</div> */}
      </React.Fragment>
    </div>
  );
};

export default Map;

// help user to locate its current geo location
const Locate = ({ panTo, setAddress }) => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let coord = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            const text = fetchAddress(coord, setAddress);

            panTo(coord);
            setAddress({
              ...coord,
              text: text,
            });
            console.log({
              ...coord,
              text,
            });
          },
          () => null,
          options,
        );
      }}
    >
      <img src={compass} alt="compass - locate" />
    </button>
  );
};

// define the search function
// this function should fetch the user input (address) then convert it to geolocation and pin it on the map
const Search = ({ panTo, setAddress }) => {
  // generate variables and functions
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -37.7982, lng: () => 144.961 },
      radius: 200 * 1000,
    },
  });

  // return the search box component
  return (
    // define the search box
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions(); // once selected, clear the suggestion

          try {
            const result = await getGeocode({ address });
            const { lat, lng } = await getLatLng(result[0]);

            panTo({ lat, lng });
            setAddress({ lat, lng, text: address });
          } catch (err) {
            console.log("error");
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => {
                return (
                  <ComboboxOption key={id} value={description}></ComboboxOption>
                );
              })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

const fetchAddress = (position, setAddress) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) =>
      setAddress({ ...position, text: data.results[0].formatted_address }),
    );
};

// const formatDatetime = (datetime) => {
// 	let d = new Date(datetime)
// 	let result = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
// 	return result
// }

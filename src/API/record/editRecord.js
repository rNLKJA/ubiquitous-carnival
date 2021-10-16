import "./record.css";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
// import { useShowAllRecords, useCreateRecord } from "../../BackEndAPI/recordAPI";
import { useContacts } from "../../BackEndAPI/contactAPI";
import { convert } from "./Record";
import fetchClient from "../axiosClient/axiosClient";
import Error from "../error/Error";
import Navbar from "../nav/Navbar";
import React, { useState, useEffect, useRef } from "react";
import Map from "./map";
import Heading from "../heading/heading.jsx";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";


const EditRecord = (prop) => {
	
  useEffect(() => {
    document.title = "Add Record";
    
  }, []);
  const textAreaRef = useRef(null)


  const [currentTime, setCurrentTime] = useState(prop.record.dateTime);

  const [selected, setSelected] = useState({label : prop.record.meetingPerson.firstName + ' '  + prop.record.meetingPerson.lastName ,
                                            id : prop.record.meetingPerson._id
                                            });
  const [location, setLocation] = useState(prop.record.location);
  const [geoCoords, setGeoCoords] = useState({lat : prop.record.lat, lng : prop.record.lng});
  const [notes, setNotes] = useState(prop.record.notes);

  console.log(geoCoords)
  console.log(currentTime)

  const contacts = prop.contacts

  let names = contacts.map(function (contact, index) {
    return {
      label: contact.contact.firstName + " " + contact.contact.lastName,
      id: contact.contact._id,
    };
  });

  const handleSubmit = async () => {
    // return console.log(location);
    const recordInfo = {
      _id : prop.record._id,
      contact_id: selected.id,
      location: location,
      dateTime: currentTime,
      geoCoords: geoCoords,
      notes: notes,
    };

    console.log(recordInfo);

    await fetchClient
      .post("/record/editRecord", recordInfo)
      .then(() => alert("Successfully edit a record つ - - つ"))
      .catch((err) => {
        alert(err);
        console.error(err);
      });
    setLocation("");
    setSelected("");

    window.location.href = "/record";
  };

  const setFieldValue = (value) => {
    if (value) {
      const { id, label } = value;
      setSelected(value);
      console.log(id, " + ", label);
    }
  };

  // console.log("TIME ", convert(currentTime));

  return (
    <React.Fragment>
      
        <div   style = {{justifyContent: "center",display: "flex", padding: "10px"}}>
        <Button sx = {{width: "30%"}}onClick={() => { 
            prop.setOneRecord({...prop.record, selected : false})
        }}>
            Back     
        </Button>
        </div>
        <form className="record-form">
          <Autocomplete
            label="Contacts"
            name="Contacts"
            options={names}
            sx={{ width: "100%" }}
            value={selected}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, v) => setFieldValue(v)}
            renderInput={(params) => <TextField {...params} 
                                                label="Contacts"  
                                                error = {selected === ""} 
                                                helperText = {selected === "" ? "Select a contact つ；－；つ" : ''}/>}
          />
          <br />
          <div className="timer-container" >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
								
                renderInput={(params) => <TextField {...params} />}
                label="Meeting time"
                value={currentTime}
                onChange={(newValue) => {
                  setCurrentTime(newValue);
                }}
                minDate={new Date("2021-02-14")}
                maxTime={new Date("2025-02-14")}
                ampm={true}
                disableIgnoringDatePartForTimeValidation={true}
								
              />
            </LocalizationProvider>
          </div>

          <br />
          <label htmlFor="location">Location: </label>
          <input
            name="location"
            type="text"
            placeholder="Please enter the location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            required
						className="form-control"
						style={{width: "100%"}}
          ></input>

          <input
            htmlFor="geoCoords"
            type="number"
            step="any"
            value={geoCoords.lat}
            onChange={() => {}}
            hidden
          />
          <input
            htmlFor="geoCoords"
            type="number"
            step="any"
            value={geoCoords.lng}
            onChange={() => {}}
            hidden
          />

          <Map setLocation={setLocation} setGeoCoords={setGeoCoords} geoLocation = {geoCoords} text = {prop.record.location} />
					
					<label htmlFor="notes">Notes: </label>
          <textarea
						ref={textAreaRef}
						value={notes}
            name="notes"
            type="text"
            placeholder="Add notes here!"
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            style={{ minWidth: "100%", minHeight:"10%", display: "block" }}
          />


          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSubmit}
          >
           Save
          </button>
        </form>
    </React.Fragment>
  );
};

export default EditRecord;

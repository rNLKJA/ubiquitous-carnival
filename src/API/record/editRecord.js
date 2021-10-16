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
  const textAreaRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(prop.record.dateTime);

  const [selected, setSelected] = useState({
    label:
      prop.record.meetingPerson.firstName +
      " " +
      prop.record.meetingPerson.lastName,
    id: prop.record.meetingPerson._id,
  });
  const [location, setLocation] = useState(prop.record.location);
  const [geoCoords, setGeoCoords] = useState({
    lat: prop.record.lat,
    lng: prop.record.lng,
  });
  const [notes, setNotes] = useState(prop.record.notes);
  const [customField, setCustomField] = useState([]);

  console.log(geoCoords);
  console.log(currentTime);

  const contacts = prop.contacts;

  let names = contacts.map(function (contact, index) {
    return {
      label: contact.contact.firstName + " " + contact.contact.lastName,
      id: contact.contact._id,
    };
  });

  const handleSubmit = async () => {
    // return console.log(location);
    const recordInfo = {
      _id: prop.record._id,
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
      setSelected(id);
      console.log(id, " + ", label);
    } else {
      setSelected("");
    }
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setCustomField([...customField, { field: "", value: "" }]);
  };

  const removeHandler = (e, index, type) => {
    e.preventDefault();
    if (type === "field") {
      setCustomField((prev) => prev.filter((item) => item !== prev[index]));
    }
  };

  const fieldOnChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setCustomField((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      });
    });
  };

  // console.log("TIME ", convert(currentTime));

  return (
    <React.Fragment>
      <div
        style={{ justifyContent: "center", display: "flex", padding: "10px" }}
      >
        <Button
          sx={{ width: "30%" }}
          onClick={() => {
            prop.setOneRecord({ ...prop.record, selected: false });
          }}
        >
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
          renderInput={(params) => (
            <TextField
              {...params}
              label="Contacts"
              error={selected === ""}
              helperText={selected === "" ? "Select a contact つ；－；つ" : ""}
            />
          )}
        />
        <br />
        <div className="timer-container">
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
          style={{ width: "100%" }}
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

        <Map
          setLocation={setLocation}
          setGeoCoords={setGeoCoords}
          geoLocation={geoCoords}
          text={prop.record.location}
        />

        <label htmlFor="notes">Notes: </label>
        <TextField
          id="outlined-multiline-flexible"
          label="Add-Notes"
          multiline
          maxRows={4}
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        />

        <label>Custom Field</label>
        {customField.map((field, i) => {
          return (
            <div>
              <div key={`${field}-${i}`} className="multi-field">
                <div className="multi-field-input">
                  <input
                    value={field.field}
                    name="field"
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => fieldOnChange(i, e)}
                    placeholder="Field Name"
                  />

                  <input
                    value={field.value}
                    type="text"
                    name="value"
                    className="form-control"
                    required
                    onChange={(e) => fieldOnChange(i, e)}
                    placeholder="Field Value"
                  />
                </div>
                <button
                  className="btn btn-info"
                  style={{
                    width: "40px",
                    height: "80px",
                  }}
                  onClick={(e) => removeHandler(e, i, "field")}
                >
                  x
                </button>
              </div>
              <hr />
            </div>
          );
        })}

        <button className="btn btn-primary mt-2" onClick={handleAddField}>
          Add Field
          {console.log(customField)}
        </button>

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

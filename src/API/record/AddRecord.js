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
import React, { useState, useEffect } from "react";
import Map from "./map";
import Heading from "../heading/heading.jsx";
import Autocomplete from "@mui/material/Autocomplete";
// import { Redirect } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "react-router-dom";

const CreateRecord = () => {
  useEffect(() => {
    document.title = "Add Record";
  }, []);

  // const textAreaRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(new Date());
  const { loading, contacts, error } = useContacts();
  const [selected, setSelected] = useState("");
  const [location, setLocation] = useState("");
  const [geoCoords, setGeoCoords] = useState({ lat: -37.7972, lng: 144.961 });
  const [notes, setNotes] = useState("");

  const address = {
    lat: Number.parseFloat(sessionStorage.getItem("selected-lat")),
    lng: Number.parseFloat(sessionStorage.getItem("selected-lng")),
    text: sessionStorage.getItem("selected-text"),
  };

  const history = useHistory();

  useEffect(() => {
    if (address.lat !== null || address.lat !== undefined) {
      setLocation(address.text);
      setGeoCoords({ lat: address.lat, lng: address.lng });
    }
  }, [address.lat, address.lng, address.text]);

  // console.log(address);

  const [customField, setCustomField] = useState([]);
  const [valid, setValid] = useState(false);

  if (error) {
    return <Error msg={"Something Wrong with Record Component"}></Error>;
  }

  if (loading) {
    return (
      <React.Fragment>
        <Heading />
        <Navbar />
        <div className="sub-container">
          <div className="loading">
            <h1>Loading</h1>
            <h1> ヽ(*・ω・)ﾉ</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }

  let names = contacts.map(function (contact, index) {
    return {
      label: contact.contact.firstName + " " + contact.contact.lastName,
      id: contact.contact._id,
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // return console.log(location);
    const recordInfo = {
      contact_id: selected,
      location: location,
      dateTime: convert(currentTime),
      geoCoords: geoCoords,
      notes: notes,
      customField,
    };

    // setValid(true);
    // dataValidator(customField, "field", setValid);

    await fetchClient
      .post("/record/createRecord", recordInfo)
      .then(() => alert("Successfully create a record つ - - つ"))
      .catch((err) => {
        alert(err);
        console.error(err);
      });
    setLocation("");
    setSelected("");

    history.push("/record");
  };

  const setFieldValue = (value) => {
    if (value) {
      const { id, label } = value;
      setSelected(id);
      // console.log(id, " + ", label);
      if (!value) {
        console.log(label);
      }
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
      <Heading />
      <Navbar />
      <div className="sub-container">
        <div className="heading-record">
          <h1> Create ・ ω・</h1>
        </div>

        <div className="edit-record-container">
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              padding: "10px",
            }}
          >
            <Button
              sx={{
                width: "8rem",
                height: "3rem",
                backgroundColor: "#ef5350",
                color: "white",
              }}
              href="/record"
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
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(e, v) => setFieldValue(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Contacts"
                  error={selected === ""}
                  helperText={
                    selected === "" ? "Select a contact つ；－；つ" : ""
                  }
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
                  minDate={new Date("2019-02-14")}
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
              geoLocation={{ lat: address.lat, lng: address.lng }}
              text={address.text}
            />
            <hr />

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

            <hr />

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
                    <Button
                      variant="outlined"
                      onClick={(e) => removeHandler(e, i, "field")}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                  <hr />
                </div>
              );
            })}

            <br />

            <Button
              variant="contained"
              sx={{ width: "10rem" }}
              onClick={handleAddField}
            >
              Add Field
            </Button>

            <hr />

            <div
              style={{
                justifyContent: "center",
                display: "flex",
                padding: "10px",
              }}
            >
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ width: "8rem", height: "3rem" }}
                color="success"
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateRecord;

const dataValidator = (items, type, setValid) => {
  var pattern, notEmpty;
  switch (type) {
    case "firstName":
      if (items.length === 0) {
        setValid(false);
        alert(`Invalid ${type} input, input cannot be empty`);
      } else {
      }
      break;
    case "lastName":
      if (items.length === 0) {
        setValid(false);
        alert(`Invalid ${type} input, input cannot be empty`);
      } else {
      }
      break;
    case "occupation":
      if (items.length === 0) {
        setValid(false);
        alert(`Invalid ${type} input, input cannot be empty`);
      } else {
      }
      break;
    case "phone":
      pattern = /\d{10}/;
      notEmpty = /\S/;
      if (items.length < 1) {
        setValid(false);
        alert("You must provide at least one phone number!");
      }

      for (let i = 0; i < items.length; i++) {
        if (!pattern.test(items[i]) && !notEmpty.test(items[i])) {
          setValid(false);
          alert("Invalid phone format");
        }
      }
      break;
    case "email":
      pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      notEmpty = /\S/;
      if (items.length < 1) {
        setValid(false);
        alert("You must have at least one email!");
      }

      for (let i = 0; i < items.length; i++) {
        if (!pattern.test(items[i]) && !notEmpty.test(items[i])) {
          setValid(false);
          alert("Invalid email format");
        }
      }

      break;
    case "field":
      for (let i = 0; i < items.length; i++) {
        if (items[i].field === "") {
          setValid(false);
          alert("Field name cannot be empty");
        } else if (items[i].value === "") {
          setValid(false);
          alert("Field value cannot be empty");
        }
      }
      break;
    default:
      setValid(false);
      console.log("Invalid Input");
  }
};

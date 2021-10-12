// import { Input } from "@material-ui/icons";
// import Select from "react-select";
import React, { useState, useEffect } from "react";
import "./record.css";
import Error from "../error/Error";
import "font-awesome/css/font-awesome.min.css";
import { useShowAllRecords } from "../../BackEndAPI/recordAPI";
import RecordDetail from "./recordDetail";
import add_record from "./add-record.jpg";
import Heading from "../heading/heading.jsx";
import Navbar from "../nav/Navbar";
import { Grid } from "@material-ui/core";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
const Record = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, records, error } = useShowAllRecords();
  const [oneRecord, setOneRecord] = useState({
    meetingPerson: "",
    location: "",
    occupation: "",
    notes: "",
    dateTime: "",
    selected: false,
  });

  console.log(records);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    document.title = "Record";
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Heading />
      <div className="sub-container">
        {!oneRecord.selected && (
          <React.Fragment>
            <div className="heading-record">
              <h1>Record</h1>
              <Fab
                color="primary"
                aria-label="add"
                href="./createRecord"
                sx={{
                  width: "40px",
                  height: "40px",
                  position: "fixed",
                  right: "1.5rem",
                  top: "-3.5rem",
                  color: "black",
                }}
              >
                <AddIcon />
              </Fab>
            </div>
            <div className="record-container">
              <div style={{ width: "97%" }}>
                <input
                  className="search-box"
                  value={searchTerm}
                  onChange={(e) => handleChange(e)}
                  placeholder="Search for a name"
                  size={40}
                ></input>
              </div>

              <RecordList
                records={records}
                search_key={searchTerm}
                loading={loading}
                error={error}
                setOneRecord={setOneRecord}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Record;

export const RecordList = (prop) => {
  console.log("keyword is " + prop.search_key);
  const searchRecords = () => {
    if (prop.records !== undefined) {
      return prop.records.filter((record) =>
        (
          record.meetingPerson.firstName +
          " " +
          record.meetingPerson.lastName +
          " " +
          record.location
        )
          .toLowerCase()
          .includes(prop.search_key.toLowerCase()),
      );
    }
  };

  if (prop.error) {
    return (
      <div className="sub-container">
        <Error msg={"There is something wrong with Contact X_X"} />
      </div>
    );
  }

  if (prop.loading) {
    return (
      <div className="sub-container">
        <div className="loading">
          <h1>Loading Your Record</h1>
          <h1>(っ˘ω˘ς )</h1>
        </div>
      </div>
    );
  }

  let fitterRecords = searchRecords();

  return (
    <Grid container>
      {fitterRecords.length >= 1 ? (
        fitterRecords.map((record) => {
          return (
            <Grid key={record._id} item xs={12} sm={6} md={4}>
              <RecordDetail record={record} setOneRecord={prop.setOneRecord} />
            </Grid>
          );
        })
      ) : (
        <div className="sub-container">
          <div className="loading">
            <h1>You don't have any record</h1>
            <h1>(っ˘ω˘ς )</h1>
          </div>
        </div>
      )}
    </Grid>
  );
};

export const OneRecord = (prop) => {
  return (
    <div
      className="col-md-4 animated fadeIn"
      onClick={() => {
        prop.setOneRecord({ ...prop.record, selected: true });
        console.log(prop.record);
      }}
    >
      <div className="card">
        <div className="card-body">
          <div className="avatar">
            <i className="fa fa-users"></i>
          </div>
          <h3 className="card-title">
            {prop.record.meetingPerson
              ? prop.record.meetingPerson.firstName +
              " " +
              prop.record.meetingPerson.lastName
              : "Contact_id is invalid, please check"}
          </h3>
          <p className="card-text">
            <i className="fa fa-location-arrow"></i>
            {" " + prop.record.location}
            <br />
            <i className="fa fa-phone"></i>{" "}
            {" " + prop.record.meetingPerson.phone}
            <br />
            {convert(prop.record.dateTime)}
          </p>
        </div>
      </div>
    </div>
  );
};

// This function convert the dateTime to a a formal string
export function convert(str) {
  var date = new Date(str),
    month = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = ("0" + minutes).slice(-2);
  var strTime = " " + hours + ":" + minutes + " " + ampm;

  return [date.getFullYear(), month, day].join("-") + strTime;
}

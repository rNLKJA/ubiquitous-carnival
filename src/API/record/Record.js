// import { Input } from "@material-ui/icons";
// import Select from "react-select";
import React, { useState, useEffect } from "react";
import "./record.css";
import Error from "../error/Error";
import "font-awesome/css/font-awesome.min.css";
import { useShowAllRecords } from "../../BackEndAPI/recordAPI";
import RecordDetail from "./recordDetail";
// import add_record from "./add-record.jpg";
import Heading from "../heading/heading.jsx";
import Navbar from "../nav/Navbar";
import { Grid } from "@material-ui/core";
// import AddCommentIcon from "@mui/icons-material/AddComment";
// import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import NavigationIcon from "@mui/icons-material/Navigation";
import { Link } from "react-router-dom";
import EditRecord from "./editRecord";
import { useContacts } from "../../BackEndAPI/contactAPI";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/styles";
import { Button } from "react-bootstrap";

const useRecordStyles = makeStyles(() => ({
  text: {
    fontFamily: 'Barlow, san-serif',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  name: {
    fontWeight: 600,
    fontSize: '1rem',
    color: '#122740',
  },
  caption: {
    fontSize: '0.8rem',
    color: '#758392',
    marginTop: -4,
  },
  btn: {
    borderRadius: 20,
    padding: '0.125rem 0.75rem',
    borderColor: '#becddc',
    fontSize: '0.75rem',
  },
}));

const Record = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { contacts } = useContacts();
  const [screenWidth , setScreenWidth] = useState(window.innerWidth)
  const { loading, records, error } = useShowAllRecords();
  const [recordList, setRecordList] = useState();
  const [oneRecord, setOneRecord] = useState({
    meetingPerson: "",
    location: "",
    occupation: "",
    notes: "",
    dateTime: "",
    selected: false,
  });

  const sortRecord = (records,setRecordList) => {

    if (records) {

      console.log(records[0].dateTime)

      let sortedList = records.sort((a, b) =>

          a.dateTime.split('-').join().localeCompare(b.dateTime.split('-').join()));
      for (let i = 0; i < sortedList.length; i++) {
        console.log(sortedList[i].dateTime)
      }
/*      setRecordList(sortedList);*/
    }
  }


  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    document.title = "Record";
  }, []);

  if (error) {
    return (
      <React.Fragment>
        <Navbar />
        <Heading />
        <div className="sub-container">
          <Error msg={"There is something wrong with Contact X_X"} />
        </div>
      </React.Fragment>
    );
  }

  if (loading) {
    return (
      <React.Fragment>
        <Navbar />
        <Heading />
        <div className="sub-container">
          <div className="loading">
            <h1>Loading Your Record</h1>
            <h1>(っ˘ω˘ς )</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Navbar />
      <Heading />
      <div className="sub-container">
        <button onClick={sortRecord(records,setRecordList)}>
          sort
        </button>
        {!oneRecord.selected && (
          <React.Fragment>
            

            
            <div className="heading-record">
              <h1>Record</h1>
              <Link to="/createRecord">
              
              <div className="record-add-btn">
                <AddIcon
                  sx = {{width : '50px', height : '50px'}}
                />
               </div>
              </Link>
            </div>

            <div
              className="record-container"
              
            >
              <TextField
                id="standard-basic"
                label="Search by name/location"
                style={{ width: "90%" , marginTop: 10}}
                value={searchTerm}
                onChange={(e) => handleChange(e)}
              />

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
        {oneRecord.selected && (
          <>
            <EditRecord
              record={oneRecord}
              setOneRecord={setOneRecord}
              contacts={contacts}
            />
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default Record;

export const RecordList = (prop) => {
  // console.log("keyword is " + prop.search_key);
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

  let fitterRecords = searchRecords();

  return (
    <Grid container>
      {fitterRecords.length >= 1 ? (
        fitterRecords.map((record) => {
          return (
            <Grid
              key={record._id + new Date().toISOString()}
              item
              xs={12}
              sm={6}
              md={4}
            >
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

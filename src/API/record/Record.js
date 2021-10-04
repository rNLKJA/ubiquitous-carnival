// import { Input } from "@material-ui/icons";
// import Select from "react-select";
import React,{ useState,useEffect} from "react";
import "./record.css";
import Error from "../error/Error";

import { useShowAllRecords } from "../../BackEndAPI/recordAPI";

import add_record from "./add-record.jpg";

const Record = () => {

  const [searchTerm, setSearchTerm] = useState("");

  const { loading, records, error } = useShowAllRecords();

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    document.title = "Record";
  }, []);

  return (
    <div className="sub-container">
      
      <div className="heading-record">
        <h1>Record</h1>
        <a href="./createRecord">
        <div className="add-record">
          <img src={add_record} alt="add record"></img>
        </div>
      </a>
      </div>
      <div className="record-container">
        
        <div>
          <input
            className="search-box"
            value={searchTerm}
            onChange={(e) => handleChange(e)}
            placeholder="Search for a name"
            size={40}
          ></input>
        </div>
        <RecordList  records = {records} search_key={searchTerm} loading={loading} error={error}/>
      </div>
    </div>
  );
};

export default Record;

export const RecordList = (prop) => {
  console.log("keyword is "+prop.search_key)
  const searchRecords = () => {

      if (prop.records!==undefined) {
       
        return prop.records.filter((record) =>  
          ( 
            
            record.meetingPerson.firstName + " " +
            record.meetingPerson.lastName + " " +
            record.location
          ).toLowerCase()
          .includes(prop.search_key.toLowerCase())
        )
      }
  }
  
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

  let fitterRecords = searchRecords()

  return (
    <div>
      <h1>Record</h1>
      { (fitterRecords.length >=1) ? fitterRecords.map((record) => {
        return <OneRecord record={record} key={record._id} />;
      }) : 
      <div className="sub-container">
        <div className="loading">
          <h1>Record not found</h1> 
          <h1>(っ˘ω˘ς )</h1>
        </div>
      </div>}
    </div>
  );
};

export const OneRecord = (prop) => {
  return (
    <div className="record-list-item">
      <p>
        <label>Name: </label>
        {prop.record.meetingPerson
          ? prop.record.meetingPerson.firstName +
            " " +
            prop.record.meetingPerson.lastName
          : "Contact_id is invalid, please check"}
      </p>
      <p>
        <label>Location: </label>
        {prop.record.location}
      </p>
      <p>
        <label>Date: </label>
        {convert(prop.record.dateTime)}
      </p>
    </div>
  );
};

export function convert(str) {
  var date = new Date(str),
    month = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), month, day].join("-");
}

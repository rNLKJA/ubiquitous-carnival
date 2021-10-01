import { Input } from "@material-ui/icons";
import Select from 'react-select'
import React, { useState} from "react";
import "./record.css";

import {useShowAllRecords, useCreateRecord} from '../../BackEndAPI/recordAPI'

import add_record from "./add-record.jpg";

const Record = () => {

  return (
    <div className="sub-container">
      <div className="record-container">
      <a href="./createRecord">
              <div className="add-record">
                <img src={add_record} alt="add record"></img>
              </div>
      </a>
      <RecordList/>
      </div>
    </div>
  );
};

export default Record;

export const RecordList = () => {

    const {loading,records,error} = useShowAllRecords()

    return (
      <div>
        <h1>Record</h1>
        {records.map((record) => {
          return (
            <OneRecord record = {record} key={record._id}/>
          )
        })}
      </div>
    )
}

export const OneRecord = (prop) => {

  return (
    <div className = "record-list-item">
      <p>
      <label>Name: </label>
      {prop.record.meetingPerson? prop.record.meetingPerson.firstName + " " + prop.record.meetingPerson.lastName : "Contact_id is invalid, please check"}
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
  )
}


export function convert(str) {
  var date = new Date(str),
    month = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), month, day].join("-");
}
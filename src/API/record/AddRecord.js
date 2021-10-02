import { Input } from "@material-ui/icons";
import Select from 'react-select'
import React, { useState} from "react";
import "./record.css";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {useShowAllRecords, useCreateRecord} from '../../BackEndAPI/recordAPI'
import {useContacts} from '../../BackEndAPI/contactAPI'
import {convert} from './Record'
import fetchClient from '../axiosClient/axiosClient'

const CreateRecord = () => {

    const [currentTime, setCurrentTime] = useState(new Date());
    const {loading,contacts,error} = useContacts()
    const [selected,setSelected] = useState("")
    const [location, setLocation] = useState("")

    let names = contacts.map(function (contact,index) {

        return {value: contact.contact.firstName+ " " + contact.contact.lastName, person : contact.contact._id}
    })

    const handleSubmit = async (event) => {
      event.preventDefault();
      const recordInfo = {
          contact_id : selected,
          location : location,
          dateTime : currentTime
      }

      console.log(recordInfo)

      fetchClient
      .post("/record/createRecord", recordInfo)
      .then(() => console.log("Create a new record"))
      .catch((err) => {
        alert(err)
        console.error(err);
      });
    };
  
    const onchangeSelect = (event) => {
      setSelected(event.person)
      console.log("selected " + selected)
    }
    
    return (
        <div className="sub-container">
            <a href="javascript:history.go(-1)" className="back-button">
                Back
            </a>  
            <form className="record-form">
                <label>Person YOU MET</label>
                <br />
                <Select 
                    onChange={onchangeSelect}
                    options={names}
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.value}
                />
                <br />
                <label htmlFor="location">Location: </label>
                <input
                    name="location"
                    type="text"
                    placeholder="Please enter the location"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    required
                ></input>
                <br />
                <div className="timer-container">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    label="meeting time"
                    value={currentTime}
                    onChange={(newValue) => {
                        setCurrentTime(convert(newValue));
                    }}
                    minDate={new Date('2020-02-14')}
                    maxTime={new Date()}
                    />
                </LocalizationProvider>
                </div>
                <input 
                className="submit-button"
                type = "button"
                value = "create"
                onClick={handleSubmit}
                />
          </form>
        </div>)
}

export default CreateRecord
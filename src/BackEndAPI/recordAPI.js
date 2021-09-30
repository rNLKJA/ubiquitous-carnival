import { useState, useEffect } from "react";
import fetchClient from '../API/axiosClient/axiosClient'
import axios from "axios";
const BASE_URL = "http://localhost:5000";

axios.defaults.withCredentials = true;

function createRecord(recordInfo) {
  const endpoint =  "/record/createRecord";
  return fetchClient.post(endpoint, recordInfo).then((res) => res.data);
}

function showAllRecords() {
    const endpoint =  "/record/showRecord";
    return fetchClient.get(endpoint).then((res) => res.data
    );
}


export function useShowAllRecords() {
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      showAllRecords()
        .then((records) => {
            setRecords(records);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setError(e);
          setLoading(false);
        });
    }, []);
    return {
      loading,
      records,
      error,
    };
}

export function useCreateRecord() {
    const [contact_id, setContactId] = useState("");
    const [clientUsername, setClientUsername] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [location, setLocation] = useState("");
  
    function onSubmit() {
      createRecord({
        contact_id: contact_id,
        clientUsername: clientUsername,
        dateTime: dateTime,
        location: location
      });
    }
    return;
}
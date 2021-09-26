

import axios from "axios";
const BASE_URL = "http://localhost:5000";

axios.defaults.withCredentials = true;

function createRecord(recordInfo) {
  const endpoint = BASE_URL + "/record/createRecord";
  return axios.post(endpoint, recordInfo).then((res) => res.data);
}

function showOneRecord(contactObjectId) {
  const endpoint = BASE_URL + "/record/showOneRecord";
  return axios
    .post(endpoint, { contactObjectId: contactObjectId })
    .then((res) => res.data);
}

function showAllRecords() {
    const endpoint = BASE_URL + "/record/showRecord";
    return axios.get(endpoint).then((res) => res.data);
}
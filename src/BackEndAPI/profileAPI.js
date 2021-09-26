import { useState, useEffect } from "react";

import axios from "axios";
const BASE_URL = "http://localhost:5000";

axios.defaults.withCredentials = true;

function updateProfile(profileInfo) {
  const endpoint = BASE_URL + "/profile/createRecord";
  return axios.post(endpoint, profileInfo).then((res) => res.data);
}

function showProfile() {
    const endpoint = BASE_URL + "/profile/showProfile";
    return axios.get(endpoint).then((res) => res.data);
}

function addPhone(phone) {
    const endpoint = BASE_URL + "/profile/addPhone";
    return axios.post(endpoint, phone).then((res) => res.data);
  }

function delPhone(phone) {
    const endpoint = BASE_URL + "/profile/delPhone";
    return axios.post(endpoint, phone).then((res) => res.data);
}

function addEmail(email) {
    const endpoint = BASE_URL + "/profile/addEmail";
    return axios.post(endpoint, email).then((res) => res.data);
}

function delEmail(email) {
    const endpoint = BASE_URL + "/profile/delEmail";
    return axios.post(endpoint, email).then((res) => res.data);
}


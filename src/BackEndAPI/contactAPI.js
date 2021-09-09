import { useState, useEffect } from "react";

import axios from 'axios';
const BASE_URL = "http://localhost:5000";

function getContacts() {
    const endpoind = BASE_URL+'/contact/showContact'
    return axios.get(endpoind, {withCredentials: true}.then(res => res.data))
}

function createContact(contactInfo) {
    const endpoind = BASE_URL+'/contact/createContact'
    return axios.post(endpoind, contactInfo, {withCredentials: true}.then(res => res.data))
}
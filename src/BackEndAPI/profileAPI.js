import { useState, useEffect } from "react";
import fetchClient from "../API/axiosClient/axiosClient";

import axios from "axios";
const BASE_URL = "https://crm4399.herokuapp.com";

axios.defaults.withCredentials = true;

function updateProfile(profileInfo) {
  const endpoint = BASE_URL + "/profile/createRecord";
  return fetchClient.post(endpoint, profileInfo).then((res) => res.data);
}

function showProfile() {
  const endpoint = BASE_URL + "/profile/showProfile";
  return fetchClient.get(endpoint).then((res) => res.data);
}

/**
* Back-End API: add a phone to profile
* @param {json} phone - the phone number of client
* @return {express.Response} res - response from the back-end server.
*/
function addPhone(phone) {
  const endpoint = BASE_URL + "/profile/addPhone";
  return fetchClient.post(endpoint, phone).then((res) => res.data);
}

/**
* Back-End API: del a phone to profile
* @param {json} phone - the phone number of client
* @return {express.Response} res - response from the back-end server.
*/
function delPhone(phone) {
  const endpoint = BASE_URL + "/profile/delPhone";
  return fetchClient.post(endpoint, phone).then((res) => res.data);
}

/**
* Back-End API: add a email to profile
* @param {json} phone - the email address of client
* @return {express.Response} res - response from the back-end server.
*/
function addEmail(email) {
  const endpoint = BASE_URL + "/profile/addEmail";
  return fetchClient.post(endpoint, email).then((res) => res.data);
}

/**
* Back-End API: delete a email to profile
* @param {json} phone - the email address of client
* @return {express.Response} res - response from the back-end server.
*/
function delEmail(email) {
  const endpoint = BASE_URL + "/profile/delEmail";
  return fetchClient.post(endpoint, email).then((res) => res.data);
}

/**
* React_Use_Function: Show the profile information for the client
* @return {json} json file contains the profile information
*/
export function useShowProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    showProfile()
      .then((profile) => {
        setProfile(profile);
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
    profile,
    error,
  };
}

export function useUpdateProfile() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [status, setStatus] = useState("");

  function onSubmit() {
    updateProfile({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      occupation: occupation,
      status: status,
    });
  }
  return;
}

/**
* React_Use_Function: use add phone function
*/
export function useAddPhone() {
  const [phone, setPhone] = useState("");

  function onSubmit() {
    addPhone({
      phone: phone,
    });
  }
  return;
}

/**
* React_Use_Function: use del phone function
*/
export function useDelPhone() {
  const [phone, setPhone] = useState("");

  function onSubmit() {
    delPhone({
      phone: phone,
    });
  }
  return;
}

/**
* React_Use_Function: use add email function
*/
export function useAddEmail() {
  const [email, setPhone] = useState("");

  function onSubmit() {
    addEmail({
      email: email,
    });
  }
  return;
}

/**
* React_Use_Function: use del email function
*/
export function useDelEmail() {
  const [email, setPhone] = useState("");

  function onSubmit() {
    delEmail({
      email: email,
    });
  }
  return;
}

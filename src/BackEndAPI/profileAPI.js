import { useState, useEffect } from "react";
import fetchClient from "../API/axiosClient/axiosClient";

import axios from "axios";
const BASE_URL = "https://crm4399.herokuapp.com";

axios.defaults.withCredentials = true;

function editFirstName(firstName) {
  const endpoint = BASE_URL + "/profile/editFirstName";
  return fetchClient.post(endpoint, firstName).then((res) => res.data);
}

function showProfile() {
  const endpoint = BASE_URL + "/profile/showProfile";
  return fetchClient.get(endpoint).then((res) => res.data);
}

function addPhone(phone) {
  const endpoint = BASE_URL + "/profile/addPhone";
  return fetchClient.post(endpoint, phone).then((res) => res.data);
}

function delPhone(phone) {
  const endpoint = BASE_URL + "/profile/delPhone";
  return fetchClient.post(endpoint, phone).then((res) => res.data);
}

function addEmail(email) {
  const endpoint = BASE_URL + "/profile/addEmail";
  return fetchClient.post(endpoint, email).then((res) => res.data);
}

function delEmail(email) {
  const endpoint = BASE_URL + "/profile/delEmail";
  return fetchClient.post(endpoint, email).then((res) => res.data);
}

export function useShowProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // console.log(showProfile());
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

export function useeditFirstName() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [status, setStatus] = useState("");

  function onSubmit() {
    editFirstName({
      firstName: firstName,

    });
  }
  return;
}

export function useAddPhone() {
  const [phone, setPhone] = useState("");

  function onSubmit() {
    addPhone({
      phone: phone,
    });
  }
  return;
}

export function useDelPhone() {
  const [phone, setPhone] = useState("");

  function onSubmit() {
    delPhone({
      phone: phone,
    });
  }
  return;
}

export function useAddEmail() {
  const [email, setPhone] = useState("");

  function onSubmit() {
    addEmail({
      email: email,
    });
  }
  return;
}

export function useDelEmail() {
  const [email, setPhone] = useState("");

  function onSubmit() {
    delEmail({
      email: email,
    });
  }
  return;
}

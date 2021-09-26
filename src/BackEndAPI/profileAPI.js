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
            status: status
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
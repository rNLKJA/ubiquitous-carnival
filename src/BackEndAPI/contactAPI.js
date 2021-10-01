import { useState, useEffect } from "react";
import fetchClient from '../API/axiosClient/axiosClient'
import axios from "axios";
// const BASE_URL = "https://crm4399.herokuapp.com";
const BASE_URL = "https://crm4399.herokuapp.com";

axios.defaults.withCredentials = true;

function getContacts() {
  const endpoint = BASE_URL + "/contact/showContact";
  return fetchClient.get(endpoint).then((res) => res.data);
}

// json file of contact info
function createContact(contactInfo) {
  const endpoint = BASE_URL + "/contact/createContact";
  return fetchClient.post(endpoint, contactInfo).then((res) => res.data);
}

//object ID as input
function ShowOneContact(contactObjectId) {
  const endpoint = BASE_URL + "/contact/showOneContact";
  return fetchClient
    .post(endpoint, { contactObjectId: contactObjectId })
    .then((res) => res.data);
}

export function useContacts() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getContacts()
      .then((contacts) => {
        setContacts(contacts);
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
    contacts,
    error,
  };
}

export function useShowOneContact() {
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    ShowOneContact()
      .then((contact) => {
        setContact(contact);
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
    contact,
    error,
  };
}
//TODO:Put that function in Pages instead of API
export function useCreateContact() {
  const [email, setEmail] = useState([]);
  const [phone, setPhone] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [portrait, setPortrait] = useState("");
  const [note, setNote] = useState("");

  function onSubmit() {
    createContact({
      email: email,
      phone: phone,
      firstName: firstName,
      lastName: lastName,
      occupation: occupation,
      portrait: portrait,
      note: note,
    });
    //redirect if needed
  }
  return; //html for form
}

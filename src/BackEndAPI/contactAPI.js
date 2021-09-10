import { useState, useEffect } from "react";

import axios from 'axios';
const BASE_URL = "http://localhost:5000";

axios.defaults.withCredentials = true;

function getContacts() {
    const endpoind = BASE_URL+'/contact/showContact'
    return axios.get(endpoind).then(res => res.data)
}

function createContact(contactInfo) {
    const endpoind = BASE_URL+'/contact/createContact'
    return axios.post(endpoind, contactInfo).then(res => res.data)
}

function ShowOneContact(contactObjectId) {
    const endpoint = BASE_URL+'/contact/showOneContact'
    return axios.post(endpoint, {contactObjectId: contactObjectId}).then(res => res.data)
}

export function useContacts(){
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(false);


    useEffect(() => {
        getContacts()
          .then(contacts => {
            setContacts(contacts);
            setLoading(false);
          })
          .catch(e => {
            console.log(e);
            setError(e);
            setLoading(false);
          });
      }, []);
      return {
            loading,
            contacts,
            error
      }
}

export function useShowOneContact(){
    const [loading, setLoading] = useState(true);
    const [contact, setContact] = useState();
    const [error, setError] = useState(false);


    useEffect(() => {
        ShowOneContact()
          .then(contact => {
            setContact(contact);
            setLoading(false);
          })
          .catch(e => {
            console.log(e);
            setError(e);
            setLoading(false);
          });
      }, []);
      return {
            loading,
            contact,
            error
      }


}
//TODO:Put that function in Pages instead of API
export function useCreateContact(){
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [occupation, setOccupation] = useState("");
    const [portriat, setPortriat] = useState("");
    const [note, setNote] = useState("");

    function onSubmit(){
        createContact({
            email: email,
            phone: phone,
            firstName: firstName,
            lastName: lastName,
            occupation: occupation,
            portriat: portriat,
            note: note
        })
        //redirect if needed
    }
    return //html for form 

}

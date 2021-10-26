import React from "react";
import { useState, useEffect } from "react";
import "./contact.css";
import { useContacts } from "../../BackEndAPI/contactAPI";
// import { requirePropFactory } from "@material-ui/core";
// import Loading from "./pending";
import add_user from "./add-user.png";
import fetchClient from "../axiosClient/axiosClient";
import SelectedContact from "./SelectedContact.jsx";
// import SelectedContactLarge from "./SelectedContact-large.jsx";
import People from "./People.jsx";

import Error from "../error/Error";
import Heading from "../heading/heading.jsx";
import Navbar from "../nav/Navbar";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import getWindowDimensions from "../../hooks/getWindowDimensions";
// const BASE_URL = "http://localhost:5000";

// const BASE_URL = "https://crm4399.herokuapp.com";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact";
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  const [contactList, setContactList] = useState([]);
  const { loading, contacts, error } = useContacts();
  const [oneContact, setOneContact] = useState({
    firstName: "",
    lastName: "",
    email: [],
    linkedAccount: null,
    occupation: "",
    phone: [],
    selected: false,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const searchContacts = () => {
    return contacts.filter((contact) =>
      (
        contact.contact.firstName +
        " " +
        contact.contact.lastName +
        " " +
        contact.contact.occupation
      )
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  };

  const sortContact = (contacts, setContactList) => {
    if (contacts) {
      let sortedList = contacts.sort((a, b) =>
        a.contact.lastName
          .toLowerCase()
          .localeCompare(b.contact.lastName.toLowerCase()),
      );
      /*setContactList(sortedList);*/
      for (let i = 0; i < sortedList.length; i++) {
        console.log(sortedList[i].contact.lastName);
      }
    }
  };

  const screenWidth = window.innerWidth;

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    console.log(oneContact);
    await fetchClient
      .get(
        "/contact/deleteOneContact/" +
          localStorage.getItem("userName") +
          "/" +
          oneContact._id,
      )
      .then((response) => {
        if (response.data.status === "success") {
          alert("You've delete a contact :D");
          window.location.href = "/contact";
        } else {
          alert("Opps, something wrong X_X fail to delete the contact");
        }
      });
  };

  if (error) {
    return (
      <React.Fragment>
        <Heading />
        <Navbar />
        <div className="sub-container">
          <Error msg={"There is something wrong with Contact X_X"} />
        </div>
      </React.Fragment>
    );
  }

  if (loading) {
    return (
      <React.Fragment>
        <Heading />
        <Navbar />
        <div className="sub-container">
          <div className="loading">
            <h1>Loading Your Contact</h1>
            <h1>(っ˘ω˘ς )</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Navbar />
      <Heading />
      <div className="sub-container">
        <div className="contact">
          {/* display contact as a list */}
          <button onClick={sortContact(contacts, setContactList)}>sort</button>

          <div className="contactList" style={{ width: "97%" }}>
            {!oneContact.selected && windowDimensions.width <= 1024 && (
              <>
                <Link className="add-contact-a" to="./addUser">
                  <div className="add-contact">
                    <img src={add_user} alt="add contact"></img>
                  </div>
                </Link>

                <div
                  className="contactList-items"
                  style={{ alignItems: "center" }}
                >
                  <TextField
                    id="standard-basic"
                    label="Search by name/occupation"
                    style={{ width: "90%" }}
                    value={searchTerm}
                    onChange={(e) => handleChange(e)}
                  />

                  <People
                    contacts={searchContacts()}
                    setOneContact={setOneContact}
                  />
                </div>
              </>
            )}

            {windowDimensions.width >= 1024 && (
              <>
                <Link className="add-contact-a" to="./addUser">
                  <div className="add-contact">
                    <img src={add_user} alt="add contact"></img>
                  </div>
                </Link>

                <div
                  className="contactList-items"
                  style={{ alignItems: "center" }}
                >
                  <TextField
                    id="standard-basic"
                    label="Search by name/occupation"
                    style={{ width: "90%" }}
                    value={searchTerm}
                    onChange={(e) => handleChange(e)}
                  />

                  <People
                    contacts={searchContacts()}
                    setOneContact={setOneContact}
                  />
                </div>
              </>
            )}
            {windowDimensions.width <= 1024 && oneContact.selected && (
              <div className="contactDetail">
                <SelectedContact
                  key={oneContact._id}
                  oneContact={oneContact}
                  setOneContact={setOneContact}
                  deleteHandler={deleteHandler}
                />
              </div>
            )}
          </div>
          {windowDimensions.width >= 1024 && oneContact.selected && (
            <>
              <SelectedContact
                key={oneContact._id}
                oneContact={oneContact}
                setOneContact={setOneContact}
                deleteHandler={deleteHandler}
                width={windowDimensions.width}
              />
            </>
          )}

          {windowDimensions.width >= 1024 && !oneContact.selected && (
            <div className="makeStyles-card-1" style={{ width: "95%" }}>
              <div>
                <h1>Select your contact to check detail</h1>
                <h1>(っ˘ω˘ς )</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contact;

export const PersonInfo = ({ prop }) => {
  return <div className="personInfo"></div>;
};

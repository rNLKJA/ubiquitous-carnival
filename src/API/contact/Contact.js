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
/*import People from "./People.jsx";*/

import Error from "../error/Error";
import Heading from "../heading/heading.jsx";
import Navbar from "../nav/Navbar";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import getWindowDimensions from "../../hooks/getWindowDimensions";
import Select from "react-select";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Person from "./Person";
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
  const [selectedOption, setSelectedOption] = useState({
    value: null,
    label: "Null",
  });
  const options = [
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
    { value: "occupation", label: "Occupation" },
    { value: "notes", label: "Notes" },
    { value: null, label: "Null" },
  ];

  // const searchContacts = () => {
  //   return contacts.filter((contact) =>
  //     (
  //       contact.contact.firstName +
  //       " " +
  //       contact.contact.lastName +
  //       " " +
  //       contact.contact.occupation
  //     )
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()),
  //   );
  // };

  // const screenWidth = window.innerWidth;

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const handleOptions = (selectedOption) => {
    setSelectedOption(selectedOption);
    sortContact(contacts, setContactList, selectedOption.value);
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
          <h1 data-testid="contact" hidden>
            Contact Page
          </h1>
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
        <h1 data-testid="contact" hidden>
          Contact Page
        </h1>
        <div className="contact">
          {/* display contact as a list */}
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
                    style={{ width: "100%" }}
                    value={searchTerm}
                    onChange={(e) => handleChange(e)}
                  />

                  <Select
                    onChange={handleOptions}
                    options={options}
                    style={{
                      marginTop: "5px",
                      // marginRight: "5px",
                      fontSize: "1.9rem",
                      zIndex: 10,
                    }}
                  />
                  <People
                    contacts={contacts}
                    search_key={searchTerm}
                    loading={loading}
                    error={error}
                    options={selectedOption.value}
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

                  <Select onChange={handleOptions} options={options} />

                  <People
                    contacts={contacts}
                    search_key={searchTerm}
                    loading={loading}
                    error={error}
                    options={selectedOption.value}
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
export const People = (prop) => {
  // console.log("keyword is " + prop.search_key);
  console.log(prop.contacts);
  const styles = useStyles();
  const searchContacts = () => {
    if (prop.contacts !== undefined) {
      switch (prop.options) {
        case "firstName":
          return prop.contacts.filter((contact) =>
            contact.contact.firstName
              .toLowerCase()
              .includes(prop.search_key.toLowerCase()),
          );

          break;
        case "lastName":
          return prop.contacts.filter((contact) =>
            contact.contact.lastName
              .toLowerCase()
              .includes(prop.search_key.toLowerCase()),
          );
          break;
        case "occupation":
          return prop.contacts.filter((contact) =>
            contact.contact.occupation
              .toLowerCase()
              .includes(prop.search_key.toLowerCase()),
          );
          break;
        case "notes":
          {
            console.log(prop.contacts[0].note);
          }
          return prop.contacts.filter((contact) =>
            contact.contact.note
              .toLowerCase()
              .includes(prop.search_key.toLowerCase()),
          );
          break;
        /*        case "time":
                    return prop.records.filter((record) =>
                        (
                            record.dateTime
                        )
                            .toLowerCase()
                            .includes(prop.search_key.toLowerCase()),
                    );
                    break*/
        case null:
          console.log("NULL");
          return prop.contacts.filter((contact) =>
            (
              contact.contact.firstName +
              " " +
              contact.contact.lastName +
              " " +
              /*                  record.dateTime +
                                    " " +*/
              contact.contact.note +
              " " +
              contact.contact.occupation
            )
              .toLowerCase()
              .includes(prop.search_key.toLowerCase()),
          );
          break;
      }
    }
  };

  let fitterContacts = searchContacts();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      margin={2}
      spacing={2}
    >
      {fitterContacts.map((contact) => {
        return (
          <Grid key={contact.contact._id} item xs={12} sm={6} md={12}>
            <Person contact={contact} setOneContact={prop.setOneContact} />
            <Divider variant={"middle"} className={styles.divider} />
          </Grid>
        );
      })}
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    width: "100%",
    borderRadius: 16,
    boxShadow: "0 8px 16px 0 #BDC9D7",
    overflow: "scroll",
  },
  header: {
    fontFamily: "Barlow, san-serif",
    backgroundColor: "#fff",
  },
  headline: {
    color: "#122740",
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  link: {
    color: "#2281bb",
    padding: "0 0.25rem",
    fontSize: "0.875rem",
  },
  actions: {
    color: "#BDC9D7",
  },
  divider: {
    backgroundColor: "#d9e2ee",
    margin: "0 20px",
  },
}));
const sortContact = (contacts, setContactList, type) => {
  console.log(contacts);

  if (contacts !== undefined) {
    console.log(contacts[0]);
    switch (type) {
      case "firstName":
        console.log("firstName");
        contacts.sort((a, b) =>
          a.contact.firstName.localeCompare(b.contact.firstName),
        );
        for (let i = 0; i < contacts.length; i++) {
          console.log(contacts[i].contact.firstName);
        }
        break;
      case "lastName":
        console.log("lastName");
        contacts.sort((a, b) =>
          a.contact.lastName.localeCompare(b.contact.lastName),
        );
        for (let i = 0; i < contacts.length; i++) {
          console.log(contacts[i].contact.lastName);
        }
        break;
      case "occupation":
        console.log("location");
        contacts.sort((a, b) =>
          a.contact.occupation.localeCompare(b.contact.occupation),
        );
        for (let i = 0; i < contacts.length; i++) {
          console.log(contacts[i].contact.occupation);
        }
        break;
      case "notes":
        console.log(contacts[0]);
        contacts.sort((a, b) => a.contact.note.localeCompare(b.contact.note));
        for (let i = 0; i < contacts.length; i++) {
          console.log(contacts[i].contact.note);
        }
        break;

      case "Null":
        break;
    }

    /*    console.log(records[0].dateTime)
        let sortedList = records.sort((a, b) =>
            a.dateTime.split('-').join().localeCompare(b.dateTime.split('-').join()));
        for (let i = 0; i < sortedList.length; i++) {
          console.log(sortedList[i].dateTime)
        }*/
    /*      setRecordList(sortedList);*/
  }
};

export const PersonInfo = ({ prop }) => {
  return <div className="personInfo"></div>;
};

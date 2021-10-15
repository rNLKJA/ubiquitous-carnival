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
import TextField from '@mui/material/TextField';


// const BASE_URL = "http://localhost:5000";

const BASE_URL = "https://crm4399.herokuapp.com";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact";
  }, []);

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

  const screenWidth = window.innerWidth;

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const deleteHandler = () => {
    console.log(oneContact);

    fetchClient
      .get(
        BASE_URL +
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

          <div className="contactList" style= {{width: "97%" }}>
            {!oneContact.selected && (
              <>

									<Link className="add-contact-a" to="./addUser">
										<div className="add-contact">
											<img src={add_user} alt="add contact"></img>
										</div>
                	</Link>

                <div className="contactList-items" style= {{alignItems: 'center'}}>

                  <TextField id="standard-basic" 
                          label="Search by name/occupation" 
                          style={{width: "90%" }}
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
            {screenWidth <= 1024 && oneContact.selected && (
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
        </div>
      </div>
    </React.Fragment>
    //       {screenWidth <= 1024 && !oneContact.selected && (
    //         <React.Fragment>
    //           <a className="add-contact-a" href="./addUser">
    //             <div className="add-contact">
    //               <img src={add_user} alt="add contact"></img>
    //             </div>
    //           </a>
    //           <div style={{ width: "97%" }}>
    //             <input
    //               className="search-box"
    //               value={searchTerm}
    //               onChange={(e) => handleChange(e)}
    //               placeholder="Search for a name"
    //               size={40}
    //             ></input>
    //           </div>

    //           <div className="contactList">
    //             <div className="contactList-items">
    //               <People
    //                 contacts={searchContacts()}
    //                 setOneContact={setOneContact}
    //               />
    //             </div>
    //           </div>
    //         </React.Fragment>
    //       )}

    // {screenWidth <= 1024 && oneContact.selected && (
    //   <div className="contactDetail">
    //     <SelectedContact
    //       key = {oneContact._id}
    //       oneContact={oneContact}
    //       setOneContact={setOneContact}
    //       deleteHandler={deleteHandler}
    //     />
    //   </div>
    // )}

    //       {screenWidth > 1024 && (
    //         <div className="contactList">
    //           <div className="contactList-items">
    //             {contacts.map((person) => (
    //               <Person
    //                 prop={person}
    //                 key={person._id}
    //                 setOneContact={setOneContact}
    //               />
    //             ))}
    //           </div>
    //         </div>
    //       )}

    //       {/* display a specific information if screen width greater than 375 px */}
    //       {screenWidth > 1024 && (
    //         <div>
    //           {!oneContact.selected && (
    //             <div className="contactDetail">
    //               <Loading msg={"Please Select A Contact"} />
    //             </div>
    //           )}
    //           {oneContact.selected && (
    //             <SelectedContactLarge oneContact={oneContact} />
    //           )}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </React.Fragment>
  );
};

export default Contact;

export const PersonInfo = ({ prop }) => {
  return <div className="personInfo"></div>;
};

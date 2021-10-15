import React, { useState, useEffect } from "react";
import "./contact.css";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";
import "./manual-input.css";
// import axios from "axios";
import fetchClient from "../axiosClient/axiosClient";
import { Link } from "react-router-dom";
import Heading from "../heading/heading.jsx";
import NavBar from "../nav/Navbar";


const AddUser = () => {
  useEffect(() => {
    document.title = "Add a new Contact";
  }, []);
  const BASE_URL = "https://crm4399.herokuapp.com";
  // const BASE_URL = "http://localhost:5000";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emails, setEmails] = useState([]);
  const [phones, setPhones] = useState([]);
  const [occupation, setOccupation] = useState("");
  // const [meetRecord, setMeetRecord] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

		var email = ConvertListObjectToListValues(emails, "email");
    var phone = ConvertListObjectToListValues(phones, "phone");

    const contact = {
      firstName,
      lastName,
      email,
      phone,
      occupation,
      portraits: "",
      // meetRecord,
      note,
    };

    await fetchClient
      .post(BASE_URL + "/contact/createContact", contact)
      .then(() => console.log("Create a new contact"))
      .catch((err) => {
        console.error(err);
      });

    alert("You've create a new contact!");
    setFirstName("");
    setLastName("");
    setEmails([]);
    setPhones([]);
    setOccupation("");
    // setMeetRecord("");
    setNote("");

    // window.location.href = "/contact";
  };

  // const [image, setImage] = useState("");

  // const uploadImage = async (e) => {
  //   e.preventDefault();
  //   // console.log(image);

  //   const formData = new FormData();
  //   formData.append("portrait", image);

  //   await fetchClient
  //     .post("http://localhost:5000/profile/uploadUserImage", formData)
  //     .then((res) => console.log(res));

  //   console.log("posted");
  // };

	const handleAddPhone = (e) => {
    e.preventDefault();
    setPhones([...phones, { phone: "" }]);
  };

	const handleAddEmail = (e) => {
    e.preventDefault();
    setEmails([...emails, { email: "" }]);
  };

	const removeHandler = (e, index, type) => {
		e.preventDefault();
		if (type === "phone") {
			setPhones((prev) => prev.filter((item) => item !== prev[index]));
		}

		if (type === "email") {
			setEmails((prev) => prev.filter((item) => item !== prev[index]));
		}
	};

	const emailOnChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setEmails((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      });
    });
  };

	const phoneOnChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setPhones((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,
        };
      });
    });
  };

  return (
    <React.Fragment>
      <Heading />
      <NavBar />
      <div className="sub-container">
        <Link to="/addUser">
          <a href="/addUser" className="back-button">
            Back
          </a>
        </Link>

        {/* <div className="upload-img">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={uploadImage}>Upload</button>
        </div> */}

        <form className="contact-form" method="POST" onSubmit={handleSubmit} style={{height: "98%", overflow: "scroll"}}>
          <label htmlFor="firstName">First Name: </label>
          <input
            name="firstName"
						className='form-control'
            type="text"
            placeholder="Please enter the Last Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
          ></input>

          <label htmlFor="lastName">Last Name: </label>
          <input
            name="lastName"
						className='form-control'
            type="text"
            placeholder="Please enter the First Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
          ></input>

          <label htmlFor="email">E-mail: </label>
					{emails.map((mail, i) => {
						return (
							<div className="multi-field" >
								<div className="multi-field-input" style={{display: "flex", flexDirection:"row", gap: "10px", width: "100%" }}>
									<input
										value={mail.email}
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    onChange={(e) => emailOnChange(i, e)}
									></input>
									<button
												className="btn btn-info"
												style={{
													width: "40px",
													height: "40px",
													margin: "0px"
												}}
												onClick={(e) => removeHandler(e, i, "email")}
											>
												x
									</button>
								</div>
							</div>
						)
					})}

					<button className="btn btn-primary mt-2" onClick={handleAddEmail}>
              Add Email
          </button>

          <label htmlFor="phone">Phone: </label>
          {phones.map((phone, i) => {
						return (
							<div className="multi-field" >
								<div className="multi-field-input" style={{display: "flex", flexDirection:"row", gap: "10px", width: "100%" }}>
									<input
                    type="text"
                    value={phone.phone}
                    className="form-control"
                    name="phone"
                    required
                    minLength={10}
                    maxLength={10}
                    onChange={(e) => phoneOnChange(i, e)}
                  />
									<button
												className="btn btn-info"
												style={{
													width: "40px",
													height: "40px",
													margin: "0px"
												}}
												onClick={(e) => removeHandler(e, i, "phone")}
											>
												x
									</button>
								</div>
							</div>
						)
					})}

					<button className="btn btn-primary mt-2" onClick={handleAddPhone}>
              Add Phone
            </button>

          <label htmlFor="occupation">Occupation: </label>
          <input
            name="occupation"
						className='form-control'
            type="text"
            placeholder="Please enter the occupation"
            onChange={(e) => setOccupation(e.target.value)}
            value={occupation}
            required
          ></input>

          {/* <label htmlFor="meetRecord">Meeting Record: </label>
          <input
            name="meetRecord"
            type="text"
            placeholder="Please enter the meetRecord"
            onChange={(e) => setMeetRecord(e.target.value)}
            value={meetRecord}
          ></input> */}

          <label htmlFor="note">Notes: </label>
          <textarea
						style={{minWidth: "100%"}}	
            name="note"
            type="text"
            placeholder="Add Notes"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          ></textarea>

          <button
            className="btn btn-primary"
            style={{ padding: "0px" }}
            type="submit"
          >
            Create Contact
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddUser;

const ConvertListObjectToListValues = (items, type) => {
  var result = [];
  if (type === "phone") {
    for (let i = 0; i < items.length; i++) {
      result.push(items[i].phone);
    }
  }

  if (type === "email") {
    for (let i = 0; i < items.length; i++) {
      result.push(items[i].email);
    }
  }

  return result;
};
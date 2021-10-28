import React, { useState, useEffect } from "react";
import "./contact.css";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";
import "./manual-input.css";
// import axios from "axios";
import fetchClient from "../axiosClient/axiosClient";
// import { Link } from "react-router-dom";
import Heading from "../heading/heading.jsx";
import NavBar from "../nav/Navbar";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import { makeStyles } from "@material-ui/core/styles";
import cx from "clsx";
import TextField from "@mui/material/TextField";
// import { width } from "@mui/system";
// import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";

const useFabStyle = makeStyles((success) => ({
  name: {
    color: "blue",
  },
  fab: {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
    borderRadius: 100,
  },
}));

const AddUser = () => {
  useEffect(() => {
    document.title = "Add a new Contact";
  }, []);
  // const BASE_URL = "https://crm4399.herokuapp.com";
  // const BASE_URL = "http://localhost:5000";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emails, setEmails] = useState([]);
  const [phones, setPhones] = useState([]);
  const [occupation, setOccupation] = useState("");
  // const [meetRecord, setMeetRecord] = useState("");
  const [note, setNote] = useState("");

  const [upload, setUpload] = useState(false);

  const [avatar, setAvatar] = useState("");
  setAvatar("");
  const [file, setFile] = useState("");
  // const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [valid, setValid] = useState(false);

  // const [contact, setContact] = useState("");
  const styles = useFabStyle(success);

  // console.log(firstName, lastName, emails, phones, occupation, note)

  const [customField, setCustomField] = useState([]);

  const handleAddField = (e) => {
    e.preventDefault();
    setCustomField([...customField, { field: "", value: "" }]);
  };

  const removeHandler = (e, index, type) => {
    e.preventDefault();
    if (type === "field") {
      setCustomField((prev) => prev.filter((item) => item !== prev[index]));
    }
    if (type === "phone") {
      setPhones((prev) => prev.filter((item) => item !== prev[index]));
    }

    if (type === "email") {
      setEmails((prev) => prev.filter((item) => item !== prev[index]));
    }
  };

  const fieldOnChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setCustomField((prev) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    var email = ConvertListObjectToListValues(emails, "email");
    var phone = ConvertListObjectToListValues(phones, "phone");

    setValid(true);

    dataValidator(phone, "phone", setValid);
    dataValidator(email, "email", setValid);
    dataValidator(firstName, "firstName", setValid);
    dataValidator(lastName, "lastName", setValid);
    dataValidator(occupation, "occupation", setValid);
    dataValidator(customField, "field", setValid);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("occupation", occupation);
    formData.append("portrait", file);
    note ? formData.append("note", note) : formData.append("note", "");
    formData.append("note", note);
    formData.append("field", customField);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    if (valid) {
      try {
        setSuccess(false);
        setLoading1(true);
        const response = await fetchClient
          .post("/contact/createContactOneStep", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              setUploadPercentage(
                parseInt(
                  Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total,
                  ),
                ),
              );
            },
          })
          .then((res) => {
            if (res.data.dupContact) {
              alert("duplicate contact");
            }
            if (res.data.status === "false") {
              alert("upload failed");
            }

            alert("You've create a new contact!");
            return res;
          })
          .catch((err) => {
            console.log(err);
          });

        if (response.data.status === "false") {
          alert("upload failed");
          return;
        }

        // setTimeout(() => setUploadPercentage(0), 100);

        setSuccess(true);
        setLoading1(false);
        setUpload(false);
        window.location.href = "/contact";
      } catch (err) {
        if (err) {
          alert(err);
          return;
        }
        setUploadPercentage(0);
      }
      setFirstName("");
      setLastName("");
      setEmails([]);
      setPhones([]);
      setOccupation("");
      setNote("");
    } else {
      alert("Invalid input");
    }
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

  const onClickUpload = () => {
    setUpload(!upload);
  };

  const onChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const buttonSx = {
    borderRadius: 100,
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <React.Fragment>
      <Heading />
      <NavBar />
      <div className="sub-container">
        <Button variant="outlined" sx={{ width: "25%", padding: "5px" }}>
          <a href="/addUser">Back</a>
        </Button>
        {/* <div className="upload-img">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={uploadImage}>Upload</button>
        </div> */}
        <div className="avatar">
          <Avatar
            alt="Avatar"
            sx={{ width: 125, height: 125, border: "2px solid pink" }}
            margin={3}
            src={"data:image/png;base64," + avatar}
          />

          {upload ? (
            <div
              className="upload-container "
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <form>
                <label
                  htmlFor="contained-button-file"
                  style={{ padding: "10px" }}
                >
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    hidden={true}
                    onChange={onChange}
                  />
                  <Button variant="contained" component="span">
                    <Typography variant="body2">Choose</Typography>
                  </Button>
                </label>
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "7rem",
                  }}
                >
                  <Typography variant="body2" noWrap color="text.secondary">
                    {fileName}
                  </Typography>
                </div>

                <Button onClick={onClickUpload}>Cancel</Button>
              </form>
            </div>
          ) : (
            [
              <div className="upload-btn">
                <Button onClick={onClickUpload}>
                  <UploadIcon />
                  Upload
                </Button>
              </div>,
            ]
          )}
        </div>
        <form
          className="contact-form"
          method="POST"
          onSubmit={handleSubmit}
          style={{ height: "98%", overflow: "scroll" }}
        >
          <label htmlFor="firstName">First Name: </label>

          <TextField
            id="outlined"
            label="First Name:"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />

          <label htmlFor="lastName">Last Name: </label>

          <TextField
            id="outlined"
            label="Last Name:"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />

          <label htmlFor="email">E-mail: </label>
          {emails.map((mail, i) => {
            return (
              <div className="multi-field" key={"email" + i}>
                <div
                  className="multi-field-input"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <input
                    value={mail.email}
                    type="email"
                    name="email"
                    className="form-control"
                    required
                    onChange={(e) => emailOnChange(i, e)}
                  ></input>

                  <Button
                    variant="outlined"
                    onClick={(e) => removeHandler(e, i, "email")}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
            );
          })}

          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "40%" }}
              onClick={handleAddEmail}
            >
              Add Email
            </Button>
          </div>

          <label htmlFor="phone">Phone: </label>
          {phones.map((phone, i) => {
            return (
              <div className="multi-field" key={"phone" + i}>
                <div
                  className="multi-field-input"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    width: "100%",
                  }}
                >
                  <input
                    type="number"
                    pattern="\d*"
                    value={phone.phone}
                    className="form-control"
                    name="phone"
                    required
                    minLength={10}
                    maxLength={10}
                    onChange={(e) => phoneOnChange(i, e)}
                  />

                  <Button
                    variant="outlined"
                    onClick={(e) => removeHandler(e, i, "phone")}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
            );
          })}

          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "40%" }}
              onClick={handleAddPhone}
            >
              Add Phone
            </Button>
          </div>

          <TextField
            id="outlined"
            label="Occupation:"
            value={occupation}
            onChange={(e) => {
              setOccupation(e.target.value);
            }}
          />

          {/* <label htmlFor="meetRecord">Meeting Record: </label>
          <input
            name="meetRecord"
            type="text"
            placeholder="Please enter the meetRecord"
            onChange={(e) => setMeetRecord(e.target.value)}
            value={meetRecord}
          ></input> */}

          <label htmlFor="notes">Notes: </label>
          <TextField
            id="outlined-multiline-flexible"
            label="Add-Notes"
            multiline
            maxRows={4}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />

          <label>Custom Field</label>
          {customField.map((field, i) => {
            return (
              <div>
                <div key={`${field}-${i}`} className="multi-field">
                  <div className="multi-field-input">
                    <input
                      value={field.field}
                      name="field"
                      type="text"
                      className="form-control"
                      required
                      onChange={(e) => fieldOnChange(i, e)}
                      placeholder="Field Name"
                    />

                    <input
                      value={field.value}
                      type="text"
                      name="value"
                      className="form-control"
                      required
                      onChange={(e) => fieldOnChange(i, e)}
                      placeholder="Field Value"
                    />
                  </div>
                  <button
                    className="btn btn-info"
                    style={{
                      width: "40px",
                      height: "80px",
                    }}
                    onClick={(e) => removeHandler(e, i, "field")}
                  >
                    x
                  </button>
                </div>
                <hr />
              </div>
            );
          })}

          <Button
            variant="contained"
            sx={{ width: "40%", left: "50%", translateX: "50%" }}
            onClick={handleAddField}
          >
            Add Field
          </Button>

          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Box
              sx={{
                m: 1,
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
              maxWidth="30%"
            >
              <Fab
                type="submit"
                className={cx(styles.name, styles.fab)}
                aria-label="save"
                color="primary"
                sx={buttonSx}
              >
                {success ? <CheckIcon /> : <SaveIcon />}
              </Fab>
              {loading1 && (
                <CircularProgress
                  value={uploadPercentage}
                  variant="determinate"
                  size={68}
                  sx={{
                    color: green[500],
                    position: "absolute",
                  }}
                />
              )}
            </Box>
          </div>
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

const dataValidator = (items, type, setValid) => {
  var pattern, notEmpty;
  switch (type) {
    case "firstName":
      if (items.length === 0) {
        setValid(false);
        alert(`Invalid ${type} input, input cannot be empty`);
      } else {
      }
      break;
    case "lastName":
      if (items.length === 0) {
        setValid(false);
        alert(`Invalid ${type} input, input cannot be empty`);
      } else {
      }
      break;
    case "occupation":
      if (items.length === 0) {
        setValid(false);
        alert(`Invalid ${type} input, input cannot be empty`);
      } else {
      }
      break;
    case "phone":
      pattern = /\d{10}/;
      notEmpty = /\S/;
      if (items.length < 1) {
        setValid(false);
        alert("You must provide at least one phone number!");
      }

      for (let i = 0; i < items.length; i++) {
        if (!pattern.test(items[i]) && !notEmpty.test(items[i])) {
          setValid(false);
          alert("Invalid phone format");
        }
      }
      break;
    case "email":
      pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      notEmpty = /\S/;
      if (items.length < 1) {
        setValid(false);
        alert("You must have at least one email!");
      }

      for (let i = 0; i < items.length; i++) {
        if (!pattern.test(items[i]) && !notEmpty.test(items[i])) {
          setValid(false);
          alert("Invalid email format");
        }
      }

      break;
    case "field":
      for (let i = 0; i < items.length; i++) {
        if (items[i].field === "") {
          setValid(false);
          alert("Field name cannot be empty");
        } else if (items[i].value === "") {
          setValid(false);
          alert("Field value cannot be empty");
        }
      }
      break;
    default:
      setValid(false);
      console.log("Invalid Input");
  }
};

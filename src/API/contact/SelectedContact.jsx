import React, { useState, useEffect } from "react";
import "./editContact.css";
import fetchClient from "../axiosClient/axiosClient";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import Alert from "@mui/material/Alert";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import { StyledEngineProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';


const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

const colorSave = green[500];

const colorDelete = red[500];


const useFabStyle = makeStyles((success) => ({
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

// import { Contacts } from "@mui/icons-material";
// import portrait from "./portrarit.png";

// const BASE_URL = "http://localhost:5000";
// const BASE_URL = "https://crm4399.herokuapp.com";

const SelectedContact = ({ setOneContact, oneContact, deleteHandler }) => {
  // set selectedContact state with an additional property named edit
  // if edit === true, allow user edit form
  const [selectedContact, setSelectedContact] = useState({
    ...oneContact,
    edit: false,
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  console.log(screenWidth);



  return (
    <React.Fragment>
      {screenWidth <= 1024 ? <button
        className="back"
        onClick={() => {
          setOneContact({ ...oneContact, selected: false });
          // console.log("back");
        }}
      >
        Back
      </button> : null}


      {/* <img src={portrait} alt="protrait.png" style={{ paddingTop: "15px" }} /> */}
      
        <DisplayContact
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
          deleteHandler={deleteHandler}
          setOneContact={setOneContact}
          originContact={oneContact}
        />
      
    </React.Fragment>
  );
};

export default SelectedContact;

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const DisplayContact = ({
  selectedContact,
  setSelectedContact,
  deleteHandler,
  setOneContact,
  originContact,
}) => {


  // defined variables
  // window size
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [contact, setContact] = useState(selectedContact);

  const [phones, setPhones] = useState(
    ConvertListStringToListObject(contact.phone, "phone"),
  );
  const [emails, setEmails] = useState(
    ConvertListStringToListObject(contact.email, "email"),
  );


  //hooks for avatar upload
  const [upload, setUpload] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [customField, setCustomField] = useState([]);
  const [valid, setValid] = useState(true);
  useEffect(() => {
    if (contact.portrait === null) {
      setAvatar("");
    } else if (contact.portrait !== undefined) {
      setAvatar(contact.portrait.data.toString("base64"));
      // console.log(contact.portrait.data.toString("base64"))
    }

    if (contact.customField !== undefined) {
      setCustomField(contact.customField);
    }
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = useFabStyle(success);

  const styles_btn = {

    "&.MuiButton-contained": {
      color: 'success'
    },
    "&.MuiButton-outlined": {
      color: "error"
    }
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setCustomField([...customField, { field: "", value: "" }]);
  };

  // add input field
  const handleAddPhone = (e) => {
    e.preventDefault();
    setPhones([...phones, { phone: "" }]);
  };

  const handleAddEmail = (e) => {
    e.preventDefault();
    setEmails([...emails, { email: "" }]);
  };

  // used to move a particular input field
  const removeHandler = (e, index, type) => {
    e.preventDefault();
    if (type === "phone") {
      setPhones((prev) => prev.filter((item) => item !== prev[index]));
    }

    if (type === "email") {
      setEmails((prev) => prev.filter((item) => item !== prev[index]));
    }

    if (type === "field") {
      setCustomField((prev) => prev.filter((item) => item !== prev[index]));
    }
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    var email = ConvertListObjectToListValues(emails, "email");
    var phone = ConvertListObjectToListValues(phones, "phone");

    const data = {
      ...contact,
      phone,
      email,
      customField,
    };

    setSelectedContact(data);

    setValid(true)

    dataValidator(phone, 'phone', setValid)
    dataValidator(email, 'email', setValid)
    dataValidator(data.firstName, 'firstName', setValid)
    dataValidator(data.lastName, 'lastName', setValid)
    dataValidator(data.occupation, 'occupation', setValid)
    console.log(valid)

    if(valid){
      await fetchClient
          .post("/contact/updateContactInfo", data)
          .then((response) => {
            if (response.data.status) {
              alert(
                  "Update contact information succeed!\nRedirect to Contact Page",
              );
              window.location.href = "/contact";
              // window.location.href = "/contact";
            } else {
              alert("Opps, something wrong, please try later.");
            }
          });

    }



    // setContact({ ...contact, edit: false });

    // setOneContact({ ...contact, edit: false, selected: false });
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

  // input field change handler
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

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const onClickUpload = () => {
    setUpload(!upload);
  };

  const onChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("portrait", file);
    formData.append("_id", contact._id);

    try {
      setSuccess(false);
      setLoading1(true);
      const res = await fetchClient
        .post("/contact/uploadContactImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total),
              ),
            );
          },
        })
        .then((response) => {
          setAvatar(response.data.portrait.data.toString("base64"));
        });

      if (res.data.status === "false") {
        setMessage("upload failed ");
        return;
      }

      // setTimeout(() => setUploadPercentage(0), 100);

      setSuccess(true);
      setLoading1(false);
      setUpload(false);
      // TODO: backend should return the decoded string of image in res.data.portrait.
      // update hook state to rerender the new avatar
      // setAvatar(res.data.portrait)
    } catch (err) {
      if (err) {
        setMessage("upload failed err: ");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };



  return (
    <React.Fragment>
      {windowDimensions.width >= 1024 ? <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 0, right: 100 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box> : null}

      {contact.edit ? null : (
        <button
          className="edit-btn"
          onClick={() => setContact({ ...contact, edit: !contact.edit })}
        >
          Edit
        </button>
      )}

      {contact.edit ? (
        <button
          className="back-btn"
          onClick={() => {
            setContact({ ...originContact, selected: true, edit: false });
            setPhones(ConvertListStringToListObject(contact.phone, "phone"));
            setEmails(ConvertListStringToListObject(contact.email, "email"));
          }}
        >
          Cancel
        </button>
      ) : null}



      <div className="makeStyles-card-1" style={{ width: "95%" }}>
        <div className="avatar">
          <Avatar
            alt="Avatar"
            sx={{ width: 125, height: 125, border: "2px solid pink" }}
            margin={3}
            src={"data:image/png;base64," + avatar}
          />

          {contact.edit ? (
            upload ? (
              <div
                className="upload-container "
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <form onSubmit={onSubmit}>
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

                  <Box
                    sx={{
                      m: 1,
                      position: "relative",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Fab
                      className={cx(styles.fab)}
                      aria-label="save"
                      color="primary"
                      sx={buttonSx}
                      onClick={onSubmit}
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
            )
          ) : null}
        </div>

        <form className="edit-contact-form">
          <label>First Name: </label>
          <input
            type="text"
            value={contact.firstName}
            className="form-control"
            readOnly={!contact.edit}
            required
            onChange={(e) =>
              setContact({ ...contact, firstName: e.target.value })
            }
          ></input>

          <label>Last Name: </label>
          <input
            type="text"
            value={contact.lastName}
            className="form-control"
            readOnly={!contact.edit}
            required
            onChange={(e) =>
              setContact({ ...contact, lastName: e.target.value })
            }
          ></input>

          <label>Occupation: </label>
          <input
            type="text"
            value={contact.occupation}
            className="form-control"
            readOnly={!contact.edit}
            required
            onChange={(e) =>
              setContact({ ...contact, occupation: e.target.value })
            }
          ></input>

          {phones.length !== 0 ? <label>Phone:</label>
            : null}

          {phones.map((phone, i) => {
            return (
              <>
              <br />
              <div key={`${phone}-${i}`} className="multi-field">
                <div className="multi-field-input">
                  <input
                    text="text"
                    pattern="\d*"
                    value={phone.phone}
                    className="form-control"
                    name="phone"
                    readOnly={!contact.edit}
                    required
                    minLength={10}
                    maxLength={10}
                    onChange={(e) => phoneOnChange(i, e)}
                  />
                </div>
                {contact.edit ? (
                 
                  <Button
                    variant="outlined"
                    onClick={(e) => removeHandler(e, i, "phone")}
                  >
                    <DeleteIcon />
                  </Button>
                  
                ) : null}
                
                  
              </div>
              <hr />
              </>
            );
          })}

          {contact.edit && (
            <>
            <Button
              variant="contained"
              sx={{ width: "50%" }}
              onClick={handleAddPhone}
            >
              add phone
            </Button>
            <br />
            </>
          )}

          

          {emails.length !== 0 ? <label>Email Address</label> : null}
          {emails.map((mail, i) => {
            return (
              <>
                <br />
                <div key={`${mail}-${i}`} className="multi-field">
                  <div className="multi-field-input">
                    <input
                      value={mail.email}
                      type="email"
                      name="email"
                      className="form-control"
                      readOnly={!contact.edit}
                      required
                      onChange={(e) => emailOnChange(i, e)}
                    />
                  </div>
                  {contact.edit && (

                    <Button
                      variant="outlined"
                      onClick={(e) => removeHandler(e, i, "email")}
                    >
                      <DeleteIcon />
                    </Button>

                  )}
                </div>


                <hr />
              </>)
          })}

          {contact.edit && (


            <Button
              variant="contained"
              sx={{ width: "50%" }}
              onClick={handleAddEmail}
            >
              Add Email
            </Button>
          )}

          <br />

          <label>Notes:</label>
          <br />




          <TextField
            id="outlined-read-only-input"
            multiline
            maxRows={4}
            
            InputProps={{
              readOnly: !contact.edit
            }}
            value={contact.note ? contact.note : ''}
            onChange={(e) => {
              setContact({ ...contact, note: e.target.value })
            }}
          />

          <hr />

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
                      readOnly={!contact.edit}
                      required
                      onChange={(e) => fieldOnChange(i, e)}
                      placeholder="Field Name"
                    />

                    <input
                      value={field.value}
                      type="text"
                      name="value"
                      className="form-control"
                      readOnly={!contact.edit}
                      required
                      onChange={(e) => fieldOnChange(i, e)}
                      placeholder="Field Value"
                    />
                  </div>
                  {contact.edit && (


                    <Button
                      variant="outlined"
                      onClick={(e) => removeHandler(e, i, "field")}
                    >
                      <DeleteIcon />
                    </Button>
                  )}
                </div>
                <hr />
              </div>
            );
          })}

          <br />

          {contact.edit && (

            <Button
              variant="contained"
              sx={{ width: "50%" }}
              onClick={handleAddField}
            >
              Add Field
            </Button>

          )}

          <hr />



          {contact.edit && (
            <Stack direction="row" spacing={2}>
              <Button variant="contained" sx={styles_btn} onClick={(e) => handleSubmit(e)}>
                Save Change
              </Button>

              <Button variant="outlined" sx={styles_btn}
                onClick={(e) => {
                  if (
                    window.confirm("Are you sure you wanna delete this contact?")
                  ) {
                    deleteHandler(e);
                  }
                }}>
                Delete The Contact
              </Button>
            </Stack>
          )}


        </form>
      </div>

    </React.Fragment>
  );
};

const ConvertListStringToListObject = (items, type) => {
  var result = [];
  if (items != undefined && items.length > 0) {
    if (type === "phone") {
      for (let i = 0; i < items.length; i++) {
        result.push({ phone: items[i] });
      }
    }

    if (type === "email") {
      for (let i = 0; i < items.length; i++) {
        result.push({ email: items[i] });
      }
    }

    if (type === "field") {
      for (let i = 0; i < items.length; i++) {
        result.push({ field: items[i] });
      }
    }
  }
  return result;
};

const ConvertListObjectToListValues = (items, type) => {
  var result = [];
  if (items != undefined && items.length > 0) {
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

    if (type === "field") {
      for (let i = 0; i < items.length; i++) {
        result.push(items[i].field);
      }
    }
  }

  return result;
};
const dataValidator = (items, type, setValid) => {

  switch(type) {
    case "firstName":
      if (items.length === 0) {
        console.log(1)
        setValid(false)
        alert(`Invalid ${type} input, input cannot be empty`)
      } else {
      }
      break;
    case "lastName":
      if (items.length === 0) {
        console.log(2)
        setValid(false)
        alert(`Invalid ${type} input, input cannot be empty`)
      } else {

      }
      break;
    case "occupation":

      if (items.length === 0) {
        console.log(3)
        setValid(false)
        alert(`Invalid ${type} input, input cannot be empty`)
      } else {
      }
      break;
    case "phone":
      var pattern = /\d{10}/;
      var notEmpty = /\S/;
      if (items.length < 1) {
        console.log(4)
        setValid(false)
        alert("You must provide at least one phone number!")
      }

      for (let i = 0; i < items.length ; i ++) {
        if (!pattern.test(items[i]) && !notEmpty.test(items[i])) {
          console.log(5)
          setValid(false)
          alert("Invalid phone format")
        }
      }
      break;
    case "email":
      var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var notEmpty = /\S/;
      if (items.length < 1) {
        console.log(6)
        setValid(false)
        alert("You must have at least one email!")
      }

      for (let i = 0; i < items.length ; i ++) {

        if (!pattern.test(items[i]) && !notEmpty.test(items[i]) ) {
          console.log(7)
          setValid(false)
          alert("Invalid email format")
        }
      }

      break;
    default:
      setValid(false)
      console.log("Invalid Input")
  }
}
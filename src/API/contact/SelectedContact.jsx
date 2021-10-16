import React, { useState } from "react";
import "./editContact.css";
import fetchClient from "../axiosClient/axiosClient";
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import UploadIcon from '@mui/icons-material/Upload';

// import { Contacts } from "@mui/icons-material";
// import portrait from "./portrarit.png";

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://crm4399.herokuapp.com";

const SelectedContact = ({ setOneContact, oneContact, deleteHandler }) => {
  // set selectedContact state with an additional property named edit
  // if edit === true, allow user edit form
  const [selectedContact, setSelectedContact] = useState({
    ...oneContact,
    edit: false,
  });

  return (
    <React.Fragment>
      <button
        className="back"
        onClick={() => {
          setOneContact({ ...oneContact, selected: false });
        }}
      >
        Back
      </button>
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

export const DisplayContact = ({
  selectedContact,
  setSelectedContact,
  deleteHandler,
  setOneContact,
	originContact
}) => {
  // defined variables
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
  const [file, setFile] = useState('');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState('')
	

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
    };

    setSelectedContact(data);

    await fetchClient
      .post(BASE_URL + "/contact/updateContactInfo", data)
      .then((response) => {
        if (response.data.status) {
          alert(
            "Update contact information succeed!\nRedirect to Contact Page",
          );
          // window.location.href = "/contact";
        } else {
          alert("Opps, something wrong, please try later.");
        }
      });

    window.location.href = "/contact";
    // setContact({ ...contact, edit: false });

    // setOneContact({ ...contact, edit: false, selected: false });
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
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

	const onClickUpload = () => {
    setUpload(!upload)
  }

	const onChange = e => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);

  };

	const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('portrait', file);


    try {
      setSuccess(false);
      setLoading1(true);
      const res = await fetchClient.post('/profile/uploadUserImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });

      if (res.data.status === 'false') {
        setMessage('upload failed ');
        return
      }

      setTimeout(() => setUploadPercentage(0), 100);

      setSuccess(true);
      setLoading1(false);
      // TODO: backend should return the decoded string of image in res.data.portrait.
      // update hook state to rerender the new avatar
      // setAvatar(res.data.portrait) 

      window.location.href = "/setting"

    } catch (err) {
      if (err) {
        setMessage('upload failed err: ');
      } else {

        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0)
    }
  };

  return (
    <React.Fragment>
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
					className="back"
					onClick={() => {
						setContact({ ...originContact, selected: true, edit: false });
						setPhones(ConvertListStringToListObject(contact.phone, "phone"));
						setEmails(ConvertListStringToListObject(contact.email, "email"));
					}}
				>
					Cancel
				</button>
				) : null }

      <div className="makeStyles-card-1" style={{width: "95%"}}>
				<div className="avatar">
					<Avatar alt="Avatar" sx={{ width: 120, height: 120, border: '2px solid pink' }} margin={3} src={"data:image/png;base64," + avatar} />

					{contact.edit && (upload ? [<div className="upload-container " style={{ alignItems: 'center', justifyContent: "center", display: "flex", position: 'fixed', right: '5rem', top: '1.5rem' }}>
            <form onSubmit={onSubmit}>
              <label htmlFor="contained-button-file" style={{ padding: '10px'}}>
                <Input accept="image/*" id="contained-button-file" multiple type="file" hidden={true} onChange={onChange} />
                <Button variant="contained" component="span" >
                  <Typography variant="body2">
                    Choose
                  </Typography>
                </Button>
              </label>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '7rem' }}>
                <Typography variant="body2" noWrap color="text.secondary">
                  {fileName}
                </Typography>
              </div>



              <Box sx={{ m: 1, position: 'relative', alignItems: 'center', justifyContent: "center", display: "flex" }}>
                <Fab
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
                      position: 'absolute',
                    }}
                  />
                )}
              </Box>
              <Button onClick={onClickUpload}>Cancel</Button>
            </form>
						</div>] : (<div style={{ right: '5rem', top: '5rem', position: 'fixed' }}>
							<Button onClick={onClickUpload}>

								<UploadIcon />
								Upload

							</Button>
						</div>))}
				</div>			
				
				<form className="edit-contact-form">
          <label>First Name: </label>
          <input
            type="text"
            value={contact.firstName}
            className="form-control"
            readOnly={!contact.edit}
            onChange={(e) =>
              setContact({ ...contact, firstName: e.target.value })
            }
            required
          ></input>

          <label>Last Name: </label>
          <input
            type="text"
            value={contact.lastName}
            className="form-control"
            readOnly={!contact.edit}
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
            onChange={(e) =>
              setContact({ ...contact, occupation: e.target.value })
            }
            required
          ></input>

          <label>Phone:</label>
          {phones.map((phone, i) => {
            return (
              <div key={`${phone}-${i}`} className="multi-field">
                <div className="multi-field-input">
                  <input
                    text='text' pattern="\d*"
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
                  <button
                    className="btn btn-info"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                    onClick={(e) => removeHandler(e, i, "phone")}
                  >
                    x
                  </button>
                ) : null}
              </div>
            );
          })}

          {contact.edit && (
            <button
              className="btn btn-primary"
              style={{
                justifyContent: "center",
                paddingBottom: "20px",
              }}
              onClick={handleAddPhone}
            >
              Add Phone
            </button>
          )}

          <label>Email Address</label>
          {emails.map((mail, i) => {
            return (
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
                  <button
                    className="btn btn-info"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                    onClick={(e) => removeHandler(e, i, "email")}
                  >
                    x
                  </button>
                )}
              </div>
            );
          })}

          {contact.edit && (
            <button className="btn btn-primary mt-2" onClick={handleAddEmail}>
              Add Email
            </button>
          )}

          <label>Notes:</label>
          <textarea
            value={contact.note}
            readOnly={!contact.edit}
						style={contact.edit ? null : {border: "0", height: 'auto'}}
            onChange={(e) => setContact({ ...contact, note: e.target.value })}
          ></textarea>

          {contact.edit && (
            <button
              className="btn btn-warning"
              onClick={(e) => handleSubmit(e)}
            >
              Save Change
            </button>
          )}

          {contact.edit && (
            <button
              className="btn btn-danger"
              onClick={() => {
                if (
                  window.confirm("Are you sure you wanna delete this contact?")
                ) {
                  deleteHandler();
                }
              }}
            >
              Delete The Contact
            </button>
          )}
        </form>
      </div>
    </React.Fragment>
  );
};

const ConvertListStringToListObject = (items, type) => {
  var result = [];
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
  return result;
};

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


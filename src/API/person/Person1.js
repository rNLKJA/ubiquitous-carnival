import React, { useState} from "react";
import "./person.css";
import fetchClient from "../axiosClient/axiosClient";
import { useShowProfile } from "../../BackEndAPI/profileAPI";
import Heading from "../heading/heading";
import Navbar from "../nav/Navbar";
import LogoutUser from "../../hooks/useLogout";

// import { Contacts } from "@mui/icons-material";
// import portrait from "./portrarit.png";

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://crm4399.herokuapp.com";

const Person1 = (profile) => {
    // set selectedContact state with an additional property named edit
    // if edit === true, allow user edit form
    const [oneProfile, setOneProfile] = useState({
        ...profile.profile,
        edit: false,
    });




    return (
        <React.Fragment>
            <div>
                {console.log(oneProfile)}
            </div>
            <DisplayPerson
                oneProfile={oneProfile}
                setOneProfile={oneProfile}
                setOneProile={setOneProfile}
                originProfile={profile.profile}
            />
        </React.Fragment>
    );
};

export default Person1;

export const DisplayPerson = ({
                                  oneProfile,
                                  setOneProfile,
                                  deleteHandler,
                                  originProfile
                              }) => {
    // defined variables
    const [person, setPerson] = useState(oneProfile);

    const [phones, setPhones] = useState(
        ConvertListStringToListObject(person.phone, "phone"),
    );
    const [emails, setEmails] = useState(
        ConvertListStringToListObject(person.email, "email"),
    );

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
            ...person,
            phone,
            email,
        };

        setPerson(data);

        await fetchClient
            .post(BASE_URL + "/profile/editProfile", data)
            .then((response) => {
                if (response.data.status) {
                    alert(
                        "Update contact information succeed!\n",
                    );
                    // window.location.href = "/contact";
                } else {
                    alert("Opps, something wrong, please try later.");
                }
            });

        /*window.location.href = "/setting";*/
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

    return (
        <React.Fragment>
            {person.edit ? null : (
                <button
                    className="edit-btn"
                    onClick={() => setPerson({ ...person, edit: !person.edit })}
                >
                    Edit
                </button>
            )}

            {person.edit ? (
                <button
                    className="cancel-btn"
                    onClick={() => {
                        setPerson({ ...originProfile, selected: true, edit: false });
                        setPhones(ConvertListStringToListObject(person.phone, "phone"));
                        setEmails(ConvertListStringToListObject(person.email, "email"));
                    }}
                >
                    Cancel
                </button>
            ) : null }

            <div className="makeStyles-card-1" style={{width: "95%"}}>
                <form className="edit-contact-form">
                    <label>First Name: </label>
                    <input
                        type="text"
                        value={person.firstName}
                        className="form-control"
                        readOnly={!person.edit}
                        onChange={(e) =>
                            setPerson({ ...person, firstName: e.target.value })
                        }
                        required
                    ></input>

                    <label>Last Name: </label>
                    <input
                        type="text"
                        value={person.lastName}
                        className="form-control"
                        readOnly={!person.edit}
                        onChange={(e) =>
                            setPerson({ ...person, lastName: e.target.value })
                        }
                    ></input>

                    <label>Occupation: </label>
                    <input
                        type="text"
                        value={person.occupation}
                        className="form-control"
                        readOnly={!person.edit}
                        onChange={(e) =>
                            setPerson({ ...person, occupation: e.target.value })
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
                                        readOnly={!person.edit}
                                        required
                                        minLength={10}
                                        maxLength={10}
                                        onChange={(e) => phoneOnChange(i, e)}
                                    />
                                </div>
                                {person.edit ? (
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

                    {person.edit && (
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
                                        readOnly={!person.edit}
                                        required
                                        onChange={(e) => emailOnChange(i, e)}
                                    />
                                </div>
                                {person.edit && (
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

                    {person.edit && (
                        <button className="btn btn-primary mt-2" onClick={handleAddEmail}>
                            Add Email
                        </button>
                    )}


                    {person.edit && (
                        <button
                            className="btn btn-warning"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Save Change
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

import React, { useState } from "react";
import "./contact.css";
import fetchClient from "../axiosClient/axiosClient";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";

const AddUser = () => {
    const [contact, setContact] = useState( {userName: ""} );
    const [userName, setUserName] = useState("");
    const BASE_URL = "https://crm4399.herokuapp.com";
    const submitUserID = (e) => {
        e.preventDefault();

        const contact = {
            userName,
        };

        fetchClient
            .post(BASE_URL + "/contact/createContact", contact)
            .then(() => console.log("upload new information"))
            .catch((err) => {
                console.error(err);
            });

        setUserName("");
    };

    return (
        <React.Fragment>
            <div className="sub-container">
                <h1>Add by User ID</h1>
                <form className="newID" method="POST" onSubmit={submitUserID}>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="Please enter the User Name"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        required
                    />
                    <input type="submit" value="Create"/>
                    <br />
                </form>

            </div>
        </React.Fragment>
    );
};

export default AddUser;

import React, { useState } from "react";
import "./contact.css";
import fetchClient from "../axiosClient/axiosClient";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";

const AddUser = () => {
    const [userID, setUserID] = useState();
    const BASE_URL = "https://crm4399.herokuapp.com";
    const submitUserID = (e) => {
        e.preventDefault();

        const contact = {
            userID,
        };

        fetchClient
            .post(BASE_URL + "/contact/createContact", contact)
            .then(() => console.log("upload new information"))
            .catch((err) => {
                console.error(err);
            });

        setUserID("");
    };

    const typeID = () => {
        var word = prompt("Input A user ID", "");
        setUserID(word);
    }

    return (
        <React.Fragment>
            <div className="sub-container">
                <h1>Add by User ID</h1>
                <form className="newID" method="POST" onSubmit={submitUserID}>
                    <button onClick={typeID}>Add a New Contact</button>
                    <br />
                </form>

            </div>
        </React.Fragment>
    );
};

export default AddUser;

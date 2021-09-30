import React from "react";
import { useState, useEffect, useRef} from "react";
import axios from "axios";
import LogoutUser from "../../hooks/useLogout";
import "./person.css"
import { useShowProfile} from "../../BackEndAPI/profileAPI";
import fetchClient from "../axiosClient/axiosClient";


const BASE_URL = "https://crm4399.herokuapp.com";



const Person = () => {
    const { loading, profile, error } = useShowProfile();

    const [userName, setUserName] = useState("");
    const [person, setPerson] = useState({
        firstName: "",
        lastName: "",
        email: [],
        occupation: "",
        phone: [],
    });
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [occupation, setOccupation] = useState("");
    const [status, setStatus] = useState("");

    const inputEl = useRef(null);

    const Submit = (e) => {
        e.preventDefault();

        const profile = {
            firstName,

        };
        axios
            fetchClient.post(BASE_URL + "/profile/editFirstName", profile)
            .then(() => console.log("upload new information"))
            .catch((err) => {
                console.error(err);
            });
        console.log(profile);

        setFirstName("");

    };

    const addPhone = (e) => {
        e.preventDefault();

        const phone = {
            phone,
        };
        axios
        fetchClient.post(BASE_URL + "/profile/addPhone", phone)
            .then(() => console.log(profile))
            .catch((err) => {
                console.error(err);
            });

        setPhone("");
    }
    const addEmail = (e) => {
        e.preventDefault();

        const email = email;
        axios
        fetchClient.post(BASE_URL + "/profile/addEmail", email)
            .then(() => console.log(profile))
            .catch((err) => {
                console.error(err);
            });

        setEmail("");
    }

    const onButtonClick = () => {
        var element = inputEl.current;
        var oldhtml = element.innerHTML;
        var newobj = document.createElement('input');
        newobj.type = 'text';

        newobj.value = oldhtml;
        newobj.onblur = function() {
            element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
            setFirstName(this.value);
        }
        element.innerHTML = '';
        element.appendChild(newobj);
        newobj.setSelectionRange(0, oldhtml.length);
        newobj.focus();
    };




    return (
        <div className="sub-container">
            <div>
                <h1>Personal Information</h1>
                <div className="basicInformation">
                    <h2>Basic Information</h2>
                    <form className="contact-form" method="POST" onSubmit={Submit}>
                        <div>
                            <label>First name: </label>
                            <div ref={inputEl} onClick={onButtonClick}>{profile.firstName}</div>
                        </div>
                        <input type="submit" value="Create" />
                    </form>

                        <div>
                            <label>Given name: </label>
                            {profile.lastName}
                        </div>
                        <div>
                            <label>Occupation: </label>
                            {profile.occupation}
                        </div>
                        <div>
                            <label>Status: </label>
                            {profile.status}
                        </div>

                </div>


                <div className="contactInformation">
                    <h2>Contact Information</h2>

                        <label>Email: </label>
                        {profile.email}
                        <label>Phone: </label>
                        {profile.phone}
                </div>
            </div>




            <button className="btn btn-primary" onClick={LogoutUser}>logout</button>
        </div>
    );

};

export default Person;



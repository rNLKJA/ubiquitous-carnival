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

    const inputE1 = useRef(null);
    const inputE2 = useRef();
    const inputE3 = useRef();
    const inputE4 = useRef();

    const submitFirstName = (e) => {
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

        setFirstName("");

    };

    const submitLastName = (e) => {
        e.preventDefault();

        const profile = {
            lastName,

        };
        axios
            fetchClient.post(BASE_URL + "/profile/editLastName", profile)
            .then(() => console.log("upload new information"))
            .catch((err) => {
                console.error(err);
            });

        setLastName("");

    };

    const submitOccupation = (e) => {
        e.preventDefault();

        const profile = {
            occupation,

        };
        axios
        fetchClient.post(BASE_URL + "/profile/editOccupation", profile)
            .then(() => console.log("upload new information"))
            .catch((err) => {
                console.error(err);
            });

        setOccupation("");

    };

    const submitStatus = (e) => {
        e.preventDefault();

        const profile = {
            status,

        };
        axios
        fetchClient.post(BASE_URL + "/profile/editStatus", profile)
            .then(() => console.log("upload new information"))
            .catch((err) => {
                console.error(err);
            });

        setStatus("");

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

    const editFirstName = () => {
        var element = inputE1.current;
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

    const editLastName = () => {
        var element = inputE2.current;
        var oldhtml = element.innerHTML;
        var newobj = document.createElement('input');
        newobj.type = 'text';

        newobj.value = oldhtml;
        newobj.onblur = function() {
            element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
            setLastName(this.value);
        }
        element.innerHTML = '';
        element.appendChild(newobj);
        newobj.setSelectionRange(0, oldhtml.length);
        newobj.focus();
    };

    const editOccupation = () => {
        var element = inputE3.current;
        var oldhtml = element.innerHTML;
        var newobj = document.createElement('input');
        newobj.type = 'text';

        newobj.value = oldhtml;
        newobj.onblur = function() {
            element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
            setOccupation(this.value);
        }
        element.innerHTML = '';
        element.appendChild(newobj);
        newobj.setSelectionRange(0, oldhtml.length);
        newobj.focus();
    };

    const editStatus = () => {
        var element = inputE4.current;
        var oldhtml = element.innerHTML;
        var newobj = document.createElement('input');
        newobj.type = 'text';

        newobj.value = oldhtml;
        newobj.onblur = function() {
            element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
            setStatus(this.value);
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
                    <form className="firstname" method="POST" onSubmit={submitFirstName}>
                        <div>
                            <label>First name: </label>
                            <div ref={inputE1} onClick={editFirstName}>
                                <div>{profile.firstName}</div>
                            </div>
                            <input
                                name="firstName"
                                type="text"
                                placeholder="Please enter the new First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            ></input>
                        </div>
                        <input type="submit" value="Create" />
                    </form>
                    <form className="lastname" method="POST" onSubmit={submitLastName}>
                        <div>
                            <label>Last name: </label>
                            <div ref={inputE2} onClick={editLastName}>{profile.lastName}</div>
                            <input
                                name="lastname"
                                type="text"
                                placeholder="Please enter the new Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            ></input>
                        </div>
                        <input type="submit" value="Create" />
                    </form>

                    <form className="occupation" method="POST" onSubmit={submitOccupation}>
                        <div>
                            <label>Occupation: </label>
                            <div ref={inputE3} onClick={editOccupation}>{profile.occupation}</div>
                            <input
                                name="occupation"
                                type="text"
                                placeholder="Please enter the new Occupation"
                                onChange={(e) => setOccupation(e.target.value)}
                                value={occupation}
                            ></input>
                        </div>
                        <input type="submit" value="Create" />
                    </form>
                    <form className="status" method="POST" onSubmit={submitStatus}>
                        <div>
                            <label>Status: </label>
                            <div ref={inputE4} onClick={editStatus}>{profile.status}</div>
                            <input
                                name="status"
                                type="text"
                                placeholder="Please enter the new status"
                                onChange={(e) => setStatus(e.target.value)}
                                value={status}
                            ></input>
                        </div>
                        <input type="submit" value="Create" />
                    </form>
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



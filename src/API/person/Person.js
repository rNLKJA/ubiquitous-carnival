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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [occupation, setOccupation] = useState("");
    const [status, setStatus] = useState("");
    const [delEmail, setDelEmail] = useState("");

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

    const submitNewEmail = (e) => {
        e.preventDefault();

        const profile = {
            email,

        };
        axios
        fetchClient.post(BASE_URL + "/profile/addEmail", profile)
            .then(() => console.log("upload new information"))
            .catch((err) => {
                console.error(err);
            });

        setEmail("");

    };
    const submitDelEmail = (e) => {
        e.preventDefault();

        const profile = {
            email,

        };
        axios
        fetchClient.post(BASE_URL + "/profile/delEmail", profile)
            .then(() => console.log("upload del"))
            .catch((err) => {
                console.error(err);
            });

        setEmail("");

    };


    const submitNewPhone = (e) => {
        e.preventDefault();

        const profile = {
            phone,

        };
        axios
        fetchClient.post(BASE_URL + "/profile/addPhone", profile)
            .then(() => console.log("upload new information"))
            .catch((err) => {
                console.error(err);
            });

        setPhone("");

    };


    const editFirstName = () => {
        var element = inputE1.current;
        var oldhtml = element.innerHTML;
        var newobj = document.createElement('input');
        newobj.type = 'text';

        newobj.value = oldhtml;
        newobj.onblur = function() {
            element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
            element.innerHTML = this.value == '' ? oldhtml : this.value;
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
            element.innerHTML = this.value == '' ? oldhtml : this.value;
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
            element.innerHTML = this.value == '' ? oldhtml : this.value;
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
            element.innerHTML = this.value == '' ? oldhtml : this.value;
            setStatus(this.value);

        }
        element.innerHTML = '';
        element.appendChild(newobj);
        newobj.setSelectionRange(0, oldhtml.length);
        newobj.focus();
    };

    const addNewEmail = () => {
        var word = prompt("Input A New Email","")
        setEmail(word);
    }

    const addNewPhone = () => {
        var word = prompt("Input A New Phone","")
        if (word) {
            alert(word);
        }
    }








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
                        </div>
                        <input type="submit" value="save" />
                    </form>
                    <form className="lastname" method="POST" onSubmit={submitLastName}>
                        <div>
                            <label>Last name: </label>
                            <div ref={inputE2} onClick={editLastName}>{profile.lastName}</div>
                        </div>
                        <input type="submit" value="save" />
                    </form>

                    <form className="occupation" method="POST" onSubmit={submitOccupation}>
                        <div>
                            <label>Occupation: </label>
                            <div ref={inputE3} onClick={editOccupation}>{profile.occupation}</div>

                        </div>
                        <input type="submit" value="save" />
                    </form>
                    <form className="status" method="POST" onSubmit={submitStatus}>
                        <div>
                            <label>Status: </label>
                            <div ref={inputE4} onClick={editStatus}>{profile.status}</div>

                        </div>
                        <input type="submit" value="save" />
                    </form>
                </div>


                <div className="contactInformation">
                    <h2>Contact Information</h2>
                    <label>Email: </label>
                    <form className="newEmail" method="POST" onSubmit={submitNewEmail}>
                        <button onClick={addNewEmail}>+</button>
                    </form>
                    {profile.email && profile.email.map(function (item) {
                        return      <form className="delEmail" method="POST" onSubmit={submitDelEmail}>
                                        <div> {item}{console.log(profile.email)} </div>
                                        <button onClick={setEmail.bind(this,item)}>-</button>
                                    </form>
                        })}
                    <div>
                        <label>Phone: </label>
                        <div>{profile.phone}</div>
                        <button onClick={addNewPhone}>+</button>
                    </div>
                </div>
            </div>




            <button className="btn btn-primary" onClick={LogoutUser}>logout</button>
        </div>
    );

};

export default Person;



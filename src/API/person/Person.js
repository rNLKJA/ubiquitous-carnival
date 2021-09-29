import React from "react";
import { useState, useEffect, useRef} from "react";
import axios from "axios";
import LogoutUser from "../../hooks/useLogout";
import "./person.css"
import { useShowProfile} from "../../BackEndAPI/profileAPI";


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

    const inputEl = useRef(null);

    const Submit = (e) => {
        e.preventDefault();

        const profile = {
            firstName,
            lastName,
            email,
            phone,
            occupation,
        };
        axios
            .post(BASE_URL + "/profile/updateProfile", profile)
            .then(() => console.log("upload new information"))
            .catch((err) => {
                console.error(err);
            });

        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setOccupation("");

    };

    /*const onButtonClick = () => {
        var element = inputEl.current;
        var oldhtml = element.innerHTML;
        var newobj = document.createElement('input');
        newobj.type = 'text';
        newobj.value = oldhtml;
        newobj.onblur = function() {
            element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
        }
        element.innerHTML = '';
        element.appendChild(newobj);
        setFirstName(newobj);
        console.log("uploading");
        newobj.setSelectionRange(0, oldhtml.length);
        newobj.focus();

        ref={inputEl} onClick={onButtonClick}
    };*/





    return (
        <div className="sub-container">
            <div>
                <h1>Personal Information</h1>
                <div className="basicInformation">
                    <h2>Basic Information</h2>
                    <form className="contact-form" method="POST" onSubmit={Submit}>
                        <label>First name: </label>
                        <div>{profile.firstName}</div>
                        <input
                                name="firstName"
                                type="text"
                                placeholder="Please enter the new Last Name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                        ></input>
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
                </div>


                <div className="contactInformation">
                    <h2>Contact Information</h2>
                    <div className="email">
                        <label>email: </label>
                        {profile.email}


                    </div>
                    <div className="phone">
                        <label>Phone: </label>
                        {profile.phone}
                    </div>
                </div>
            </div>




            <button className="btn btn-primary" onClick={LogoutUser}>logout</button>
        </div>
    );

};

export default Person;



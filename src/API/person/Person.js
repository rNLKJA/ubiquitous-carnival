import React from "react";
import { useState, useEffect, useRef} from "react";
import axios from "axios";
import LogoutUser from "../../hooks/useLogout";
import "./person.css"
import { useShowProfile} from "../../BackEndAPI/profileAPI";
import { useUpdateProfile} from "../../BackEndAPI/profileAPI";

const BASE_URL = "https://crm4399.herokuapp.com"

const Person = () => {
    const { loading, profile, error } = useShowProfile();
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useUpdateProfile("");
    const [person, setPerson] = useState({
        firstName: "",
        lastName: "",
        email: [],
        occupation: "",
        phone: [],
    });

    const inputEl = useRef(null);

    const onButtonClick = () => {
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
        useUpdateProfile(setFirstName(newobj));
        newobj.setSelectionRange(0, oldhtml.length);
        newobj.focus();
    };




    return (
        <div className="sub-container">
            <div>
                <h1>Personal Information</h1>

                <div className="basicInformation">
                    <h2>Basic Information</h2>
                    <div>
                        <label>First name: </label>


                            <div ref={inputEl} onClick={onButtonClick}>{profile.firstName}</div>


                    <br/>
                    </div>
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



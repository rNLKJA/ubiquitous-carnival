import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import LogoutUser from "../../hooks/useLogout";
import "./person.css";
import { useShowProfile } from "../../BackEndAPI/profileAPI";
import fetchClient from "../axiosClient/axiosClient";
import qr_code from "../nav/qr-code.png";
import Heading from "../heading/heading";
import Navbar from "../nav/Navbar";
import UpdatePassword from "./UpdatePassword";

const BASE_URL = "https://crm4399.herokuapp.com";

const Person = () => {
  useEffect(() => {
    document.title = "Personal Information";
  }, []);

  const { loading, profile, error } = useShowProfile();
  const [oneProfile, setOneProfile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [saveBtn, setSaveBtn] = useState(false);
  const inputE1 = useRef(null);
  const inputE2 = useRef();
  const inputE3 = useRef();

  if (error) {
    return (
      <React.Fragment>
        <Heading />
        <Navbar />
        <div className="sub-container">
          <div className="sub-container">Error</div>;
        </div>
      </React.Fragment>
    );
  }

  if (loading) {
    return (
      <React.Fragment>
        <Heading />
        <Navbar />
        <div className="sub-container">
          <div className="loading">
            <h1>Loading Your Information</h1>
            <h1>(っ˘ω˘ς )</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }

  const submitProfile = (e) => {
    e.preventDefault();

    const prof = {
      firstName,
      lastName,
      occupation,
    };

    fetchClient
      .post(BASE_URL + "/profile/editProfile", prof)
      .then(() => {
        console.log("upload new information");
        setSaveBtn(false);
      })
      .catch((err) => {
        console.error(err);
      });

    setFirstName("");
    setLastName("");
    setOccupation("");
  };

  if (error) {
    return <div className="sub-container"></div>;
  }

  if (loading) {
    return (
      <div className="sub-container">
        <div className="loading">
          <h1>Loading Your Contact</h1>
          <h1>(っ˘ω˘ς )</h1>
        </div>
      </div>
    );
  }

  const submitFirstName = (e) => {
    e.preventDefault();

    const profile = {
      firstName,
    };

    fetchClient
      .post(BASE_URL + "/profile/editFirstName", profile)
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

    fetchClient
      .post(BASE_URL + "/profile/editLastName", profile)
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

    fetchClient
      .post(BASE_URL + "/profile/editOccupation", profile)
      .then(() => console.log("upload new information"))
      .catch((err) => {
        console.error(err);
      });

    setOccupation("");
  };

  const submitNewEmail = (e) => {
    e.preventDefault();

    const profile = {
      email,
    };

    fetchClient
      .post(BASE_URL + "/profile/addEmail", profile)
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

    fetchClient
      .post(BASE_URL + "/profile/delEmail", profile)
      .then(() => console.log("upload del"))
      .catch((err) => {
        console.error(err);
      });

    setEmail("");
  };

  const submitDelPhone = (e) => {
    e.preventDefault();

    const profile = {
      phone,
    };

    fetchClient
      .post(BASE_URL + "/profile/delPhone", profile)
      .then(() => console.log("upload del"))
      .catch((err) => {
        console.error(err);
      });

    setPhone("");
  };

  const submitNewPhone = (e) => {
    e.preventDefault();

    const profile = {
      phone,
    };

    fetchClient
      .post(BASE_URL + "/profile/addPhone", profile)
      .then(() => console.log("upload new information"))
      .catch((err) => {
        console.error(err);
      });

    setPhone("");
  };

  const editFirstName = () => {
    var element = inputE1.current;
    var oldhtml = element.innerHTML;
    var newobj = document.createElement("input");
    newobj.type = "text";

    newobj.value = oldhtml;
    newobj.onblur = function () {
      element.innerHTML = this.value === oldhtml ? oldhtml : this.value;
      element.innerHTML = this.value === "" ? oldhtml : this.value;
      setFirstName(this.value);
      if (this.value !== oldhtml && this.value !== "") {
        setSaveBtn(true);
      }
      if (lastName == "") {
        setLastName(profile.lastName);
      }
      if (occupation == "") {
        setOccupation(profile.occupation);
      }
    };
    element.innerHTML = "";
    element.appendChild(newobj);
    newobj.setSelectionRange(0, oldhtml.length);
    newobj.focus();
  };

  const editLastName = () => {
    var element = inputE2.current;
    var oldhtml = element.innerHTML;
    var newobj = document.createElement("input");
    newobj.type = "text";

    newobj.value = oldhtml;
    newobj.onblur = function () {
      element.innerHTML = this.value === oldhtml ? oldhtml : this.value;
      element.innerHTML = this.value === "" ? oldhtml : this.value;
      setLastName(this.value);
      if (this.value !== oldhtml && this.value !== "") {
        setSaveBtn(true);
      }
      if (firstName == "") {
        setFirstName(profile.firstName);
      }
      if (occupation == "") {
        setOccupation(profile.occupation);
      }
    };
    element.innerHTML = "";
    element.appendChild(newobj);
    newobj.setSelectionRange(0, oldhtml.length);
    newobj.focus();
  };

  const editOccupation = () => {
    var element = inputE3.current;
    var oldhtml = element.innerHTML;
    var newobj = document.createElement("input");
    newobj.type = "text";

    newobj.value = oldhtml;
    newobj.onblur = function () {
      element.innerHTML = this.value === oldhtml ? oldhtml : this.value;
      element.innerHTML = this.value === "" ? oldhtml : this.value;
      setOccupation(this.value);
      if (this.value !== oldhtml && this.value !== "") {
        setSaveBtn(true);
      }
      if (lastName == "") {
        setLastName(profile.lastName);
      }
      if (firstName == "") {
        setFirstName(profile.firstName);
      }
    };
    element.innerHTML = "";
    element.appendChild(newobj);
    newobj.setSelectionRange(0, oldhtml.length);
    newobj.focus();
  };

  const addNewEmail = () => {
    let word = prompt("Input A New Email", "");
    setEmail(word);
    setOneProfile({ ...oneProfile, email: profile.email.push(word) });
  };

  const addNewPhone = () => {
    let word = prompt("Input A New Phone", "");
    setPhone(word);
    setOneProfile({ ...oneProfile, phone: profile.phone.push(word) });
  };

  const delEmail = (item) => {
    let pos = profile.email.indexOf(item);
    setEmail(item);
    //problem is here
    setOneProfile({ ...oneProfile, email: profile.email.splice(pos, 1) });
  };

  const delPhone = (item) => {
    let pos = profile.phone.indexOf(item);
    setPhone(item);
    //problem is here
    setOneProfile({ ...oneProfile, phone: profile.phone.splice(pos, 1) });
  };

  return (
    <React.Fragment>
      <Heading />
      <Navbar />
      <div className="sub-container">
        {/* <div className="person-heading">
          <h1>Personal Information</h1>
        </div> */}
        <div className="information-container">
          <div className="basicInformation">
            <div className="basic-heading">
              <h2>Basic Information</h2>
            </div>
            <form
              className="basic-Information"
              method="POST"
              onSubmit={submitProfile}
            >
              <div className="info-container">
                <div className="Label">First name: </div>
                <div className="Value" ref={inputE1} onClick={editFirstName}>
                  {profile.firstName}
                </div>
              </div>
              <div className="info-container">
                <div className="Label">Last name: </div>
                <div className="Value" ref={inputE2} onClick={editLastName}>
                  {profile.lastName}
                </div>
              </div>
              <div className="info-container">
                <div className="Label">Occupation: </div>
                <div className="Value" ref={inputE3} onClick={editOccupation}>
                  {profile.occupation}
                </div>
              </div>
              {saveBtn ? <input type="submit" value="save" /> : null}
            </form>
          </div>
          <br />
          <div className="contactInformation">
            <h2>Contact Information</h2>
            <label className="emailTitle">Email: </label>
            <form className="newEmail" method="POST" onSubmit={submitNewEmail}>
              <button onClick={addNewEmail}>+</button>
            </form>
            <div className="delEmail">
              {profile.email &&
                profile.email.map(function (item) {
                  return (
                    <form
                      className="del"
                      method="POST"
                      onSubmit={submitDelEmail}
                    >
                      <div className="email"> {item} </div>
                      <button
                        className="del-btn"
                        onClick={delEmail.bind(this, item)}
                      >
                        -
                      </button>
                    </form>
                  );
                })}
            </div>
            <br />
            <div className="phoneTitle">Phone: </div>
            <form className="newPhone" method="POST" onSubmit={submitNewPhone}>
              <button onClick={addNewPhone}>+</button>
              <br />
            </form>
            {profile.phone &&
              profile.phone.map(function (item) {
                return (
                  <form
                    className="delPhone"
                    method="POST"
                    onSubmit={submitDelPhone}
                  >
                    <div className="phone">{item}</div>

                    <button
                      className="del-btn"
                      onClick={delPhone.bind(this, item)}
                    >
                      -
                    </button>

                    <br />
                  </form>
                );
              })}
          </div>
        </div>
        <br />
        <Link to="/setting/qr">
          <button className="qr-code">QR Code</button>
        </Link>

        <button className="logout-btn" onClick={LogoutUser}>
          Log out
        </button>
      </div>
    </React.Fragment>
  );
};

export default Person;

export const UpdatePasswordComponent = ({ email }) => {
  const [updatePassword, setUpdatePassword] = useState(false);
  const [updatePasswordBtn, setUpdatePasswordBtn] = useState(true);

  return (
    <React.Fragment>
      {updatePasswordBtn && (
        <button
          className="password-btn"
          onClick={() => {
            setUpdatePassword(!updatePassword);
            setUpdatePasswordBtn(!updatePasswordBtn);
          }}
        >
          Change Your Password
        </button>
      )}

      {updatePassword && (
        <React.Fragment>
          <UpdatePassword email={email} />
          <button
            className="password-btn"
            onClick={() => {
              setUpdatePassword(!updatePassword);
              setUpdatePasswordBtn(!updatePasswordBtn);
            }}
            style={{ border: "none", color: "red", marginBottom: "20px" }}
          >
            Abort Change
          </button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

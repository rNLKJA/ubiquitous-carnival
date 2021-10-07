import React from "react";
import "./UpdatePassword.css"; // import required css
import fetchClient from "../axiosClient/axiosClient";
import { useState } from "react";
import { WindowOutlined } from "@mui/icons-material";

const UpdatePassword = ({ email }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [authCode, setAuthCode] = useState("");

  const sendAuthCode = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    await fetchClient
      .post("http://localhost:5000/user/sendEmailCode", data)
      // .post("https://crm4399.herokuapp.com/user/sendEmailCode", data)
      .then((response) => {
        if (response.data.status) {
          window.location.href = "/";
        } else {
          alert(response.data);
        }
      });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword1 !== newPassword2) {
      alert("Password In consistent, please re-enter your new password.");
      console.log("Password In consistent, please re-enter your new password.");
      return;
    }
    if (newPassword1 === oldPassword) {
      console.log(
        "It seems like your old password is the same as the new password, please double check!",
      );
      alert(
        "It seems like your old password is the same as the new password, please double check!",
      );
      return;
    }
    // check password match the pattern or not
    if (
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\'\"\;\-\^\%\$\#\@\!\+\=\_\<\>\,\/\.\:\~\`\d]{8,}$/.test(
        newPassword1,
      ) !== true
    ) {
      console.log(
        "Password need to contain at lest one digit or character, please try again.",
      );
      return alert(
        "Password need to contain at lest one digit or character, please try again.",
      );
    }

    const data = {
      email,
      oldPassword,
      newPassword1,
      authCode,
    };

    await fetchClient
      // .post("http://localhost:5000/user/changePassword", data)
      .post("https://crm4399.herokuapp.com/user/changePassword", data)
      .then((response) => {
        if (response.data.status) {
          alert("You've changed your password!");
          console.log("Password Changed");
          window.location.href("/setting");
        } else if (response.data.password_diff) {
          alert("Your new password is the same as the old one. Update Fail.");
          console.log(
            "Your new password is the same as the old one. Update Fail.",
          );
        }
      });
  };

  return (
    <React.Fragment>
      <form
        className="updated password"
        style={{ paddingTop: "20px" }}
        onSubmit={HandleSubmit}
      >
        <label>Please Enter Your OLD Password</label>
        <input
          type="password"
          name="old-password"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        ></input>
        <label>Please Enter Your NEW Password</label>
        <input
          type="password"
          name="password"
          required
          value={newPassword1}
          minLength={8}
          onChange={(e) => setNewPassword1(e.target.value)}
        ></input>
        <label>Please Re-enter Your NEW Password</label>
        <input
          type="password"
          name="re-password"
          required
          minLength={8}
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
        ></input>

        <button
          style={{ width: "97%", marginTop: "20px", marginBottom: "20px" }}
          onClick={sendAuthCode}
        >
          Send Authentication Code
        </button>

        <label>Please Enter Your Authentication Code</label>
        <input
          type="string"
          maxLength={6}
          minLength={6}
          required
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
        ></input>

        <button
          type="submit"
          style={{ width: "97%", marginTop: "20px", marginBottom: "20px" }}
        >
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default UpdatePassword;

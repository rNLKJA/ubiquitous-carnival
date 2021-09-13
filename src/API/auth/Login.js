import React, { useState } from "react";

// import "bootstrap/dist/css/bootstrap.min.css"
import "./login.css";

import Axios from "axios";

// import Registration from "./Registration";

Axios.defaults.withCredentials = true;

const Login = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loginState, setLoginState] = useState({
    status: false,
    username: "not login yet",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("trying to login..." + username);
    Axios.post("http://localhost:5000/user/login", {
      userName: username,
      password: password,
    }).then((response) => {
      console.log(response);
      if (!response.data.auth) {
        console.log("login fail");
        setLoginState({ status: false, username: "login fail" });
      } else {
        console.log(response.data);
        setLoginState({ status: true, username: username });
        window.location.href = "/";
      }
    });
  };

  const handleSignup = (event) => {
    window.location.href = "/signup";
  };

  return (
    <div className="sub-container">
      <div className="login-container">
        <h1>CRM Login</h1>

        <div>
          <label>Username :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          className="login-btn"
          type="button"
          value="login"
          onClick={handleLogin}
        />

        <button className="signup-btn" onClick={handleSignup}>
          Create a new account
        </button>
      </div>
    </div>
  );
};

export default Login;

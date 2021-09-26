import React, { useState } from "react";

// import "bootstrap/dist/css/bootstrap.min.css"
import "./login.css";

import Axios from "axios";

import useAuth from "../../hooks/useAuth";

import welcome from "./welcome.png";

Axios.defaults.withCredentials = true;

const Login = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loginState, setLoginState] = useState({
    status: false,
    username: "not login yet",
  });

  const { loginUser, error } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    let data = { username: username, password: password };
    console.log("trying to login user :", data.username);
    await loginUser(data);

    window.location.href = "/";
  };

  const handleSignup = (event) => {
    window.location.href = "/signup";
  };

  return (
    <div className="sub-container">
      <div className="login-container">
        <img className="welcome-img" src={welcome} alt="welcome logo" />
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

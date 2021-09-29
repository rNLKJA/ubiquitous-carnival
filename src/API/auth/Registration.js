import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import "./registration.css";

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      email: "",
      password: "",
      re_password: "",
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeRePassword = this.changeRePassword.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const register = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      re_password: this.state.re_password,
    };

    axios
      .post("https://crm4399.herokuapp.com/user/signup", register)
      .then((response) => {
          if(response.data.status){
            window.location.href = "/"
      } else {
        alert(response.data)
      }
    });

    this.setState({ userName: "", password: "", email: "", re_password: "" });

    
  }

  changePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  changeUserName(event) {
    this.setState({
      userName: event.target.value,
    });
  }

  changeRePassword(event) {
    this.setState({
      re_password: event.target.value,
    });
  }

  render() {
    return (
      <div className="sub-container">
        <div className="registration">
          <div className="form-div">
            <form onSubmit={this.onSubmit}>
              <label className="form-label">Username</label>
              <input
                type="text"
                placeholder="userName"
                onChange={this.changeUserName}
                value={this.state.userName}
                className="form-control form-group"
                required
              />

              <label className="form-label">Email</label>
              <input
                type="text"
                placeholder="email"
                onChange={this.changeEmail}
                value={this.state.email}
                className="form-control form-group"
                required
              />

              <input
                type="password"
                placeholder="password"
                onChange={this.changePassword}
                value={this.state.password}
                className="form-control form-group"
                required
              />

              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="double check password"
                onChange={this.changeRePassword}
                value={this.state.re_password}
                className="form-control form-group"
                required
              />

              <input
                type="submit"
                className="btn btn-danger btn-block"
                value="signup"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;

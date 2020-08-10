import React from "react";

import axiosWithAuth from "../utils/axiosWithAuth";

class SignIn extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  signin = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", this.state.credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("login", true);
        this.props.history.push("/");
        console.log("ea: Signin.js: signin: SUCCESS! results:", res);
      })
      .catch((err) =>
        console.error("ea: Signin.js: signin: err.message: ", err.message)
      );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.signin}>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={this.state.credentials.username}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={this.state.credentials.password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default SignIn;

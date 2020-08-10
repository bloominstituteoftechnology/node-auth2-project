import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import axiosWithAuth from "../utils/axiosWithAuth";


class SignUp extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
      department: "",
    },
  };
  handleDropdown = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        department: e,
      },
    });
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/register", this.state.credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/protected");
        console.log("ea: Login.js: login: SUCCESS! results:", res);
      })
      .catch((err) =>
        console.error("ea: Login.js: login: err.message: ", err.message)
      );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <DropdownButton
            id="dropdown-basic-button"
            title="Department"
            onSelect={this.handleDropdown}
          >
            <Dropdown.Item eventKey="2">IT</Dropdown.Item>
            <Dropdown.Item eventKey="3">Sales</Dropdown.Item>
            <Dropdown.Item eventKey="4">HR</Dropdown.Item>
            <Dropdown.Item eventKey="5">Finance</Dropdown.Item>
          </DropdownButton>
          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;

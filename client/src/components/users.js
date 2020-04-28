import React, { Component } from "react";

import axiosWithAuth from "../authentication/axioswithAuth.js";

export default class users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };
  }
  componentDidMount() {
    axiosWithAuth()
      .get("/users")
      .then((userList) => {
        this.setState({
          userList: userList.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <main>
        <h1 className="heading-primary">{localStorage.getItem("welcome")}</h1>
        <section className="users">
          <h2 className="heading-secondary">
            We found {this.state.userList.length} users in your department
          </h2>
          <div className="user__table">
            <table id="user-table">
              <tr className="users__row">
                <th className="users__heading">UserName</th>
                <th className="users__heading">Department</th>
              </tr>
              {this.state.userList.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </table>
          </div>
        </section>
      </main>
    );
  }
}

function UserCard(props) {
  const { username, department } = props.user;
  return (
    <tr className="users__row">
      <td className="users__data">{username}</td>
      <td className="users__data">{department}</td>
    </tr>
  );
}

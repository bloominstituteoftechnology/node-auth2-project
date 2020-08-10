import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

class UserList extends React.Component {
  state = {
    userList: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get("/users")
      .then((res) => {
        console.log("ea: UserList.js getData results:", res.data);
        this.setState({
          userList: res.data,
        });
      })
      .catch((err) =>
        console.error("ea: UserList.js: getData: err.message: ", err.message)
      );
  };

  render() {
    console.log("ea, UserList", this.state.userList);
    return (
      <div className="user-list">
        {this.state.userList.map((user) => {
          return (
            <div className="user" key={user.id}>
              <h1>{user.username}</h1>
              <p>{user.department}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default UserList;

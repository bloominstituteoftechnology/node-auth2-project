import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import UsersList from "./UsersList";

const UsersPage = () => {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    // make a GET request to fetch the users data
    axiosWithAuth()
      .get("/users")
      .then(res => {
  //      console.log(res);
        setUsersList(res.data);

      })
      .catch(err => {
        console.log(err);
      });
  });
  // set that data to the usersList state property

  return (
    <>
      <UsersList users={usersList} updateUsers={setUsersList} />

    </>
  );
};

export default UsersPage;

import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import UsersList from "./UsersList";

const UsersPage = () => {
  const [usersList, setUsersList] = useState([]);
  // fetch your colors data from the server when the component mounts

  useEffect(() => {
    // make a GET request to fetch the color data for your bubbles
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

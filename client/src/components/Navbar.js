import React from "react";
import Topbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  let history = useHistory();

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    history.push("/");
  }
  console.log();
  return (
    <Topbar bg="dark" variant="dark">
      <Topbar.Brand>User List</Topbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/signup">Sign Up</Nav.Link>
        <Nav.Link href="/signin">Sign In</Nav.Link>
      </Nav>
      {localStorage.getItem("token") ? (
        <Button variant="outline-info" onClick={logOut}>
          Sign Out
        </Button>
      ) : null}
    </Topbar>
  );
}

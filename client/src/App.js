import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AllUserList from "./components/AllUserList";
import UserList from "./components/UserList";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={UserList} />
          <PrivateRoute exact path="/all" component={AllUserList} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

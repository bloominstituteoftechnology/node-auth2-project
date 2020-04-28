import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./components/login";
import Users from "./components/users.js";
import Signup from "./components/signup.js";

export default function routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route exact path="/users" component={Users} />
    </Switch>
  );
}

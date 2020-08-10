import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp"
import UserList from "./components/UserList";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <PrivateRoute exact path="/protected" component={UserList} />
          <Route path="/login" component={Login} />
          <Route component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp"
import AllUserList from "./components/AllUserList"
import UserList from "./components/UserList";
import SignOut from "./components/SignOut";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
            <SignOut/>
      <div className="App">

        <Switch>
          <PrivateRoute exact path="/users" component={UserList} />
          <PrivateRoute exact path="/all" component={AllUserList} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;

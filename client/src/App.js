import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import UsersPage from "./components/UsersPage"

import Login from "./components/Login";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display UsersPage when you're authenticated 
        */}
      <PrivateRoute exact path="/users"  component={UsersPage} />

      </div>
    </Router>
  );
}

export default App;

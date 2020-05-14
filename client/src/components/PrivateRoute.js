// It uses the same API as <Route />
// It renders a <Route /> and passes all the props through it
// It checks if the user is authenticated; if they are it renders
// the given component; otherwise, it redirects to /

import React from "react";
import { Route, Redirect } from "react-router-dom";

// ...rest = rest operator
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // this area of the code is where you'll edit
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />; // returns to login page
        }
      }}
    />
  );
};

export default PrivateRoute;

import React, {useState} from "react";
import "../helper.scss";
import { MoreResources, DisplayFormikState } from "../helper";
import { Formik } from "formik";
import * as Yup from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import './Login.scss'

 // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the UsersPage route
 

const Login = (props) => {

  const [credentials, setCredentials] = useState({})
  /* const[isLoading, setIsLoading] = useState(true) */



  
  const login = e => {
    e.preventDefault();
    

    // add in our login api call
    axiosWithAuth()
    .post("/api/login", credentials)
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.data.payload);
     
      // nice for UX, auto redirect to the main dash
      props.history.push("/users");
    })
    .catch(err => {
      console.log(err);
    });
   
  };
  
  const handleChange = e => {
    setCredentials({
  
        ...credentials,
        [e.target.name]: e.target.value,
      
    });
  };
  
    return (
      <div className="form">
       
    <Formik
      initialValues={{username:"", password: "" }}
      onSubmit={login}
      /* onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 500)); */
   /*      alert(JSON.stringify(values, null, 2));
      }} */
      validationSchema={Yup.object().shape({
        username: Yup.string().required("Required"),
        password: Yup.string().required("Required"),

      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" style={{ display: "block" }}>
              Username
            </label>
            <input
              id="username"
              placeholder="Enter your username"
              type="text"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.username && touched.username
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.username && touched.username && (
              <div className="input-feedback">{errors.username}</div>
            )}

            <label htmlFor="password" style={{ display: "block" }}>
              Password
            </label>
            <input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.password && touched.password && (
              <div className="input-feedback">{errors.password}</div>
            )}

            <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
              Log in
            </button>

            <DisplayFormikState {...props} />
          </form>
        );
      }}
    </Formik>

    <MoreResources />
      </div>
    );
  }


export default Login;

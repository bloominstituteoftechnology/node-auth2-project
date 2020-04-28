import React from "react";
import { withFormik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import axiosWithAuth from "../authentication/axioswithAuth.js";

function login() {
  return (
    <Form className="form login-form">
      <Field
        className="form__field"
        type="text"
        name="username"
        placeholder="username"
      />
      <Field
        className="form__field"
        type="password"
        name="password"
        placeholder="password"
      />
      <div className="form__buttons">
        <button className="btn">Login</button>
        <Link to="/signup" className="btn-inline">
          Registr Here
        </Link>
      </div>
    </Form>
  );
}

const loginWithFormik = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || "",
    };
  },

  validationSchema: Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required"),
  }),

  handleSubmit(values, { resetForm, props }) {
    axiosWithAuth()
      .post("/auth/login", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("welcome", res.data.message);
        props.history.push("/users");
      })
      .catch((err) => {
        showError(err);
      });
  },
})(login);

export default loginWithFormik;

function showError(err) {
  const element = document.getElementsByClassName("form")[0];
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");

  element.appendChild(p1);
  element.appendChild(p2);

  p1.classList.add("error");
  p2.classList.add("error");

  p1.textContent = "Invalid Usernaem or Passwor";
  p2.textContent = err;

  setTimeout(() => {
    p1.remove();
    p2.remove();
  }, 3000);
}

import React from "react";
import { withFormik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import axiosWithAuth from "../authentication/axioswithAuth.js";

function login(props) {
  return (
    <Form className="form login-form">
      <Field
        className="form__field"
        type="text"
        name="username"
        placeholder="username"
      />

      {props.touched.username && props.errors.username && (
        <p className="error">{props.touched.username}</p>
      )}
      <Field
        className="form__field"
        type="password"
        name="password"
        placeholder="password"
      />

      {props.touched.password && props.errors.password && (
        <p className="error">{props.touched.password}</p>
      )}

      <Field
        className="form__field"
        type="password"
        name="passwordVerify"
        placeholder="Verify Password"
      />

      {props.touched.passwordVerify && props.errors.passwordVerify && (
        <p className="error">{props.touched.passwordVerify}</p>
      )}
      <div className="form__buttons">
        <button className="btn">Sign Up</button>
        <Link to="/" className="btn-inline">
          Login Here
        </Link>
      </div>
    </Form>
  );
}

const loginWithFormik = withFormik({
  mapPropsToValues({ username, password, passwordVerify }) {
    return {
      username: username || "",
      password: password || "",
      passwordVerify: passwordVerify || "",
    };
  },

  validationSchema: Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required"),
    passwordVerify: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password Do not Match"
    ),
  }),

  handleSubmit(values, { resetForm, props }) {
    axiosWithAuth()
      .post("/auth/register", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        axiosWithAuth()
          .post("/auth/login", {
            username: res.data.username,
            password: values.password,
          })
          .then((loginRes) => {
            localStorage.setItem("token", loginRes.data.token);
            localStorage.setItem("welcome", loginRes.data.message);
            props.history.push("/users");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        showError(err);
      });
    resetForm();
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

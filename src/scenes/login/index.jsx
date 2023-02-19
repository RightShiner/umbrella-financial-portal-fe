import React, { useEffect, useState } from "react";
//Icon
// import userIcon from "../../img/user.svg";
// import emailIcon from "../../img/email.svg";
// import passwordIcon from "../../img/password.svg";
// Validate
import { validate } from "./validate";
// Styles
import styles from "./login.module.css";
import "react-toastify/dist/ReactToastify.css";
// Toast
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";
//
import { Link } from "react-router-dom";
// Axios
import axios from "axios";

import Header from "../../components/Header";
import { Box, Button, TextField } from "@mui/material";
import "./index.css";

const Login = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    IsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "Login"));
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      // Pushing data to database usuing PHP script
      const urlApi = "http://localhost:3003/users/login";
      const pushData = async () => {
        const responseA = axios({
          method: "post",
          url: urlApi,
          data: data,
        })
          .then(function (response) {
            console.log(response.data.message);
            notify("Login successed!", "success");
          })
          .catch(function (err) {
            console.log(err.response.data.message);
            notify(err.response.data.message);
          });
        // const response = await toast.promise(responseA, {
        //   pending: "Check your data",
        //   success: "Success!",
        //   error: "error",
        // });
      };
      pushData();
    } else {
      notify("Please Check fileds again", "error");
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        IsAccepted: false,
      });
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.formLogin}
        onSubmit={submitHandler}
        autoComplete="off"
      >
        <h2>Login</h2>
        <div>
          <div
            className={
              errors.email && touched.email
                ? styles.unCompleted
                : !errors.email && touched.email
                ? styles.completed
                : undefined
            }
          >
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="E-mail"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            {/* <img src={emailIcon} alt="" /> */}
          </div>
          {errors.email && touched.email && (
            <span className={styles.error}>{errors.email}</span>
          )}
        </div>
        <div>
          <div
            className={
              errors.password && touched.password
                ? styles.unCompleted
                : !errors.password && touched.password
                ? styles.completed
                : undefined
            }
          >
            <input
              type="password"
              name="password"
              value={data.password}
              placeholder="Password"
              onChange={changeHandler}
              onFocus={focusHandler}
              autoComplete="off"
            />
            {/* <img src={passwordIcon} alt="" /> */}
          </div>
          {errors.password && touched.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>
        <Box display="flex" justifyContent="end" mt="20px" gap="10px">
          <Button type="submit" color="secondary" variant="contained">
            Login
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;

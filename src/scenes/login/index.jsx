import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, TextField } from "@mui/material";

import Header from "../../components/Header";
import { validate } from "./validate";
import styles from "./login.module.css";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import "./index.css";

import EmailIcon from "@mui/icons-material/Email";
import CircularProgress from '@mui/material/CircularProgress';

//Icon
// import userIcon from "../../img/user.svg";
// import usernameIcon from "../../img/username.svg";
// import passwordIcon from "../../img/password.svg";
// Validate
// Styles

const Login = ({ setUser, setSessionToken, saletemp }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrors(validate(data, "Login"));
  }, [data, touched]);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      setLoading(true);
      const pushData = async () => {
        axios({
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          url: `https://umbrella.rest.ghlmanager.com/users/login`,
          data: JSON.stringify(data),
        })
          .then(function (response) {
            notify("Login successed!", "success");
            console.log(response.data.sessionToken);
            setSessionToken(response.data.sessionToken);
            const user = response.data.user;
            setUser(user);
            localStorage.setItem("sessionToken", response.data.sessionToken);
            setLoading(false);
            navigate("/sales");
          })
          .catch(function (err) {
            setLoading(false);
            notify(err.response.data.message);
          });
      };
      pushData();
    } else {
      notify("Please Check fileds again", "error");
      setTouched({
        username: true,
        password: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      {loading ?
        <CircularProgress color="success" />
        : <form
          className={styles.formLogin}
          onSubmit={submitHandler}
          autoComplete="off"
        >
          <h2>Login</h2>
          <div>
            <div
              className={
                errors.username && touched.username
                  ? styles.unCompleted
                  : !errors.username && touched.username
                    ? styles.completed
                    : undefined
              }
            >
              {/* <Box display="flex" justifyContent="center">
              <EmailIcon color="success" /> */}
              <input
                type="text"
                name="username"
                value={data.username}
                placeholder="E-mail"
                onChange={changeHandler}
                onFocus={focusHandler}
                autoComplete="off"
              />
              {/* </Box> */}
            </div>
            {errors.username && touched.username && (
              <span className={styles.error}>{errors.username}</span>
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
      }
      <ToastContainer />
      {/* <CircularProgress color="success" /> */}
    </div>
  );
};

export default Login;

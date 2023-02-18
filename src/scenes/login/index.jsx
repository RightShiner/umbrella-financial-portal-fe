import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser, setSessionToken }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.email.value,
      password: event.target.password.value
    };
    axios({
      method: 'post',
      url: `https://umbrella.rest.ghlmanager.com/users/login`,
      data: data
    })
      .then(function (response) {
        console.log(response.data);
        if (response.data.status !== "success") {
          throw new Error("error logging in");
        }
        setSessionToken(response.data.sessionToken);
        const user = response.data.user;
        setUser(user);
        navigate("/sales");
      })
      .catch(function (err) {
        console.log(err.response);
      });
  };

  return (
    <Box m="20px">
      <Header title="Login" subtitle="" />

      <Formik
        // onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleFormSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px" gap="10px">
              <Button type="submit" color="secondary" variant="contained">
                Cancel
              </Button>
              <Button type="submit" color="secondary" variant="contained" >
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
  profilePhotos: yup.string().required("required"),
  city: yup.string().required("required"),
  state: yup.string().required("required"),
  zipcode: yup.string().required("required"),
  uIGID: yup.string().required("required"),
  affiliateID: yup.string().required("required"),
  aboutMeDescription: yup.string().required("required"),
  dateOfBirth: yup.string().required("required"),
  billingInformation: yup.string().required("required"),

});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  password: "",
  address1: "",
  address2: "",
  profilePhotos: "",
  city: "",
  state: "",
  zipcode: "",
  uIGID: "",
  affiliateID: "",
  aboutMeDescription: "",
  dateOfBirth: "",
  billingInformation: "",
};

export default Login;

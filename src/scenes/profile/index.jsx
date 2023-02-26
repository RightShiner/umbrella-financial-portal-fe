import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import User from '../../img/user.png';

const Profile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const itemData = [
    {
      img: '../../../img/user.png',
      title: 'Avatar',
    },
  ];

  return (
    <Box m="20px">
      <Header title="Profile" subtitle="" />

      <Formik
        onSubmit={handleFormSubmit}
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
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <ImageList
                sx={{ gridColumn: "span 4", width: 200, height: 200, margin: "auto" }}
                // sx={{ gridColumn: "span 2" }}
                cols={1}
                rowHeight={200}
              >
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                  <img
                    src={User}
                    style={{ cursor: "pointer"}}                                        
                    alt="profile-user"
                    loading="lazy"
                  />
                  </ImageListItem>
                ))}
              </ImageList>


              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
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
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Profile photos"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.profilePhotos}
                name="profilePhotos"
                error={!!touched.profilePhotos && !!errors.profilePhotos}
                helperText={touched.profilePhotos && errors.profilePhotos}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="State"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name="state"
                error={!!touched.state && !!errors.state}
                helperText={touched.state && errors.state}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Zipcode"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.zipcode}
                name="zipcode"
                error={!!touched.zipcode && !!errors.zipcode}
                helperText={touched.zipcode && errors.zipcode}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="UIG ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.uIGID}
                name="uIGID"
                error={!!touched.uIGID && !!errors.uIGID}
                helperText={touched.uIGID && errors.uIGID}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Affiliate ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.affiliateID}
                name="affiliateID"
                error={!!touched.affiliateID && !!errors.affiliateID}
                helperText={touched.affiliateID && errors.affiliateID}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dateOfBirth}
                name="dateOfBirth"
                error={!!touched.dateOfBirth && !!errors.dateOfBirth}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="About me description"
                multiline="true"
                rows="5"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.aboutMeDescription}
                name="aboutMeDescription"
                error={
                  !!touched.aboutMeDescription && !!errors.aboutMeDescription
                }
                helperText={
                  touched.aboutMeDescription && errors.aboutMeDescription
                }
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Billing information"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.billingInformation}
                name="billingInformation"
                error={
                  !!touched.billingInformation && !!errors.billingInformation
                }
                helperText={
                  touched.billingInformation && errors.billingInformation
                }
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {/* <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box> */}
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

export default Profile;

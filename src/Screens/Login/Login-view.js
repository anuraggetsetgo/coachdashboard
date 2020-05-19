import React, { useState } from "react";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import * as Yup from "yup";
import Logo from "../../img/logo.png";
import Style from "./Login-style";

export default (props) => {
  const loginFieldValidation = Yup.object().shape({
    password: Yup.string()
      .min(8, "Your password cannot be less than 8 letters")
      .max(20, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });
  {
    const {
      loginStatus,
      loginfn,
      startingLogin,
      invalidCredentials,
      resetState,
    } = props;

    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          props.loginfn(values);
        }}
        validationSchema={loginFieldValidation}
      >
        {({
          values,
          setSubmitting,
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched,
          isValidating,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="column"
                spacing="1"
              >
                <Grid item style={Style.logoContainer}>
                  <img src={Logo} style={Style.logo} />
                </Grid>
                <Grid item>
                  <TextField
                    style={Style.logoContainer}
                    name="email"
                    id="email"
                    label="Email"
                    defaultValue=""
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item>
                  <TextField
                    style={Style.logoContainer}
                    name="password"
                    id="password"
                    label="Password"
                    type="password"
                    defaultValue=""
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password && touched.password}
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Button
                  name="button"
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
                {invalidCredentials ? (
                  <Typography style={Style.errorMessage} variant="body2">
                    "Opss!!! Wrong User name or password...Please Try again "
                  </Typography>
                ) : null}
                {startingLogin && !invalidCredentials ? (
                  <Grid item xs={12}>
                    <Grid
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item>IN login status: {loginStatus.in}</Grid>
                      <Grid item>ME login status: {loginStatus.me}</Grid>
                      <Grid item>ROW login status: {loginStatus.row}</Grid>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
            </div>
          </form>
        )}
      </Formik>
    );
  }
};

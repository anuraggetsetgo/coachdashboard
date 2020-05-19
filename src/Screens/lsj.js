import React, { useState } from "react";
import { Form, Field, Formik } from "formik";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
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
        {({ errors, touched, isValidating }) => (
          <Form>
            <div>
              <img src={Logo} style={Style.logoContainer} />
              <label htmlFor="email">
                <Typography>Email</Typography>
              </label>
              <Field name="email" />
              {errors.email && touched.email ? (
                <Typography variant="body2">{errors.email}</Typography>
              ) : null}
              <div>
                <label htmlFor="password">
                  <Typography>Password</Typography>
                </label>
                <Field name="password" type="password" />
                {errors.password && touched.password ? (
                  <Typography variant="body2">{errors.password}</Typography>
                ) : null}
              </div>
              <Button
                name="button"
                type="submit"
                variant="contained"
                color="primary"
              >
                <Typography variant="subtitle2">Login</Typography>
              </Button>
              {/*startingLogin && <Typography variant="subtitle2">
                    Loggin...
                  </Typography>*/}
              {invalidCredentials ? (
                <Typography style={Style.errorMessage} variant="body2">
                  "Opss!!! Wrong User name or password...Please Try again "
                </Typography>
              ) : null}
              {startingLogin && !invalidCredentials ? (
                <Grid item xs={8}>
                  <Grid
                    //style={Style.errorMessage}
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
            </div>
          </Form>
        )}
      </Formik>
    );
  }
};

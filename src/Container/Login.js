import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { apiCall, setData, getData } from "../Utilities/Services";
import Login from "../Screens/Login/Login-view";

const LoginContainer = (props) => {
  let creds = {}; //Storing Credentials accross various Regions
  const [currentRegion, updateCurrentRegion] = useState("in");
  const [loginStatus, updateLoginStatus] = useState({
    in: "in..",
    me: "me...n",
    row: "row..nn",
  });
  const [startingLogin, updatestartingLogin] = useState(false);
  const [invalidCredentials, updateCredentials] = useState(false);

  const updateRegion = (key, data) => {
    let tempObj = Object.assign(loginStatus);
    tempObj[key] = data;
    updateLoginStatus({ tempObj });
  };
  const updateAuth = (region, data) => {
    if (data.data) {
      let currentAuthData = getData("auth");
      currentAuthData = currentAuthData ? JSON.parse(currentAuthData) : {};
      currentAuthData[region] = data.data.token;
      setData("auth", JSON.stringify(currentAuthData));
      updateRegion(region, "logged in");
      setData("isAuthenticated", true);
    } else {
      updateRegion(region, "failed");
    }
    setData("region", "in");
  };
  const updateROW = (data) => {
    updateAuth("row", data);
    if (
      loginStatus.in === "logged in" ||
      loginStatus.me === "logged in" ||
      loginStatus.row === "logged in"
    ) {
      proceedToDashboard();
    } else {
      updateCredentials(true);
      updatestartingLogin(false);
    }
  };
  const resetState = () => {
    updateCredentials(false);
    updateRegion("in", "logging in ...");
    updateRegion("me", "not logged in");
    updateRegion("row", "not logged in");
  };
  const updateME = (data) => {
    updateAuth("me", data);
    setData("region", "row");
    apiCall("signin", "row", updateROW, updateROW, props.props, "post", creds);
  };
  const updateIN = (data) => {
    updateAuth("in", data);
    setData("region", "me");
    apiCall("signin", "me", updateME, updateME, props.props, "post", creds);
  };
  const proceedToDashboard = () => {
    console.log(getData("auth"));
    props.props.history.push("/");
  };

  const loginFn = (f) => {
    updatestartingLogin(true);
    const tempObj = {
      user_email: f.email,
      user_password: f.password,
      user_type: "consultant",
    };
    creds = tempObj;
    setData("region", "in");
    apiCall("signin", "in", updateIN, updateIN, props.props, "post", tempObj);
  };
  const prints = () => {
    console.log("this is functions passed as comp");
  };
  return (
    <div>
      <Login
        loginfn={loginFn}
        loginStatus={loginStatus}
        startingLogin={startingLogin}
        invalidCredentials={invalidCredentials}
        resetState={resetState}
      />
    </div>
  );
};

export default LoginContainer;

import React, { useState } from "react";
import { getData, removeItem, apiCall, setData } from "./Services";

const Auth = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const authData = getData("auth");
  function updateLogin(data) {
    setData("isAuthenticated", true);
    props.changeLoginStatus(true, data);
  }
  function errLogin(data) {
    removeItem("auth");
    removeItem("isAuthenticated");
    props.changeLoginStatus(false);
  }
  if (!authData)
    return React.cloneElement(props.childrenNoAuth, props) || <div></div>;
  else {
    apiCall("profile", "in", updateLogin, errLogin, props, "get");
  }
  return React.cloneElement(props.children, props);
};

export default Auth;

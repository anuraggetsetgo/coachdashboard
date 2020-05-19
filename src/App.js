import React, { useState } from "react";
//import logo from "./logo.svg";
import "./App.css";
import LoginContainer from "./Container/Login";
import Dashboard from "./Container/Dashboard";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "./Utilities/Auth";
import { setData, getData } from "./Utilities/Services";

const empty = () => {
  return <div></div>;
};
const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(getData("isAuthenticated") || false);
  function changeLoginStatus(status, data) {
    if (status) {
      setData("profilePic", data.data.profile_pic);
      setData("userId", data.data.user_id);
      setData("coachData", data.data);
    }
    setLoggedIn(status);
  }
  return (
    <div className="App">
      <Router>
        <div>
          <Route
            path="/"
            exact
            render={(routeProps) => (
              <Auth
                props={routeProps}
                children={<Dashboard />}
                childrenNoAuth={<LoginContainer />}
                changeLoginStatus={changeLoginStatus}
              />
            )}
          />
        </div>
      </Router>
    </div>
  );
};

export default App;

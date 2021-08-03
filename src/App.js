import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/style.css";
import Axios from "axios";

import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Cocktail from "./Pages/Cocktail";

Axios.defaults.withCredentials = true;

const Script = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const setInfo = (props) => {
    setLoggedIn(props.checked);
    setUserInfo(props.user);
  };

  useEffect(() => {
    async function getData() {
      let results = await Axios.get(
        "https://scott-cocktail.herokuapp.com/login"
      );
      setLoggedIn(results.data.loggedIn);
      if (results.data.loggedIn === true) {
        setUserInfo(results.data.user);
      }
    }
    getData();
  }, []);

  return (
    <Router>
      <Navbar loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <Login callback={setInfo} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile data={userInfo} callback={setInfo} />
        </Route>
        <Route path="/cocktail/:id" children={<Cocktail />}></Route>
      </Switch>
    </Router>
  );
};

export default Script;

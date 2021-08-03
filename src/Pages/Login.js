import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Login(props) {
  let history = useHistory();
  const [loginuser, setLoginuser] = useState({ username: "", password: "" });
  const [resError, setResError] = useState("");
  const handleChange = (e) => {
    const { id, value } = e.target;

    setLoginuser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginuser.username && loginuser.password) {
      Axios.put("https://scott-cocktail.herokuapp.com/users", loginuser).then(
        (response) => {
          setResError(response.data.message);

          if (response.data.message === "You are in") {
            history.push("/");
            props.callback({ checked: true, user: response.data.user });
          }
        }
      );
    } else {
      setResError("Please enter username and password");
    }
  };

  return (
    <div className="container">
      <div className="form_crl">
        <h1 className="usertitle">Login</h1>
        <form className="login_form">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={loginuser.username}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={loginuser.password}
            onChange={(e) => handleChange(e)}
          />
          <div className="btn_crl">
            <button className="btn" onClick={(e) => handleLogin(e)}>
              Login
            </button>
          </div>
          <h1 className="resError">{resError}</h1>
        </form>
      </div>
    </div>
  );
}

export default Login;

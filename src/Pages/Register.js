import React, { useState } from "react";
import Axios from "axios";

function Register() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
  });
  const [resError, setResError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;

    setInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      info.name &&
      info.username &&
      info.email &&
      info.password &&
      info.confirm
    ) {
      info.password !== info.confirm
        ? setResError("Password not confirmed")
        : Axios.post(
            "https://scott-cocktail.herokuapp.com/register",
            info
          ).then((response) => {
            setResError(response.data.message);
          });
    } else setResError("Please enter all infomation");
  };

  return (
    <div className="container">
      <div className="form_crl">
        <h1 className="usertitle">Register</h1>
        <form className="register_form">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={info.name}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={info.email}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={info.username}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={info.password}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="confirm_password">ConfirmPassword:</label>
          <input
            id="confirm"
            type="password"
            value={info.confirm}
            onChange={(e) => handleChange(e)}
          />
          <div className="btn_crl">
            <button className="btn" onClick={(e) => handleRegister(e)}>
              Register
            </button>
          </div>
        </form>
        <h1 className="resError">{resError}</h1>
      </div>
    </div>
  );
}

export default Register;

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

function Profile(props) {
  let history = useHistory();
  const [user, setUser] = useState(
    props.data[0] || { name: "", email: "", username: "" }
  );

  const handleLogout = (e) => {
    e.preventDefault();
    Axios.post("https://scott-cocktail.herokuapp.com/logout").then(
      (response) => {
        console.log(response.data.message);
        props.callback({ checked: false, user: [] });
        history.push("/");
      }
    );
  };

  return (
    <div className="container">
      <h1 className="usertitle">Profile</h1>
      <div className="profile_crl">
        <form className="profile_form">
          <p>
            <span>Name: </span>
            {user.name}
          </p>
          <p>
            <span>Email: </span>
            {user.email}
          </p>
          <p>
            <span>Username: </span>
            {user.username}
          </p>
          <button className="btn" onClick={(e) => handleLogout(e)}>
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;

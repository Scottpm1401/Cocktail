import React from "react";
import { Link } from "react-router-dom";

function Navbar({ loggedIn }) {
  return (
    <nav className="nav_bar">
      <div className="nav_crl">
        <Link to="/">
          <img
            className="logo"
            src="https://react-projects-15-cocktails.netlify.app/static/media/logo.9a3d2645.svg"
            alt=""
          />
        </Link>
        <div className="Links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {loggedIn ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <React.Fragment>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

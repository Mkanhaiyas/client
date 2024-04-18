import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbaar navbar-expand-lg">
        <NavLink className="navbar-brand" to="/">
          <h1
          //src="philadelphia-eagles-logo.svg"
          //alt="logo"
          >
            MKList
          </h1>
        </NavLink>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        {/* 
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav sl-auto">
            <li className="nav-item"> */}
        <NavLink className="nav-linkss-parent" to="/create">
          <p className="nav-linkss">Create Record</p>
        </NavLink>
        {/* </li>
          </ul>
        </div> */}
      </nav>
    </div>
  );
}

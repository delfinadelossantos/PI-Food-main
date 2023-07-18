import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="nav-container">
      <div className="link-container">
        <Link to="/home">Home</Link>
        <Link to="/form">Form</Link>
      </div>
    </div>
  );
};

export default NavBar;

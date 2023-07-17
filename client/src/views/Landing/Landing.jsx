import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./landing.css";

const Landing = () => {
  return (
    <div className="landing">
      <h1>Recipes.</h1>
      <Link to="/home">Home</Link>
    </div>
  );
};

export default Landing;

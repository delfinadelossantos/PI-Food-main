import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Landing = () => {
  return (
    <div>
      <h1>Landing page</h1>
      <Link to="/home">Home</Link>
    </div>
  );
};

export default Landing;

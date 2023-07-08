import React from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import "./home.css";

const Home = () => {
  return (
    <div className="home-cont">
      <h1>Home</h1>
      <div>
        <CardsContainer />
      </div>
    </div>
  );
};

export default Home;

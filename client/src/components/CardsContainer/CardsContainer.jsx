import React from "react";
import Card from "../Card/Card";
import "./cardscontainer.css";

const CardsContainer = () => {
  return (
    <>
      <h2>Recipes</h2>
      <div className="cards-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

export default CardsContainer;

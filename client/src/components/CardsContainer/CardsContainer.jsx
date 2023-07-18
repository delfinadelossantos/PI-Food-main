import React from "react";
import Card from "../Card/Card";
import "./cardscontainer.css";

const CardsContainer = ({ recipes }) => {
  return (
    <>
      <h2 className="cards-container-title">Recipes</h2>
      <div className="cards-container">
        {recipes.map((recipe) => {
          return (
            <Card
              recipe={recipe} //Pasa toda la recipe como prop
              key={recipe.id} //Agrega una key única
              title={recipe.title}
              image={recipe.image}
              diets={recipe.diets}
            />
          );
        })}
      </div>
    </>
  );
};

export default CardsContainer;

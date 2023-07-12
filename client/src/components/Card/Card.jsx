import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./card.css";

//Componente DUMB: no tiene carga de lógica, sólo es presentacional, muestra props que recibe.
const Card = (props) => {
  return (
    <div key={props.id} className="card-cont">
      <h4>
        <Link to={`/recipes/:${props.id}`}>{props.title}</Link>
      </h4>
      <img src={props.image} alt="img" />
      <p>Diet Types: {props.diets} </p>
    </div>
  );
};

export default Card;

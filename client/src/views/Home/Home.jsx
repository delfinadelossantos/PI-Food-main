import React from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import "./home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  //useSelector permite acceder al estado global sin necesidad de recibir props. Se suscribe al estado.
  const recipes = useSelector((state) => state.recipes);

  return (
    <div className="home-cont">
      <h1>Home</h1>
      <div>
        <CardsContainer recipes={recipes}></CardsContainer>
      </div>
    </div>
  );
};

export default Home;

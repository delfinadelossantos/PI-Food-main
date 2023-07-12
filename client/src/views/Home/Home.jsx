import React from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import "./home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, pagination } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  //useSelector permite acceder al estado global sin necesidad de recibir props. Se suscribe al estado.
  const recipes = useSelector((state) => state.recipes);

  //Paginado global
  const recipesPagination = useSelector((state) => state.pagination);

  const nextPage = () => {
    dispatch(pagination("next"));
  };

  const prevPage = () => {
    dispatch(pagination("prev"));
  };

  return (
    <div className="home-cont">
      <h1>Home</h1>
      <div className="home-pagination">
        <button onClick={prevPage}>Prev</button>
        <button onClick={nextPage}>Next</button>
      </div>
      <div>
        <CardsContainer recipes={recipesPagination}></CardsContainer>
      </div>
    </div>
  );
};

export default Home;

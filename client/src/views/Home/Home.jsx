import React from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import "./home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByOrigin,
  getDiets,
  getRecipes,
  pagination,
} from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);

  const filterRecipesByOrigin = (event) => {
    const origin = event.target.value;
    dispatch(filterByOrigin(origin));
  };

  //useSelector permite acceder al estado global sin necesidad de recibir props. Se suscribe al estado.
  const recipes = useSelector((state) => state.recipes);

  const diets = useSelector((state) => state.diets);

  const handleDiets = (event) => {};

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

        <label>Filter by Origin: </label>
        <select onChange={filterRecipesByOrigin}>
          <option value="All">All</option>
          <option value="api">API</option>
          <option value="db">Database</option>
        </select>

        <label>Filter by Diet: </label>
        <select value={diets} onChange={handleDiets} name="diets">
          {diets.map((diet) => (
            <option key={diet.id} value={diet.id}>
              {diet.name}
            </option>
          ))}
        </select>

        <label>Sort recipes: </label>
        <select>
          <option value="A-Z">From A to Z</option>
          <option value="Z-A">From Z to A</option>
        </select>

        <label>Sort by HealthScore: </label>
        <select>
          <option value="">Highest HealthScore</option>
          <option value="">Lowest HealthScore</option>
        </select>
      </div>

      <div>
        <CardsContainer recipes={recipesPagination}></CardsContainer>
      </div>
    </div>
  );
};

export default Home;

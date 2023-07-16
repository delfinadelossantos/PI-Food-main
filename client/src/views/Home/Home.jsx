import React from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import "./home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByDiet,
  filterByOrigin,
  getDiets,
  getRecipes,
  pagination,
  sortByHealthScore,
  sortRecipes,
} from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);

  //useSelector permite acceder al estado global sin necesidad de recibir props. Se suscribe al estado.
  const recipes = useSelector((state) => state.recipes);

  const filter = useSelector((state) => state.filter);

  const diets = useSelector((state) => state.diets);

  const handleDiets = (event) => {
    let diet = event.target.value;
    dispatch(filterByDiet(diet));
  };

  const handleOrigin = (event) => {
    const origin = event.target.value;
    dispatch(filterByOrigin(origin));
  };

  const handleHealthScore = (event) => {
    dispatch(sortByHealthScore(event.target.value));
  };

  const handleSort = (event) => {
    dispatch(sortRecipes(event.target.value));
  };

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
        <select onChange={(e) => handleOrigin(e)}>
          <option value="All">All</option>
          <option value="api">API</option>
          <option value="db">Database</option>
        </select>

        <label>Filter by Diet: </label>
        {/* <select value={diets} onChange={handleDiets} name="diets">
          {diets.map((diet) => (
            <option key={diet.id} value={diet.name}>
              {diet.name}
            </option>
          ))}
        </select> */}

        <label>Sort recipes: </label>
        <select onChange={handleSort}>
          <option value="A-Z">From A to Z</option>
          <option value="Z-A">From Z to A</option>
        </select>

        <label>Sort by HealthScore: </label>
        <select onChange={handleHealthScore}>
          <option value="desc">Highest HealthScore</option>
          <option value="asc">Lowest HealthScore</option>
        </select>
      </div>
      <div>
        <SearchBar />
      </div>

      <div>
        {filter ? (
          <CardsContainer recipes={recipes}></CardsContainer>
        ) : (
          <CardsContainer recipes={recipesPagination}></CardsContainer>
        )}
      </div>
    </div>
  );
};

export default Home;

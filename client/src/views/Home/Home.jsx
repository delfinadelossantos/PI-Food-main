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
    dispatch(filterByDiet(event.target.value));
  };

  const handleOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };

  const handleHealthScore = (event) => {
    dispatch(sortByHealthScore(event.target.value));
  };

  const handleSort = (event) => {
    dispatch(sortRecipes(event.target.value));
  };

  const handleClear = (event) => {
    dispatch(getRecipes());
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
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="filter-menu">
        <div className="filter-options">
          <div className="filter-group">
            <div className="filter-item">
              <div className="filter-item-top">
                <label>Filter by Origin:</label>
              </div>
              <div className="filter-item-bottom">
                <select onChange={(e) => handleOrigin(e)}>
                  <option value="All">All</option>
                  <option value="api">API</option>
                  <option value="db">Database</option>
                </select>
              </div>
            </div>
            <div className="filter-item">
              <label>Filter by Diet:</label>
              <select value={diets} onChange={handleDiets} name="diets">
                <option value="">Select a diet</option>
                {diets.map((diet) => (
                  <option key={diet.id} value={diet.name}>
                    {diet.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label>Sort recipes:</label>
              <select onChange={handleSort}>
                <option defaultChecked value="">
                  Select order
                </option>
                <option value="A-Z">From A to Z</option>
                <option value="Z-A">From Z to A</option>
              </select>
            </div>
            <div className="filter-item">
              <label>Sort by HealthScore:</label>
              <select onChange={handleHealthScore}>
                <option defaultChecked value="">
                  Select order
                </option>
                <option value="desc">Highest HealthScore</option>
                <option value="asc">Lowest HealthScore</option>
              </select>
            </div>
            <div className="clear-filters">
              <button onClick={handleClear}>Clear Filters</button>
            </div>
          </div>
        </div>
      </div>
      <div className="pagination-buttons-holder">
        <div className="pagination-buttons">
          <button onClick={prevPage}>&nbsp;&lt;&nbsp;</button>
          <button onClick={nextPage}>&nbsp;&gt;&nbsp;</button>
        </div>
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

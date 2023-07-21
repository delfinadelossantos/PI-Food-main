import React from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import "./home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  filterByDiet,
  filterByOrigin,
  getDiets,
  getRecipes,
  resetFilters,
  sortByHealthScore,
  sortRecipes,
} from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, []);

  //useSelector permite acceder al estado global sin necesidad de recibir props. Se suscribe al estado.
  const recipes = useSelector((state) => state.recipes);

  const diets = useSelector((state) => state.diets);

  //----------------Paginado--------------------
  const itemsPerPage = 9; //Cantidad de recetas por página
  //useState da un estado y una función para controlarlo.
  const [items, setItems] = useState([...recipes].splice(0, itemsPerPage));
  const [currentPage, setCurrentPage] = useState(0);
  console.log([...recipes].splice(0, itemsPerPage));

  const prevPage = () => {
    const prev_page = currentPage - 1;
    const firstIndex = prev_page * itemsPerPage;
    if (prev_page < 0) return; //Caso de corte: que la página anterior sea menor a cero.
    setItems([...recipes].splice(firstIndex, itemsPerPage));
    setCurrentPage(prev_page);
  };

  const nextPage = () => {
    const next_page = currentPage + 1;
    const firstIndex = next_page * itemsPerPage;
    if (firstIndex >= recipes.length) return; //Caso de corte: si llega al final de los ítems, no sigue paginando.
    setItems([...recipes].splice(firstIndex, itemsPerPage));
    setCurrentPage(next_page);
  };

  //El paginado se establece a partir de una copia de recipes cuando se renderiza el componente. Pero en una primera
  //instancia, ni bien se monta el componente, recipes está vacío (hasta que hace la petición)
  //Este segundo useEffect está atento al estado global de recipes. Cuando esté lleno,
  //setItems se llena con lo mismo que recibe items inicialmente.
  useEffect(() => {
    setItems([...recipes].splice(0, itemsPerPage));
  }, [recipes]);

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
    dispatch(resetFilters());
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
                  <option defaultValue="All">All</option>
                  <option value="api">API</option>
                  <option value="db">Database</option>
                </select>
              </div>
            </div>
            <div className="filter-item">
              <label>Filter by Diet:</label>
              <select value={diets} onChange={handleDiets} name="diets">
                <option defaultValue="">Select a diet</option>
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
                <option defaultValue="">Select order</option>
                <option value="A-Z">From A to Z</option>
                <option value="Z-A">From Z to A</option>
              </select>
            </div>
            <div className="filter-item">
              <label>Sort by HealthScore:</label>
              <select onChange={handleHealthScore}>
                <option defaultValue="">Select order</option>
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
        <CardsContainer recipes={items}></CardsContainer>
      </div>
      <div className="footer-cont">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;

//   //Paginado global
//   const filter = useSelector((state) => state.filter);
//   const recipesPagination = useSelector((state) => state.pagination);

//   const nextPage = () => {
//     dispatch(pagination("next"));
//   };

//   const prevPage = () => {
//     dispatch(pagination("prev"));
//   };

//   {filter ? (
//     <CardsContainer recipes={items}></CardsContainer>
//     ) : (
//        <CardsContainer recipes={recipesPagination}></CardsContainer>
//      )}

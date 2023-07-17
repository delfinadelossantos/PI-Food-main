//El reducer es una función que recibe el estado a modificar y la action que indica qué tiene que hacer.
import {
  FILTER_BY_DIET,
  FILTER_BY_ORIGIN,
  GET_DIETS,
  GET_RECIPES,
  GET_RECIPE_DETAIL,
  PAGINATION,
  SEARCH_RECIPE,
  SORT_BY_HEALTHSCORE,
  SORT_RECIPES,
} from "./actions";
const itemsPerPage = 9;

const initialState = {
  recipes: [],
  pagination: [],
  currentPage: 0,
  diets: [],
  order: "desc",
  detail: [],
  allRecipes: [],
  filter: false,
};

//Cuando la aplicación recién inicia, el estado es initialState.
const rootReducer = (state = initialState, action) => {
  //El switch evalúa qué es lo que se debe hacer
  //Y en un principio tiene un caso default que es retornar una copia del estado.

  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
        pagination: [...action.payload].splice(0, itemsPerPage),
      };
    case PAGINATION:
      const nextPage = state.currentPage + 1;
      const prevPage = state.currentPage - 1;

      const firstIndex =
        action.payload === "next"
          ? nextPage * itemsPerPage
          : prevPage * itemsPerPage;

      if (action.payload === "next" && firstIndex >= state.recipes.length) {
        return { ...state };
      } else if (action.payload === "prev" && prevPage < 0) {
        return { ...state };
      }
      return {
        ...state,
        pagination: [...state.recipes].splice(firstIndex, itemsPerPage),
        currentPage: action.payload === "next" ? nextPage : prevPage,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case SORT_BY_HEALTHSCORE:
      const clonedRecipes = [...state.recipes];
      const sortedHealthScore = clonedRecipes.sort((a, b) => {
        if (state.order === "desc") {
          return b.healthScore - a.healthScore;
        } else {
          return a.healthScore - b.healthScore;
        }
      });
      const newHealthScoreOrder = state.order === "desc" ? "asc" : "desc";
      return {
        ...state,
        recipes: sortedHealthScore,
        order: newHealthScoreOrder,
      };
    case FILTER_BY_ORIGIN:
      const recipeOrigin = state.allRecipes;
      const originFilter =
        action.payload === "db"
          ? recipeOrigin.filter((recipe) => recipe.createdInDb === true)
          : recipeOrigin.filter((recipe) => recipe.createdInDb === false);
      return {
        ...state,
        filter: true,
        recipes: action.payload === "All" ? recipeOrigin : originFilter,
      };
    case SEARCH_RECIPE:
      return {
        ...state,
        pagination: action.payload,
      };
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case FILTER_BY_DIET:
      const recipesFiltered = [...state.recipes];
      const filteredByDiet =
        action.payload === "All"
          ? recipesFiltered
          : recipesFiltered.filter((element) =>
              element.diets.includes(action.payload)
            );
      return {
        ...state,
        recipes: filteredByDiet,
      };
    case SORT_RECIPES:
      const sortedRecipes = [...state.recipes];
      sortedRecipes.sort((a, b) => {
        if (action.payload === "A-Z") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
      return { ...state, recipes: sortedRecipes };
    default:
      return { ...state };
  }
};

export default rootReducer;

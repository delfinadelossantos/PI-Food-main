//La action creator retorna una función que es la que se encarga de hacer la request
//al servidor. La función realiza un dispatch para llegar al reducer.
import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const SEARCH_RECIPE = "SEARCH_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const SORT_RECIPES = "SORT_RECIPES";
export const SORT_BY_HEALTHSCORE = "SORTER_BY_HEALTHSCORE";
export const RESET_FILTERS = "RESET FILTERS";

export const getRecipes = () => {
  return async function (dispatch) {
    try {
      const recipes = await axios.get("http://localhost:3001/recipes/");
      dispatch({ type: GET_RECIPES, payload: recipes.data });
    } catch (error) {
      alert("Error");
    }
  };
};

export const createRecipe = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/recipes/", form);
      alert("Recipe was created succesfully");
      dispatch({ type: CREATE_RECIPE, payload: response });
    } catch (error) {}
  };
};

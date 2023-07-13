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
export const PAGINATION = "PAGINATION";

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

export const pagination = (order) => {
  return async function (dispatch) {
    dispatch({
      type: PAGINATION,
      payload: order,
    });
  };
};

export const filterByOrigin = (origin) => {
  return async function (dispatch) {
    dispatch({
      type: FILTER_BY_ORIGIN,
      payload: origin,
    });
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    try {
      const diets = await axios.get("http://localhost:3001/diets");
      dispatch({ action: GET_DIETS, payload: diets });
    } catch (error) {}
  };
};

export const filterByDiet = (diet) => {};

export const sortByHealthScore = (order) => {
  return {
    type: SORT_BY_HEALTHSCORE,
    payload: order,
  };
};

export const searchRecipe = (name) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        "http://localhost:3001/recipes/?name=" + name
      );
      dispatch({ type: SEARCH_RECIPE, payload: json.data });
    } catch (error) {
      throw new Error("It seems the recipe does not exist");
    }
  };
};

export const getRecipeDetail = (id) => {
  return async function (dispatch) {
    const detail = await axios.get(`http://localhost:3001/recipes/${id}`);
    dispatch({});
  };
};

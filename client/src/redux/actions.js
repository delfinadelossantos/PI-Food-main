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
export const SORT_BY_HEALTHSCORE = "SORT_BY_HEALTHSCORE";
export const PAGINATION = "PAGINATION";

export const getRecipes = () => {
  return async function (dispatch) {
    try {
      const recipes = await axios.get("http://localhost:3001/recipes/");
      dispatch({ type: "GET_RECIPES", payload: recipes.data });
    } catch (error) {
      alert("Error");
      throw new Error("API Error");
    }
  };
};

export const createRecipe = (form) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/recipes/", form);
      alert("Recipe was created succesfully");
      dispatch({ type: "CREATE_RECIPE", payload: response });
    } catch (error) {
      alert("Recipe could not be created");
      throw new Error("Recipe could not be created");
    }
  };
};

export const pagination = (order) => {
  return async function (dispatch) {
    dispatch({
      type: "PAGINATION",
      payload: order,
    });
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: "FILTER_BY_ORIGIN",
    payload: origin,
  };
};

export const getDiets = () => {
  return async function (dispatch) {
    try {
      const diets = await axios.get("http://localhost:3001/diets");
      dispatch({ type: "GET_DIETS", payload: diets.data });
    } catch (error) {
      throw new Error("Diets not found");
    }
  };
};

export const filterByDiet = (diet) => {
  return {
    type: "FILTER_BY_DIET",
    payload: diet,
  };
};

export const sortByHealthScore = (order) => {
  return {
    type: "SORT_BY_HEALTHSCORE",
    payload: order,
  };
};

export const sortRecipes = (sort) => {
  return {
    type: "SORT_RECIPES",
    payload: sort,
  };
};

export const searchRecipe = (name) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        "http://localhost:3001/recipes/?name=" + name
      );
      dispatch({ type: "SEARCH_RECIPE", payload: json.data });
    } catch (error) {
      throw new Error("It seems the recipe does not exist");
    }
  };
};

export const getRecipeDetail = (id) => {
  return async function (dispatch) {
    try {
      const detail = await axios.get(`http://localhost:3001/recipes/${id}`);
      dispatch({ type: "GET_RECIPE_DETAIL", payload: detail });
    } catch (error) {
      throw new Error("Detail not found");
    }
  };
};

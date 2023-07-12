//El reducer es una función que recibe el estado a modificar y la action que indica qué tiene que hacer.
import { GET_RECIPES, PAGINATION } from "./actions";

const initialState = {
  recipes: [],
  pagination: [],
  currentPage: 0,
};

//Cuando la aplicación recién inicia, el estado es initialState.
const rootReducer = (state = initialState, action) => {
  //El switch evalúa qué es lo que se debe hacer
  //Y en un principio tiene un caso default que es retornar una copia del estado.
  const itemsPerPage = 9;
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        pagination: action.payload.splice(0, itemsPerPage),
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

    default:
      return { ...state };
  }
};

export default rootReducer;

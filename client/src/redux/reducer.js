//El reducer es una función que recibe el estado a modificar y la action que indica qué tiene que hacer.
import { GET_RECIPES } from "./actions";

const initialState = {
  recipes: [],
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
      };
    default:
      return { ...state };
  }
};

export default rootReducer;

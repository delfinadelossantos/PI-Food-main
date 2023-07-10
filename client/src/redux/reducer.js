//El reducer es una función que recibe el estado a modificar y la action que indica qué tiene que hacer.

const initialState = {};

//Cuando la aplicación recién inicia, el estado es initialState.
const rootReducer = (state = initialState, action) => {
  //El switch evalúa qué es lo que se debe hacer
  //Y en un principio tiene un caso default que es retornar una copia del estado.
  switch (action.type) {
    default:
      return { ...state };
  }
};

export default rootReducer;

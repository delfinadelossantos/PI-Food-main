import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
//thunkMiddleware es quien permite hacer las requests al server,
//operaciones asíncronas que redux por sí solo no puede hacer.
import thunkMiddleware from "redux-thunk";

//El "composeador" del middleware es window. redux devtools en caso de que esté
//instalado, o bien compose de redux.
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//applyMiddleware y compose son funciones de redux que permiten hacerle
//modificaciones al store.

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;

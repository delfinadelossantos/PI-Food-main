//Módulo para buscar data de la api
const axios = require("axios");
const { KEY } = process.env;

const getApiInfo = async () => {
  try {
    //Petición a la api para obtener toda la información
    const getApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&addRecipeInformation=true&number=100`
    );
    //Creación de un conjunto para almacenar las dietas y asegurar que no haya repetidos
    const set = new Set();

    //getApi.data.results contiene las recetas de la api
    //el forEach itera sobre cada receta del array
    //el if verifica que la receta sobre la que se itera tenga la propiedad diets,
    getApi.data.results.forEach((element) => {
      if (element.diets) {
        element.diets.forEach((diet) => {
          set.add(diet);
        });
      }
    });
    //Convierte el set en un array, lo ordena alfabéticamente
    const apiDiets = Array.from(set).sort();
    return apiDiets;
  } catch (error) {
    return { error: "Api request error" };
  }
};

module.exports = getApiInfo;

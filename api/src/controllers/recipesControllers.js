const { Recipe } = require("../db");
const { KEY } = process.env;

const getRecipesController = () => {};

const getRecipeController = () => {};

const createRecipeController = async (
  title,
  image,
  summary,
  healthScore,
  analyzedInstructions,
  diets
) => {
  const newRecipe = await Recipe.create({
    title,
    image,
    summary,
    healthScore,
    analyzedInstructions,
  });
  //Falta agregarle DIETS.
  return newRecipe;
};

module.exports = {
  getRecipesController,
  getRecipeController,
  createRecipeController,
};

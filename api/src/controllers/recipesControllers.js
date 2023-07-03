const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { KEY } = process.env;

const getRecipesController = () => {};

const getRecipeByIdController = async (id) => {
  let recipe;
  if (isNaN(id)) {
    recipe = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
  } else {
    const apiInfo = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY}`
    );
    const result = apiInfo.data;
    let analyzedInstructions =
      result.analyzedInstructions.length === 0
        ? "Sorry, this recipe doesn't contain a step by step guide"
        : result.analyzedInstructions;
    recipe = {
      id: result.id,
      title: result.title,
      image: result.image,
      summary: result.summary,
      healthScore: result.healthScore,
      diets: result.diets,
      analyzedInstructions: analyzedInstructions,
    };
  }
  return recipe;
};

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
  getRecipeByIdController,
  createRecipeController,
};

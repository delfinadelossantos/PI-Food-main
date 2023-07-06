const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { KEY } = process.env;

const getApiRecipes = async () => {
  const apiRecipesRaw = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&addRecipeInformation=true&number=100`
  );

  const allApiRecipes = apiRecipesRaw.data.results.map((recipe) => {
    const diets =
      recipe.diets.length !== 0 ? recipe.diets : "No diets available";
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      healthScore: recipe.healthScore,
      diets: diets,
      createdInDb: false,
    };
  });
  return allApiRecipes;
};

const getRecipesController = async () => {
  const databaseRecipes = await Recipe.findAll();
  const apiRecipes = await getApiRecipes();
  return [...databaseRecipes, ...apiRecipes];
};

const getRecipeByNameController = async (name) => {
  const recipeName = name.toLowerCase();
  const dbResults = await Recipe.findAll({
    where: {
      title: {
        [Op.iLike]: `%${recipeName}%`,
      },
    },
  });
  const apiResults = await getApiRecipes();
  const filteredResults = apiResults.filter((recipe) =>
    recipe.title.toLowerCase().includes(recipeName)
  );
  return [...filteredResults, ...dbResults];
};

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

  newRecipe.addDiet(diets);

  return newRecipe;
};

module.exports = {
  getRecipesController,
  getRecipeByNameController,
  getRecipeByIdController,
  createRecipeController,
};

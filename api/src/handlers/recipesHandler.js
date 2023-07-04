const {
  getRecipesController,
  getRecipeByNameController,
  getRecipeByIdController,
  createRecipeController,
} = require("../controllers/recipesControllers");

const getRecipesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    let response;
    if (name) {
      const recipe = await getRecipeByNameController(name);
      if (recipe.length === 0) {
        response = `Sorry, there are no recipes with the word ${name}`;
      } else {
        response = recipe;
      }
    } else {
      const recipes = await getRecipesController();
      response = recipes;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipeByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await getRecipeByIdController(id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRecipeHandler = async (req, res) => {
  const { title, image, summary, healthScore, analyzedInstructions, diets } =
    req.body;
  try {
    const newRecipe = await createRecipeController(
      title,
      image,
      summary,
      healthScore,
      analyzedInstructions,
      diets
    );
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRecipesHandler,
  getRecipeByIdHandler,
  createRecipeHandler,
};

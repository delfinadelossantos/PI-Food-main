const {
  getRecipesController,
  getRecipeController,
  createRecipeController,
} = require("../controllers/recipesControllers");

const getRecipesHandler = (req, res) => {
  try {
  } catch (error) {}
};

const getRecipeHandler = (req, res) => {
  try {
  } catch (error) {}
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
  getRecipeHandler,
  createRecipeHandler,
};

const {
  getRecipesController,
  getRecipeByIdController,
  createRecipeController,
} = require("../controllers/recipesControllers");

const getRecipesHandler = (req, res) => {
  try {
  } catch (error) {}
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

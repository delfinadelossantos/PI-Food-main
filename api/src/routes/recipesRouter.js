const { Router } = require("express");
const {
  getRecipesHandler,
  getRecipeByIdHandler,
  createRecipeHandler,
} = require("../handlers/recipesHandler");
const validateRecipe = require("../middlewares/index");

const recipesRouter = Router();

//Incluye la ruta por query
recipesRouter.get("/", getRecipesHandler);

recipesRouter.get("/:id", getRecipeByIdHandler);

recipesRouter.post("/", validateRecipe, createRecipeHandler);

module.exports = recipesRouter;

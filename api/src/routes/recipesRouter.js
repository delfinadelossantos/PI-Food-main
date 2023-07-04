const { Router } = require("express");
const {
  getRecipesHandler,
  getRecipeByIdHandler,
  createRecipeHandler,
} = require("../handlers/recipesHandler");

const recipesRouter = Router();

//Incluye búsqueda por query
recipesRouter.get("/", getRecipesHandler);

recipesRouter.get("/:id", getRecipeByIdHandler);

recipesRouter.post("/", createRecipeHandler);

module.exports = recipesRouter;

const { Router } = require("express");
const {
  getRecipesHandler,
  getRecipeByIdHandler,
  createRecipeHandler,
} = require("../handlers/recipesHandler");

const recipesRouter = Router();

recipesRouter.get("/", getRecipesHandler);

recipesRouter.get("/:id", getRecipeByIdHandler);

recipesRouter.post("/", createRecipeHandler);

module.exports = recipesRouter;

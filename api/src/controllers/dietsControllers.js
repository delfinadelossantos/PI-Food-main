const { Diet } = require("../db");

const getDietsController = async () => {
  const allDiets = await Diet.findAll();
  return allDiets;
};

module.exports = { getDietsController };

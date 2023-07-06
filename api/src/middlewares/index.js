//Función para chequear los datos del formulario antes de
//llevarlos a la base de datos

const validateRecipe = (req, res, next) => {
  const { title, image, summary, healthScore, analyzedInstructions, diets } =
    req.body;
  if (!title) res.status(400).json({ error: "missing title" });
  if (!image) res.status(400).json({ error: "missing image" });
  if (!summary) res.status(400).json({ error: "missing summary" });
  if (!healthScore) res.status(400).json({ error: "missing healthScore" });
  if (!analyzedInstructions)
    res.status(400).json({ error: "missing analyzedInstructions" });
  if (!diets) res.status(400).json({ error: "missing diets" });

  // Validar que 'title' contiene solo letras y espacios
  if (!/^[a-zA-Z\s]+$/.test(title)) {
    res
      .status(400)
      .json({ error: "title should only contain letters and spaces" });
    return;
  }

  // Validar que 'healthScore' es un número entero entre 1 y 100
  const healthScoreNumber = parseInt(healthScore);
  if (
    isNaN(healthScoreNumber) ||
    healthScoreNumber < 1 ||
    healthScoreNumber > 100
  ) {
    res
      .status(400)
      .json({ error: "healthScore should be an integer between 1 and 100" });
    return;
  }

  // Si todas las validaciones pasan, continuar
  next();
};

module.exports = validateRecipe;

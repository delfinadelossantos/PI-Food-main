const { Diet } = require("../db");
const getApiInfo = require("./getApiInfo");

//Función para guardar las dietas de la api en la base de datos

const saveToDb = async () => {
  try {
    const diets = await getApiInfo();
    if (diets.error) {
      return diets.error;
    }
    // Mapea los elementos de diets a objetos con la propiedad "name"
    const dietObjects = diets.map((diet) => ({ name: diet }));
    await Diet.bulkCreate(dietObjects);
    return diets;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = saveToDb;

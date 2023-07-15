import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetail } from "../../redux/actions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Detail = () => {
  const dispatch = useDispatch();

  const idObj = useParams();

  const id = idObj.id;

  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, []);

  const detail = useSelector((state) => state.detail);

  if (!detail.data) {
    return <div>Loading...</div>; // Espera a que el estado global se actualice con la información de detail
  }

  const recipe = detail.data;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <h3>Id: {recipe.id}</h3>
      <img src={recipe.image} alt="Dish" />
      <h3>Summary: {recipe.summary}</h3>
      <h3>
        Step by Step:{" "}
        {recipe.analyzedInstructions[0].steps.map((instruction) => (
          <p key={instruction.number}>{instruction.step}</p>
        ))}
      </h3>
      <h3>HealthScore: {recipe.healthScore}</h3>
      <h3>
        Diet Types:{" "}
        {recipe.diets.map((diet, index) => (
          <p key={index}>{diet}</p>
        ))}
      </h3>
    </div>
  );
};

export default Detail;

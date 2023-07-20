import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getRecipeDetail } from "../../redux/actions";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./detail.css";

const Detail = () => {
  const dispatch = useDispatch();

  //Hook que permite acceder al parámetro dinámico de la URL.
  const idObj = useParams();

  const id = idObj.id;

  //Este useEffect tiene representadas las 3 fases del ciclo de vida
  //Cuando el componente se monta, hace dispatch de la action. (componentDidMount)
  //La action obtiene el id de useParams.
  useEffect(() => {
    dispatch(getRecipeDetail(id));

    //Función callback que se ejecuta cuando el componente se desmonta para
    //que el estado global quede con un objeto vacío en el detalle. (componentWillUnmount)
    return () => {
      dispatch(cleanDetail());
    };
    //Si el componente se actualiza por cambio en la variable del array de
    //dependencias. (componentDidUpdate)
  }, [id]);

  const detail = useSelector((state) => state.detail);

  if (!detail.data) {
    return <div>Loading...</div>; // Espera a que el estado global se actualice con la información de detail
  }

  const recipe = detail.data;

  //Éste código soluciona una inconsistencia en los datos entre bd y api
  let dietTemp;

  let isArrayOfObjects = false;
  //Proveniente de la base de datos, creado por form
  let tryToDefine = recipe["Diets"];
  if (tryToDefine !== undefined) {
    dietTemp = recipe["Diets"];
    isArrayOfObjects = true;
  } else {
    //Proveniente de la API
    tryToDefine = recipe["diets"];
    if (tryToDefine !== undefined) {
      dietTemp = recipe["diets"];
    }
  }

  //Esta función adapta los datos del formato.
  //Si es una receta de la api, diets es un array. Si es creada en form,
  //es un array de objetos.
  let dietTempArray = [];
  if (isArrayOfObjects) {
    let i = 0;
    dietTemp.forEach((element) => {
      dietTempArray[i++] = element.name;
    });
    dietTemp = dietTempArray;
  }

  return (
    <div className="detail-thing">
      <h1>{recipe.title}</h1>
      <h3>Id: {recipe.id}</h3>
      <img src={recipe.image} alt="Dish" />
      <h4>Summary: </h4>
      <p>{recipe.summary.replace(/(&nbsp;|<([^>]+)>)/gi, "")}</p>
      <br />
      <hr />
      <h4>Step by Step:</h4>
      {Array.isArray(recipe.analyzedInstructions) ? (
        recipe.analyzedInstructions[0].steps.map((instruction) => (
          <p key={instruction.number}>{instruction.step}</p>
        ))
      ) : (
        <p key="0">{recipe.analyzedInstructions}</p>
      )}
      <br />
      <hr />
      <h4>HealthScore: {recipe.healthScore}</h4>
      <hr />
      <h4>Diet Types:</h4>
      <ul>
        {dietTemp.map((diet, index) => (
          <li key={index}>{diet}</li>
        ))}
      </ul>
    </div>
  );
};

export default Detail;

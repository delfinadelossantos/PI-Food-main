import React, { useEffect } from "react";
import "./form.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets } from "../../redux/actions";

const Form = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, []);

  //Subscripción al estado global para acceder a las diets una vez despachada la action
  const dietTypes = useSelector((state) => state.diets);

  //form es el contenedor de información y setForm el modificador de la información
  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: 1,
    analyzedInstructions: "",
    image: "",
    diets: [],
  });

  const [errors, setErrors] = useState({
    title: "The title is required",
    summary: "The summary is required",
    healthScore: "The healthScore is required",
    analyzedInstructions: "The step-by-step guide is required",
    image: "The image is required",
    diets: "Please choose at least one diet",
  });

  const validate = (form, name) => {
    const lettersRegex = /^[\p{L}\s]+$/u; // Expresión regular para validar palabra sin números ni caracteres especiales
    const numberRegex = /^[0-9]+$/;

    if (name === "title") {
      if (form.name !== "") {
        setErrors({ ...errors, title: "" });
      } else {
        setErrors({ ...errors, title: "The title is required" });
      }

      if (lettersRegex.test(form.title)) {
        setErrors({ ...errors, title: "" });
      } else {
        setErrors({ ...errors, title: "The title must contain letters only" });
      }

      if (form.title.length > 40) {
        setErrors({ ...errors, title: "The title is too long" });
      } else {
        setErrors({ ...errors, title: "" });
      }
    }

    if (name === "summary") {
      if (form.summary !== "") {
        setErrors({ ...errors, summary: "" });
      } else {
        setErrors({ ...errors, summary: "The summary is required" });
      }
    }

    if (name === "healthScore") {
      if (form.healthScore !== "") {
        if (numberRegex.test(form.healthScore)) {
          form.healthScore = parseInt(form.healthScore);
          setErrors({ ...errors, healthScore: "" });
        } else {
          setErrors({
            ...errors,
            summary: "HealthScore must be a number between 1 and 100",
          });
        }
      }
    }

    if (name === "analyzedInstructions") {
      if (form.analyzedInstructions !== "")
        setErrors({ ...errors, analyzedInstructions: "" });
      else
        setErrors({
          ...errors,
          analyzedInstructions: "The step-by-step guide is required",
        });
      if (form.analyzedInstructions.length < 40)
        setErrors({
          ...errors,
          analyzedInstructions: "The step-by-step guide is too short",
        });
      else setErrors({ ...errors, analyzedInstructions: "" });
    }

    if (name === "image") {
      if (form.image !== "") setErrors({ ...errors, image: "" });
      else setErrors({ ...errors, image: "The image is required" });
    }

    if (name === "diets") {
      if (form.diets.length >= 1) setErrors({ ...errors, diets: "" });
      else setErrors({ ...errors, diets: "Please choose at least one diet" });
    }
  };

  //Recorre el estado local de errores y chequea todas las propiedades para ver si hay errores.
  //Si hay un error, el botón de submit queda deshabilitado.
  const buttonDisabled = () => {
    //Por default está deshabilitado el botón de submit
    let disabled = true;
    //Recorre el objeto errors, por cada uno chequea si hay un error
    for (let error in errors) {
      if (errors[error] === "") disabled = false;
      else {
        disabled = true; //Si encuentra un error, disabled se mantiene y corta la ejecución del for in.
        break;
      }
    }
    return disabled;
  };

  //El input debe ser el reflejo del estado. Al cambiar cualquier dato en el input,
  //es necesario que se ejecute una función que cambie el estado, para que los cambios se vean reflejados.
  const handleChange = (event) => {
    //Esta función lee los inputs y pasa su data al Estado.
    //event.target indica qué input disparó el evento.
    // Extrae el nombre y el valor del campo que disparó el evento.
    const { name, value } = event.target;
    // Se comprueba si el nombre del campo es "diets". Si es asi se maneja de manera especial.
    if (name === "diets") {
      // Para un input de selección múltiple, event.target.selectedOptions es un objeto de opciones seleccionadas
      // Se convierte en un array y luego se mapea para extraer los valores.
      const multipleValues = [...event.target.selectedOptions].map(
        (option) => option.value
      );
      //La función validadora recibe lo mismo que se le pasa al setForm como primer argumento
      //Una vez que tenga los valores, necesito modificar el estado en aquella
      //propiedad que se haya cambiado con el valor indicado
      // Ejecución de la función de validación y actualización del estado del formulario
      validate({ ...form, [name]: multipleValues }, name);
      setForm({ ...form, [name]: multipleValues });
    } else {
      // Para todos los demás campos del formulario
      validate({ ...form, [name]: value }, name);
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createRecipe(form));

    // Limpiar el formulario
    // const f = event.target;
    // let i = 0;
    // while (i < 15) {
    //   let cursor = f[i];
    //   if (cursor.checked !== null) {
    //     f[i].checked = false;
    //   }

    //   f[i].value = "";

    //   i++;
    // }
  };

  return (
    <div>
      <h1>New Recipe</h1>
      <div className="form-cont">
        <form onSubmit={handleSubmit}>
          <div className="form-inputs-cont">
            <div className="form-input-cont">
              <label>Title: </label>
              <input name="title" onChange={handleChange} type="text" />
            </div>
            <p className="form-p">{errors.title}</p>

            <div className="form-input-cont">
              <label>Summary: </label>
              <textarea
                name="summary"
                onChange={handleChange}
                rows={2}></textarea>
            </div>
            <p className="form-p">{errors.summary}</p>

            <div className="form-input-cont">
              <label>healthScore:&nbsp; </label>
              <input name="healthScore" onChange={handleChange} type="text" />
            </div>
            <p className="form-p">{errors.healthScore}</p>

            <div className="form-input-cont">
              <label>Step by Step:&nbsp; </label>
              <textarea
                name="analyzedInstructions"
                onChange={handleChange}
                rows={4}></textarea>
            </div>
            <p className="form-p">{errors.analyzedInstructions}</p>

            <div className="form-input-cont">
              <label>Select Associated Diets: </label>
              <select
                value={form.diets}
                onChange={handleChange}
                name="diets"
                multiple>
                {dietTypes.map((diet) => (
                  <option key={diet.id} value={diet.name}>
                    {diet.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="form-p">{errors.diets}</p>
            <h4>Diets selected: {form.diets}</h4>

            <div className="form-input-cont">
              <label>Image: </label>
              <input name="image" onChange={handleChange} type="text" />
            </div>
            <p className="form-p">{errors.image}</p>
            <button disabled={buttonDisabled()} type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

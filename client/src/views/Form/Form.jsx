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
    //diets: [],
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
  };

  //Recorre el estado local de errores y chequea todas las propiedades para ver si hay errores.
  //Si hay un error, el botón de submit queda deshabilitado.
  const buttonDisabled = () => {
    //Por default está deshabilitado el botón de submit
    let disabled = true;
    //Recorre el objeto errors, por cada uno chequea si hay un error
    console.log(errors);
    for (let error in errors) {
      if (errors[error] === "") disabled = false;
      else {
        disabled = true; //Si encuentra un error, disabled se mantiene y corta la ejecución del for in.
        break;
      }
    }
    return disabled;
  };

  const handleDietTypesChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;

    if (name === "diets") {
      setForm((prevState) => ({
        ...prevState,
        diets: value
          ? [...prevState.diets, event.target.value]
          : prevState.diets.filter((diet) => diet !== event.target.value),
      }));
    } else {
      validate({ ...form, [name]: value }, name);
      setForm({ ...form, [name]: value });
    }
  };

  //El input debe ser el reflejo del estado. Al cambiar cualquier dato en el input,
  //es necesario que se ejecute una función que cambie el estado, para que los cambios se vean reflejados.
  const handleChange = (event) => {
    //Esta función lee los inputs y pasa su data al Estado.
    //event.target indica qué input disparó el evento.

    //La función validadora recibe lo mismo que se le pasa al setForm como primer argumento
    validate(
      { ...form, [event.target.name]: event.target.value },
      event.target.name
    );

    //Una vez que tenga los valores, necesito modificar el estado en aquella
    //propiedad que se haya cambiado con el valor indicado
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createRecipe(form));
  };

  return (
    <div>
      <h1>Form</h1>
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
              <input name="summary" onChange={handleChange} type="text" />
            </div>
            <p className="form-p">{errors.summary}</p>
            <div className="form-input-cont">
              <label>healthScore:&nbsp; </label>
              <input name="healthScore" onChange={handleChange} type="text" />
            </div>
            <p className="form-p">{errors.healthScore}</p>
            <div className="form-input-cont">
              <label>Step by Step:&nbsp; </label>
              <input
                name="analyzedInstructions"
                onChange={handleChange}
                type="text"
              />
            </div>
            <p className="form-p">{errors.analyzedInstructions}</p>
            <div className="form-input-cont">
              <label>Associated Diets: </label>
              {console.log(dietTypes)}
              {dietTypes.map((diet, index) => (
                <div key={index}>
                  <input
                    id={diet.id}
                    name="diets"
                    type="checkbox"
                    value={diet.name}
                    onChange={handleDietTypesChange}
                  />
                  <label htmlFor={diet.name}>{diet.name}</label>
                </div>
              ))}
            </div>
            <div className="form-input-cont">
              <label>Image: </label>
              <input name="image" onChange={handleChange} type="text" />
            </div>
            <p className="form-p">{errors.image}</p>
            <input disabled={buttonDisabled()} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

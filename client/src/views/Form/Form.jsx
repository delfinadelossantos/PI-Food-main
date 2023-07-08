import React from "react";
import "./form.css";
import { useState } from "react";

const Form = () => {
  //form es el contenedor de información y setForm el modificador de la información
  const [form, setForm] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    analyzedInstructions: "",
    image: "",
    diets: [],
  });

  const [errors, setErrors] = useState({
    title: "The title is required",
    summary: "The summary is required",
    healthScore: 0,
    analyzedInstructions: "The step-by-step guide is required",
    image: "The image is required",
    diets: [],
  });

  const validate = (input, name) => {
    if (name === "title") {
    }

    if (name === "summary") {
    }

    if (name === "healthScore") {
    }

    if (name === "analyzedInstructions") {
    }

    if (name === "image") {
    }
  };
  //El input debe ser el reflejo del estado. Al cambiar cualquier dato en el input,
  //es necesario que se ejecute una función que cambie el estado, para que los cambios se vean reflejados.
  const handleChange = (event) => {
    //Esta función lee los inputs y pasa su data al Estado.
    //event.target indica qué input disparó el evento.

    //Una vez que tenga los valores, necesito modificar el estado en aquella
    //propiedad que se haya cambiado con el valor indicado
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Form</h1>
      <div className="form-cont">
        <form>
          <div className="form-input-cont">
            <label>Title: </label>
            <input name="title" onChange={handleChange} type="text" />
          </div>
          <div className="form-input-cont">
            <label>Summary: </label>
            <input name="summary" onChange={handleChange} type="text" />
          </div>
          <div className="form-input-cont">
            <label>healthScore: </label>
            <input name="healthScore" onChange={handleChange} type="text" />
          </div>
          <div className="form-input-cont">
            <label>Step by Step: </label>
            <input
              name="analyzedInstructions"
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="form-input-cont">
            <label>Image: </label>
            <input name="image" onChange={handleChange} type="text" />
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Form;

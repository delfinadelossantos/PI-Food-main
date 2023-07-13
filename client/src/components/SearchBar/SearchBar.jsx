import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipe } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleInput = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchRecipe(name));
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={name}
          placeholder="Search recipe..."
          onChange={handleInput}
        />
        <button type="submit" onClick={handleSubmit}>
          SEARCH
        </button>
      </div>
    </>
  );
};

export default SearchBar;

import React, { useState,useCallback } from "react";

const AutoComplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleInput = useCallback(
    (e) => {
      const inputValue = e.target.value;
      setInputValue(inputValue);
      if (inputValue.length > 2) {
        axios
          .get(`https://api.example.com/suggestions?value=${inputValue}`)
          .then((response) => {
            setSuggestions(response.data);
          })
          .catch((error) => {
            console.error("Error fetching suggestions:", error);
          });
      }
    },
    [inputValue]
  );

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search for a place"
          className="search-input"
          onChange={handleInput}
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="suggestion-item">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AutoComplete;

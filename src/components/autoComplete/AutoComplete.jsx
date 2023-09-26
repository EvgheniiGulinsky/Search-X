import React, { useState, useEffect } from "react";
import "./AutoComplete.css";
import { getHistory, removeFromHistory } from "../../utils";

const AutoComplete = ({ data, query, handleSelectSuggestion }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);

  const updateHistory = () => setHistory(getHistory());

  useEffect(() => {
    updateHistory();
  }, []);

  useEffect(() => {
    const filterSuggestions = () => {
      const filteredData = data.filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase())
      );
      return filteredData.sort((a, b) => a.title.length - b.title.length);
    };

    const filteredSuggestions = filterSuggestions();
    setSuggestions(filteredSuggestions.slice(0, 10));
  }, [data, query]);

  const handleAddClick = (title) => {
    handleSelectSuggestion(title);
    updateHistory();
  };

  const handleRemoveClick = (e, title) => {
    e.stopPropagation();
    removeFromHistory(title);
    updateHistory();
  };

  if (query.length > 0) {
    return (
      <div className="suggestions">
        {suggestions.map((suggestion) => (
          <div
            className={
              "suggestion" +
              (history.includes(suggestion.title) ? " visited" : "")
            }
            key={suggestion.title}
            onClick={() => {
              handleAddClick(suggestion.title);
            }}
          >
            {suggestion.title}

            <div
              className="remove"
              onClick={(e) => {
                handleRemoveClick(e, suggestion.title);
              }}
            >
              {history.includes(suggestion.title) && "remove"}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default AutoComplete;

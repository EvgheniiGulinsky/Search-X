import React, { useState, useRef, useEffect } from "react";
import "./Search.css";
import AutoComplete from "../autoComplete/AutoComplete";
import fakeData from "../../db/fakeData.json";
import Results from "../results/Results";
import { saveToHistory, waitForRandomTime } from "../../utils/index";

const Search = () => {
  const inputRef = useRef(null);
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [query, setQuery] = useState("");
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    setData(fakeData);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowAutoComplete(true);
  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    saveToHistory(selectedSuggestion);
    setQuery(selectedSuggestion);
    handleSearch(selectedSuggestion);
  };

  const handleSearch = (selectedQuery) => {
    if (selectedQuery === "") {
      setSearchResults(null);
    } else {
      const startTime = Date.now();
      const results = data.filter((item) =>
        item.title.includes(selectedQuery.toLowerCase())
      );
      setSearchResults(results);
      saveToHistory(query);
      setShowAutoComplete(false);
      waitForRandomTime(() => {
        const endTime = Date.now();
        setDuration((endTime - startTime) / 1000);
      });
    }
  };

  const handleMouseDown = (e) => {
    if (
      e.target !== inputRef.current &&
      !e.target.classList.contains("remove") &&
      !e.target.classList.contains("suggestion")
    ) {
      setShowAutoComplete(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.body.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div className="container">
      <h2>SearchX</h2>
      <input
        type="text"
        className="search"
        ref={inputRef}
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowAutoComplete(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(query);
          }
        }}
      />

      {showAutoComplete && (
        <AutoComplete
          data={data}
          query={query}
          handleSelectSuggestion={handleSelectSuggestion}
        />
      )}

      {searchResults && <Results results={searchResults} duration={duration} />}
    </div>
  );
};

export default Search;

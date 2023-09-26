import React from "react";
import "./Results.css";

const Results = ({ results, duration }) => {
  return (
    <div className="results">
      {results.length} Results
      {duration && `, ${duration} seconds`}
      {results.map((result) => (
        <div className="result" key={result.title}>
          <a href={result.link} target="_blank" rel="noreferrer">
            {result.title}
          </a>
          <div>{result.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Results;

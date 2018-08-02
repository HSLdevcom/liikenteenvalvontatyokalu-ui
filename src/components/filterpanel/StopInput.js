import React from "react";
import SuggestionInput from "./SuggestionInput";
import fuzzySearch from "../../helpers/fuzzySearch";
import orderBy from "lodash/orderBy";
import intersection from "lodash/intersection";
import uniq from "lodash/uniq";

const getSuggestionValue = (suggestion) =>
  suggestion.stopId ? `${suggestion.shortId} (${suggestion.stopId})` : "";

const renderSuggestion = (suggestion) => (
  <span className="suggestion-content">
    <div className="suggestion-text">{getSuggestionValue(suggestion)}</div>
  </span>
);

const suggestionFitness = (inputValue) => (stop) => {
  const inputArr = inputValue.match(/[\d]/g).filter((char) => char !== " ");
  const stopIdArr = (stop.shortId + stop.stopId).match(/[\d]/g);

  const fitnessScore = inputArr.reduce((score, val, index) => {
    const foundIndex = stopIdArr.indexOf(val, index);
    return score + (foundIndex - index);
  }, 0);

  return fitnessScore;
};

const getSuggestions = (stops = []) => (value = "") => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  const suggestionStops =
    inputLength === 0 || stops.length === 0
      ? stops
      : stops.filter((item) =>
          fuzzySearch(inputValue, (item.shortId + item.stopId).match(/\d/g).join(""))
        );

  return orderBy(
    suggestionStops.slice(0, 100),
    inputValue ? suggestionFitness(inputValue) : "stopId"
  );
};

export default ({stops, onSelect, stop}) => {
  return (
    <SuggestionInput
      minimumInput={0}
      placeholder="Hae pysäkkiä..."
      value={getSuggestionValue(stop)}
      onSelect={onSelect}
      getValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      getSuggestions={getSuggestions(stops)}
    />
  );
};

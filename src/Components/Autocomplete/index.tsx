import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { apiKey } from "../../config";

export const AutoComplete = () => (
  <div>

    <GooglePlacesAutocomplete
      debounce={800}
      apiKey={apiKey}
      // onSelect={handleAddress}
      // renderSuggestions={(active, suggestions, onSelectSuggestion) => (
      //   <div className="suggestions-container">
      //     {suggestions.map((suggestion) => (
      //       <div
      //         className="suggestion"
      //         onClick={(event) => onSelectSuggestion(suggestion, event)}
      //       >
      //         {suggestion.description}
      //       </div>
      //     ))}
      //   </div>
      // )}
    />
  </div>
);

export default AutoComplete;

import React, { useRef, useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { PlaceType, Props } from "./props";
import { fetchAutocomplete } from "../../api";
import { fetchPlaces, fetchPlacesSuccess } from "../../redux/actions";
import { useDispatch } from "react-redux";
import store from "../../configureStore";

const autocompleteService = { current: null };

export const AutoComplete: React.FC<Props> = (props) => {
  const { isLoaded } = props;
  const [value, setValue] = useState<PlaceType | null | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const loaded = useRef(false);
  const dispatch = useDispatch();

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-map-script")) {
    }
    console.log("loading", isLoaded);
    loaded.current = true;
  }

  const onChange = (newValue?: PlaceType | null) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
    dispatch(
      fetchPlacesSuccess({
        description: newValue?.description,
        place_id: newValue?.place_id,
      })
    );
  };

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchAutocomplete(
      autocompleteService?.current,
      { input: inputValue },
      (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];

          if (value) {
            newOptions = [value];
            console.log("line 69", newOptions);
          }

          if (results) {
            console.log("line 73", results);
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      }
    );

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchAutocomplete]);

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: "50%" }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option?.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event?: any, newValue?: PlaceType | null) =>
        onChange(newValue)
      }
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search location" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default AutoComplete;

/* <GooglePlacesAutocomplete
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
  </div> */

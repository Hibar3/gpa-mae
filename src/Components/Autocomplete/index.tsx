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
import { fetchPlacesSuccess } from "../../redux/actions";
import { useDispatch } from "react-redux";
import store from "../../configureStore";
import SearchList from "../SearchList";

export const AutoComplete: React.FC<Props> = (props) => {
  const { isLoaded, value, options, onChange, onInputChange } = props;

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
        onInputChange(newInputValue);
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
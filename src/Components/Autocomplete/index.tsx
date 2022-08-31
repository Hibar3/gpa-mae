import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { Props } from "./props";
import { PlaceType } from "../../common/types";
import map from "lodash/map";

export const AutoComplete: React.FC<Props> = (props) => {
  //===========VARIABLE
  const { isLoaded, value, options, onChange, onInputChange } = props;

  //===========OPTIONS
  const renderOptions = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: PlaceType
  ) => {
    const matches = option?.structured_formatting?.main_text_matched_substrings;
    const parts = parse(
      option?.structured_formatting?.main_text,
      map(matches, (match) => [match?.offset, match?.offset + match?.length])
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
  };

  //===========VIEW
  return (
    <Autocomplete
      id="google-place-autocomplete"
      sx={{ width: "100%" }}
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
      renderOption={renderOptions}
    />
  );
};

export default AutoComplete;

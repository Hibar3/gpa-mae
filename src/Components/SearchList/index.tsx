import React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import map from "lodash/map";
import filter from "lodash/filter";
import { Props } from "./props";
import { PlaceType } from "./props";

export const SearchList: React.FC<Props> = (props) => {
  //===========VARIABLES
  const { places, onPressAddress } = props;

  // remove  undefined values
  const filterPlaces = filter(places, (res) => {
    if (res?.description !== undefined) return res;
  });

  //===========VIEW
  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <Divider />
      <nav aria-label="secondary mailbox folders">
        {map(filterPlaces, (i: PlaceType, index) => (
          <ListItem disablePadding key={`${i?.place_id}${index}`}>
            <ListItemButton
              onClick={() => onPressAddress(i?.place_id || "")}
              sx={{
                flex: 1,
                width: "100%",
                bgcolor: "background.paper",
                "&:hover": {
                  color: "black",
                  backgroundColor: "#FFCC00",
                },
              }}
            >
              <ListItemText primary={i?.description} />
            </ListItemButton>
          </ListItem>
        ))}
      </nav>
    </Box>
  );
};

export default SearchList;

import React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import map from "lodash/map";
import filter from "lodash/filter";
import { Props } from "./props";
import { PlaceType } from "../Autocomplete/props";

export const SearchList: React.FC<Props> = (props) => {
  const { places } = props;
  // remove  undefined values
  const filterPlaces = filter(places, (res) => {
    if (res?.description !== undefined) return res;
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        {map(filterPlaces, (i: PlaceType) => (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={i?.description} />
            </ListItemButton>
          </ListItem>
        ))}
      </nav>
    </Box>
  );
};

export default SearchList;

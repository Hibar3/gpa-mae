import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Props } from "./props";
import { styles } from "./style";

export const Header: React.FC<Props> = (props) => {
  const { title } = props;

  //===========VIEW
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={styles.appbar}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={styles.title}>
            {`${title || "Maybank"}`}
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

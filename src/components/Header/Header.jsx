import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Help } from "@material-ui/icons";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  useMediaQuery,
  Tooltip,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles.js";

const Header = ({ onLoad, onPlaceChanged }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        {isDesktop ? (
          <Typography variant="subtitle1">
            (If the Maps are not working, It's propable because of the API key.
            In such case please contact me bharateeshd@gmail.com)
          </Typography>
        ) : (
          <Tooltip
            title="If the Maps are not working, It's propable because of the API key.
          In such case please contact me bharateeshd@gmail.com"
          >
            <Help />
          </Tooltip>
        )}
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

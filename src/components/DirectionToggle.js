import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Fab } from "@material-ui/core";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 32,
    right: 32,
    zIndex: theme.zIndex.drawer - 100,
  },
}));

function DirectionToggle({ direction, onToggle }) {
  const classes = useStyles();

  return (
    <Tooltip title="Select all" placement="left-start">
      <Fab
        className={classes.fab}
        style={{
          background: "linear-gradient(to right, #D50000, #8C9EFF)",
          color: "white",
        }}
        onClick={onToggle}
        size="small"
      >
        <DoneAllIcon />
      </Fab>
    </Tooltip>
  );
}

DirectionToggle.propTypes = {
  direction: PropTypes.string,
  onToggle: PropTypes.func,
};

export default DirectionToggle;

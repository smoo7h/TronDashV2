import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, Typography, Avatar, LinearProgress } from "@material-ui/core";

import UserIcon from "@material-ui/icons/People";
import gradients from "src/utils/gradients";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  content: {
    flexGrow: 1
  },
  details: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  },
  progress: {
    margin: theme.spacing(0, 1),
    flexGrow: 1
  },
  avatar: {
    backgroundImage: gradients.orange,
    height: 48,
    width: 48
  }
}));

function NumberOfPlayers({ className, numberOfusers, ...rest }) {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div className={classes.content}>
        <Typography component="h3" gutterBottom variant="overline">
          Number Of Recent Users
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">{numberOfusers}</Typography>
          {/*
          <LinearProgress
            className={classes.progress}
            value={numberOfusers}
            variant="determinate"
          />
           */}
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <UserIcon />
      </Avatar>
    </Card>
  );
}

NumberOfPlayers.propTypes = {
  className: PropTypes.string
};

export default NumberOfPlayers;

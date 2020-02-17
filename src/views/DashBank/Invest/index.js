import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import TextField from "@material-ui/core/TextField";
import gradients from "src/utils/gradients";
import Chart from "./Chart";

const useStyles = makeStyles(theme => ({
  root: {
    //  backgroundImage: gradients.indigo,
    color: theme.palette.primary.contrastText
  },
  content: {
    paddingTop: 0
  },
  noPadBottom: {
    paddingBottom: 0
  },
  itemDivider: {
    borderBottomColor: "rgba(255,255,255,0.2)"
  },
  actions: {
    paddingTop: 0,
    justifyContent: "flex-end"
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(1)
  },
  margin2: {
    //  margin: theme.spacing(1),
    paddingLeft: theme.spacing(6)
  },
  marginheader: {
    //  margin: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  }
}));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Invest({ className, dappData, ...rest }) {
  const classes = useStyles();

  const [calculatedAmount, setcalculatedAmount] = useState(0);

  const handleChange = event => {
    //we need to calculate their input value

    setcalculatedAmount(event.target.value * dappData.CurrentSellPrice);
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        //className={classes.marginheader}
        subheader="Deposit Tokens Into Contract"
        subheaderTypographyProps={{ color: "inherit" }}
        title="Invest"
        titleTypographyProps={{ color: "inherit" }}
      />
      <CardContent className={classes.content}>
        <List>
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"investbuy2"}
          >
            <ListItemText
              primary="Amount"
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
              className={classes.noPadBottom}
            />
            <TextField
              //  fullWidth
              type="number"
              className={classes.margin2}
              id="input-with-icon-textfield"
              // label="Amount"
              onChange={handleChange}
              inputProps={{
                style: { textAlign: "right" }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">trx</InputAdornment>
                )
              }}
            />
          </ListItem>
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"investbuy"}
          >
            <ListItemText
              primary="Price"
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">
              {dappData.CurrentBuyPrice} {dappData.BuyPrice.Currency}
            </Typography>
          </ListItem>
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"totalbuy"}
          >
            <ListItemText
              primary="total"
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">{calculatedAmount}</Typography>
          </ListItem>
        </List>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button variant="contained" size="small" color="primary">
          Invest
        </Button>
      </CardActions>
    </Card>
  );
}

Invest.propTypes = {
  className: PropTypes.string
};

export default Invest;

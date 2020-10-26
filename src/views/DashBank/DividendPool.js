import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, Typography, Avatar, colors } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Label from "src/components/Label";
import gradients from "src/utils/gradients";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  label: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    // backgroundImage: gradients.green,
    //   border: `2px solid ${theme.palette.common.white}`,
    height: 48,
    width: 48,
    // backgroundColor: theme.palette.common.white
  },
}));

function DividendPool({ className, dappData, ...rest }) {
  const classes = useStyles();
  const data = {
    value: "24,000",
    difference: "+4.5%",
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div>
        <Typography component="h3" gutterBottom variant="overline">
          Dividend Pool
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">
            {dappData.CurrentDivPool
              ? Number(dappData.CurrentDivPool.toFixed(0)).toLocaleString()
              : "0"}
            {` `}
            {dappData.DivPool.Currency}
          </Typography>
          {/* 
          <Label
            className={classes.label}
            color={colors.green[600]}
            variant="outlined"
          >
            {data.difference}
          </Label>
          */}
        </div>
      </div>
      {dappData.Invest.Currency == "trx" && (
        <Avatar
          className={classes.avatar}
          src={"https://www.coinopsy.com/media/img/quality_logo/tron-trx.png"}
        ></Avatar>
      )}
      {dappData.Invest.Currency != "trx" && (
        <Avatar className={classes.avatar} src={dappData.ImageURL}></Avatar>
      )}
    </Card>
  );
}

DividendPool.propTypes = {
  className: PropTypes.string,
  //  divamount: PropTypes.string
};

export default DividendPool;

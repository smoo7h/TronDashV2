import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { ExecuteContract } from "../../../utils/ContractFunctions";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import gradients from "src/utils/gradients";
import Chart from "./Chart";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: gradients.indigo,
    color: theme.palette.primary.contrastText
  },
  content: {
    paddingTop: 0
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

  avatar: {
    border: `2px solid ${theme.palette.common.white}`,
    height: 120,
    width: 120,
    backgroundColor: theme.palette.common.white
    //   top: -60,
    //  left: theme.spacing(3),
    //  right: theme.spacing(3)
    // position: "absolute"
  }
}));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DappInfo({ className, dappData, ...rest }) {
  const classes = useStyles();
  const [creationDate, setcreationDate] = useState(0);

  const handleReinvest = (event, id) => {
    //get selected object and execute the reinvest command
    if (dappData.CurrentUserDivs > 0) {
      ExecuteContract(
        dappData.ReInvest.ContractAddress,
        dappData.ReInvest.ContractFunctionSelector,
        dappData.ReInvest.ContractParameter
          ? dappData.ReInvest.ContractParameter
          : ""
      );
    }
  };

  const handleWithdrawl = (event, id) => {
    //get selected object and execute the Withdraw command
    if (dappData.CurrentUserDivs > 0) {
      ExecuteContract(
        dappData.WithDrawl.ContractAddress,
        dappData.WithDrawl.ContractFunctionSelector,
        dappData.WithDrawl.ContractParameter
          ? dappData.WithDrawl.ContractParameter
          : ""
      );
    }
  };

  const fetchNumberOfTransactions = address => {
    if (address) {
      let currentuseraddress = window.tronWeb.defaultAddress.base58;
      if (window.tronWeb) {
        axios
          .get("https://apilist.tronscan.org/api/contract?contract=" + address)
          .then(response => {
            let creationdate = new Date(response.data.data[0].date_created);

            setcreationDate(creationdate.toLocaleDateString());
          })
          .catch(error => {
            console.error("Error during service worker registration:", error);
          });
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchData = () => {
      if (mounted) {
        fetchNumberOfTransactions(dappData.ContractAddress);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subheader={dappData.CompanyName}
        subheaderTypographyProps={{ color: "inherit" }}
        title={dappData.Name}
        titleTypographyProps={{ color: "inherit" }}
      />

      <CardContent className={classes.content}>
        <Box display="flex">
          <Box m="auto">
            <Avatar
              alt="Person"
              className={classes.avatar}
              src={dappData.ImageURL}
            />
          </Box>
        </Box>

        <List>
          <Box display="flex">
            <Box m="auto">
              <ListItem
                classes={{ divider: classes.itemDivider }}
                // divider
                key={"mystats"}
              >
                <ListItemText
                  primary={"My Stats"}
                  primaryTypographyProps={{
                    color: "inherit",
                    variant: "body1"
                  }}
                />
              </ListItem>
            </Box>
          </Box>

          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"Invested"}
          >
            <ListItemText
              primary={"Invested"}
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">
              {dappData.CurrentUserInvestment
                ? Number(
                    dappData.CurrentUserInvestment.toFixed(0)
                  ).toLocaleString()
                : "0"}
              {` `}
              {dappData.DivPool.Currency}
            </Typography>
          </ListItem>

          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"wallet"}
          >
            <ListItemText
              primary={"Wallet"}
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">
              {"0"} {` `}
              {dappData.DivPool.Currency}
            </Typography>
          </ListItem>
          {/* 
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"TotalWithdrawn"}
          >
            <ListItemText
              primary={"Total Withdrawn"}
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">
              {"2,222"}
              {` `}
              {"trx"}
            </Typography>
          </ListItem>
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"TotalReinvest"}
          >
            <ListItemText
              primary={"Total Reinvest"}
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">
              {"23,222"}
              {` `}
              {"trx"}
            </Typography>
          </ListItem>
          */}
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"TotalRefferals"}
          >
            <ListItemText
              primary={"My Refferals"}
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">
              {"0"}
              {` `}
              {dappData.DivPool.Currency}
            </Typography>
          </ListItem>

          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"MyDividends"}
          >
            <ListItemText
              primary={"My Dividends"}
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">
              {dappData.CurrentUserDivs
                ? Number(dappData.CurrentUserDivs)
                    .toFixed(2)
                    .toLocaleString()
                : "0"}
              {` `}
              {dappData.UserDividend.Currency}
            </Typography>
          </ListItem>
        </List>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          onClick={handleReinvest}
          variant="contained"
        >
          Reinvest
        </Button>
        <Button
          color="primary"
          onClick={handleWithdrawl}
          size="small"
          variant="contained"
        >
          Withdraw
        </Button>
      </CardActions>
    </Card>
  );
}

DappInfo.propTypes = {
  className: PropTypes.string
};

export default DappInfo;

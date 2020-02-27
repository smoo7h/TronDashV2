import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import gradients from "src/utils/gradients";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import getInitials from "src/utils/getInitials";
import Label from "src/components/Label";
import GenericMoreButton from "src/components/GenericMoreButton";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 900
  },
  author: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  labelred: {
    backgroundImage: gradients.red
  },
  labelgreen: {
    backgroundImage: gradients.green
  },
  tags: {
    "& > * + *": {
      marginLeft: theme.spacing(1)
    }
  },
  actions: {
    justifyContent: "flex-end"
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1)
  },
  header: {
    backgroundColor: "#212121"
  }
}));

function LatestProjects({ className, dappData, ...rest }) {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [loadcount, setloadcount] = useState(0);

  useEffect(() => {
    let mounted = true;

    setloadcount(loadcount + 1);
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchProjects = (
      contactAddress,
      eventName,
      transactiontype,
      color,
      amountQualifier,
      decimalplaces
    ) => {
      axios
        .get(
          "https://api.trongrid.io/event/contract/" +
            contactAddress +
            "/" +
            eventName +
            "?sort=-block_timestamp"
        )
        .then(response => {
          if (mounted) {
            //add some extra data to the list
            let addesArray = response.data.map(x => {
              x.eventname = eventName;
              x.transactiontype = transactiontype;
              x.color = color;
              x.amountqualifier = amountQualifier;

              //set the decimal places on the amount
              //set the value
              let multiplier = Math.pow(10, decimalplaces * -1);
              let num = x.result[amountQualifier];
              let returnValue = Number(x.result[amountQualifier]) * multiplier;
              //remove the decmalls
              x.result[amountQualifier] = returnValue.toLocaleString();

              return x;
            });

            //concat the list with the current one
            let newlist = transactions.concat(addesArray);

            const sortlist = newlist.sort((a, b) => {
              if (a.block_timestamp < b.block_timestamp) return 1;
              if (a.block_timestamp > b.block_timestamp) return -1;
              return 0;
            });

            setTransactions(sortlist);
            setloadcount(loadcount + 1);
          }
        });
    };

    if (loadcount == 0) {
      //fetch sells
      fetchProjects(
        dappData.DeVestEvent.ContractAddress,
        dappData.DeVestEvent.EventName,
        "Devest",
        "red",
        dappData.DeVestEvent.AmountEventQualifier,
        dappData.Invest.Decimals
      );
    } else if (loadcount == 1) {
      fetchProjects(
        dappData.ReInvestEvent.ContractAddress,
        dappData.ReInvestEvent.EventName,
        "Reinvest",
        "green",
        dappData.ReInvestEvent.AmountEventQualifier,
        dappData.Invest.Decimals
      );
    } else if (loadcount == 2) {
      //fetch sells
      fetchProjects(
        dappData.InvestEvent.ContractAddress,
        dappData.InvestEvent.EventName,
        "Invest",
        "green",
        dappData.InvestEvent.AmountEventQualifier,
        dappData.Invest.Decimals
      );
    } else if (loadcount == 3) {
      fetchProjects(
        dappData.WithdrawalEvent.ContractAddress,
        dappData.WithdrawalEvent.EventName,
        "Withdraw",
        "red",
        dappData.WithdrawalEvent.AmountEventQualifier,
        dappData.Invest.Decimals
      );
    }

    return () => {
      mounted = false;
    };
  }, [loadcount]);

  function convertDateToString(datevalue) {
    let unix_timestamp = datevalue;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp);
    // Hours part from the timestamp
    var theday = date.toLocaleDateString();
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime =
      theday +
      " " +
      hours +
      ":" +
      minutes.substr(-2) +
      ":" +
      seconds.substr(-2);

    return formattedTime;
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Recent Activity" />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar options={{ suppressScrollY: true }}>
          <div className={classes.inner}>
            <Table>
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell>Type</TableCell>

                  <TableCell>User</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell sortDirection="desc">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map(transaction => (
                  <TableRow hover key={transaction.transaction_id}>
                    <TableCell>
                      <div className={classes.tags}>
                        {transaction.color === "red" && (
                          <Label className={classes.labelred}>
                            {transaction.transactiontype}
                          </Label>
                        )}
                        {transaction.color === "green" && (
                          <Label className={classes.labelgreen}>
                            {transaction.transactiontype}
                          </Label>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes.author}>
                        <Avatar
                          alt="Author"
                          className={classes.avatar}
                          src={dappData.ImageURL}
                        >
                          {getInitials(
                            window.tronWeb.address.fromHex(
                              transaction.result.customerAddress
                            )
                          )}
                        </Avatar>
                        {window.tronWeb.address.fromHex(
                          transaction.result.customerAddress
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {transaction.result[transaction.amountqualifier]}
                      {` `}
                      {dappData.PaysOutIn}
                    </TableCell>

                    <TableCell>
                      {convertDateToString(transaction.block_timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
}

LatestProjects.propTypes = {
  className: PropTypes.string
};

export default LatestProjects;

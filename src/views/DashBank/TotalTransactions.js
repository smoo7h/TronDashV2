import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, Typography, Avatar, colors } from "@material-ui/core";
import FolderOpenIcon from "@material-ui/icons/FolderOpenOutlined";
import Label from "src/components/Label";
import axios from "axios";
import gradients from "src/utils/gradients";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  details: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundImage: gradients.blue,
    height: 48,
    width: 48
  }
}));

function TotalTransactions({ className, dappData, ...rest }) {
  const classes = useStyles();
  const [totalTransactions, settotalTransactions] = useState(0);
  const data = {
    value: "12",
    difference: "-10%"
  };

  const fetchNumberOfTransactions = address => {
    if (address) {
      let currentuseraddress = window.tronWeb.defaultAddress.base58;
      if (window.tronWeb) {
        axios
          .get("https://apilist.tronscan.org/api/contract?contract=" + address)
          .then(response => {
            settotalTransactions(
              response.data.data[0].trxCount.toLocaleString()
            );
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
      <div>
        <Typography component="h3" gutterBottom variant="overline">
          Number Of Transaction
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">
            {totalTransactions ? totalTransactions : 0}
          </Typography>
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <FolderOpenIcon />
      </Avatar>
    </Card>
  );
}

TotalTransactions.propTypes = {
  className: PropTypes.string
};

export default TotalTransactions;

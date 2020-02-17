import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  colors
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import LockOpenIcon from "@material-ui/icons/LockOpenOutlined";
import PersonIcon from "@material-ui/icons/PersonOutline";
import Label from "src/components/Label";
import CustomerEditModal from "./CustomerEditModal";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: "column",
    alignItems: "flex-start",
    "& > * + *": {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

function DappSummary({ customer, dappData, className, ...rest }) {
  const classes = useStyles();
  const [openEdit, setOpenEdit] = useState(false);
  const [creationDate, setcreationDate] = useState(0);

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
        //get the contract address

        fetchNumberOfTransactions(dappData.ContractAddress);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Dapp Information" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>About</TableCell>
              <TableCell>
                {
                  "Bankroll Credits is the simplest way to tap into the full potential of the Bankroll Network. Passively earn TRX by holding credits over time. Properties like Luck and the BNKR token flow TRX directly to Credits HODLERs. Finally, earning extra crypto doesn't have to be a gamble."
                }
              </TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Fees</TableCell>
              <TableCell>
                {
                  "A transaction fee of 10% is charged on buys and sells that is distributed as follows: 8% to the instant dividend pool, 1% as referral reward, and 1% for maintenenance/promotion of the platform. A small 1% fee is charged on transfers. An additional revenue sharing pool drips 1.1% to the community daily."
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{"Credits"}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Company</TableCell>
              <TableCell>{"Bankroll"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Contract Address</TableCell>
              <TableCell>{"TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT"}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Website</TableCell>
              <TableCell>{"https://banktoll.network"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Creation Date</TableCell>
              <TableCell>{creationDate}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

DappSummary.propTypes = {
  className: PropTypes.string
  // customer: PropTypes.object.isRequired
};

export default DappSummary;

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
              <TableCell>{dappData.About}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Fees</TableCell>
              <TableCell>{dappData.Fees}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{dappData.Name}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Company</TableCell>
              <TableCell>{dappData.CompanyName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Contract Address</TableCell>
              <TableCell>{dappData.ContractAddress}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Website</TableCell>
              <TableCell>{dappData.Website}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Deploy Date</TableCell>
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

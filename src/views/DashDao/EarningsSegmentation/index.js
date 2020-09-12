import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import BigNumber from "bignumber.js";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  IconButton,
  OutlinedInput,
  Avatar,
  withStyles,
  Typography,
} from "@material-ui/core";
import { ExecuteInvestContract } from "src/utils/ContractFunctions";
import Dashimage from "../../../assets/dashcoinlogo.png";
import axios from "src/utils/axios";
import Visibility from "@material-ui/icons/Visibility";

import Button from "@material-ui/core/Button";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Chart from "./Chart";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import AccountCircle from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },

  chartContainer: {
    padding: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  chart: {
    height: 281,
  },
  large: {
    textAlign: "center",
    margin: "auto",
    boxShadow:
      "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  centertext: {
    textAlign: "center",
  },
  statsContainer: {
    display: "flex",
  },
  centertext: {
    textAlign: "center",
  },
  statsItem: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(3, 2),
    "&:not(:last-of-type)": {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#212121",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function EarningsSegmentation({ className, ...rest }) {
  const classes = useStyles();
  const [earnings, setEarnings] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [textValue, setTextValue] = useState(0);
  const [estimateToken, setestimateToken] = useState(0);

  const tokenAddress = "TJASWoyYgUw2M1jvDje7zYLooDCzWYRdkm";
  const presaleContractAddress = "TYZ9qt1W4JdTA8FRE4yKJuio9hvqNvinBc";

  useEffect(() => {
    let mounted = true;

    const fetchEarnings = () => {
      axios.get("/api/dashboard/earnings").then((response) => {
        if (mounted) {
          setEarnings(response.data.earnings);
        }
      });
    };

    fetchEarnings();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchUserBalance = () => {
      let currentuseraddress = window.tronWeb.defaultAddress.base58;
      if (window.tronWeb) {
        window.tronWeb.trx.getBalance(
          currentuseraddress,
          (error, contractBalance) => {
            if (error) return console.error(error);
            setWalletBalance(contractBalance * 0.000001);
          }
        );
      }
    };

    fetchUserBalance();

    return () => {
      mounted = false;
    };
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handelBuy = () => {
    //execute the contract

    //get selected object and execute the Withdraw command
    if (Number(textValue) > 0) {
      ExecuteInvestContract(
        presaleContractAddress,
        "buyTokens(address)",
        window.tronWeb.defaultAddress.base58,
        1,
        6,
        "trx"
      );
    }
  };

  //handelBuy

  const handleClose = () => {
    setOpen(false);
  };
  const handleMax = () => {
    setTextValue(walletBalance.toFixed(2));
  };

  const handleTextChange = (event) => {
    //  event.persist();
    setTextValue(event.target.value);
  };

  useEffect(() => {
    let mounted = true;

    const fetchEstimate = () => {
      if (textValue != 0) {
        let data = getContractData(
          presaleContractAddress,
          "calculateTokensReceived(uint256)",
          Number(textValue) * 1000000
        ).then((response) => {
          if (response) {
            setestimateToken(response);
          }
        });
        //console.log(data);
      } else {
        setestimateToken(0);
      }
    };

    fetchEstimate();

    return () => {
      mounted = false;
    };
  }, [textValue]);
  const getContractData = async (
    contractAddress,
    functionSelector,
    contractParameter
  ) => {
    var contractValue = await window.tronWeb
      .contract()
      .at(contractAddress, async (error, contract) => {
        if (error) return console.error(error);
        let getbalance1;

        try {
          //you have to send the one with a
          getbalance1 =
            contractParameter == "" || !contractParameter
              ? await contract[functionSelector]().call()
              : await contract[functionSelector](contractParameter).call();
        } catch (error) {
          //sometimes if they have the wrong value for the functionSelector this happens
          getbalance1 = 999999999999999999999;
        }
        //need to cast number as bignumber 4 no overflow
        let returnValueIndexd = getbalance1[Object.keys(getbalance1)[0]];
        let numchec = new BigNumber(returnValueIndexd);
        let returnValue = 0;
        //set the value
        let multiplier = Math.pow(10, 6 * -1);
        returnValue = Number(numchec) * multiplier;
        //remove the decmalls
        returnValue = returnValue;
        return returnValue;
      });

    return contractValue;
  };

  const executeContract = async (
    contractAddress,
    functionSelector,
    contractParameter
  ) => {
    //get the contacct value
    window.tronWeb.contract().at(contractAddress, async (error, contract) => {
      if (error) return console.error(error);
      let returnvalue;
      try {
        //you have to send the one with a
        returnvalue =
          contractParameter == ""
            ? await contract[functionSelector]().send({ feeLimit: 10000000 })
            : await contract[functionSelector](contractParameter).send({
                feeLimit: 10000000,
              });
      } catch (error) {
        //sometimes if they have the wrong value for the functionSelector this happens
        console.log(error);
      }
    });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Presale" className={classes.centertext} />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.chartContainer}>
          <Chart className={classes.chart} data={earnings} />
        </div>
        <Divider />
        <div className={classes.statsContainer}>
          <div className={classes.statsItem} key={"price"}>
            <Typography
              align="center"
              component="h6"
              gutterBottom
              variant="overline"
            >
              Price
            </Typography>
            <Typography align="center" variant="h4">
              0.9 trx
            </Typography>
          </div>
          <div className={classes.statsItem} key={"sold2"}>
            <Typography
              align="center"
              component="h6"
              gutterBottom
              variant="overline"
            >
              {"sold"}
            </Typography>
            <Typography align="center" variant="h4">
              {75}%
            </Typography>
          </div>
          <div className={classes.statsItem} key={"sold"}>
            <Typography
              align="center"
              component="h6"
              gutterBottom
              variant="overline"
            >
              {"owned"}
            </Typography>
            <Typography align="center" variant="h4">
              {29992}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.statsContainer}>
          <div className={classes.statsItem} key="buybtn">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleOpen}
              className={classes.margin}
              style={{
                background: "linear-gradient(to right, #D50000, #8C9EFF)",
                color: "white",
              }}
            >
              Swap
            </Button>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <Avatar src={Dashimage} className={classes.large} />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Typography className={classes.centertext} variant="h3">
                          Deposit
                        </Typography>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <Typography className={classes.centertext}>
                          Swap TRX for TDD Tokens
                        </Typography>
                      </Grid>
                      <Grid item md={4} xs={4}></Grid>
                      <Grid item md={4} xs={4}>
                        <OutlinedInput
                          //className={classes.margin}
                          label="Deposit trx"
                          variant="outlined"
                          id="entervaluetxt"
                          type={"text"}
                          className={classes.root}
                          fullWidth
                          onChange={handleTextChange}
                          value={textValue}
                          margin="normal"
                          variant="outlined"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="max"
                                onClick={handleMax}
                                onMouseDown={handleMax}
                                edge="end"
                              >
                                <Typography className={classes.centertext}>
                                  max
                                </Typography>
                              </IconButton>
                            </InputAdornment>
                          }
                        />

                        <br></br>
                        <br></br>
                        <Typography className={classes.centertext} variant="h5">
                          Balance: {walletBalance.toFixed(2)} {` trx`}
                        </Typography>
                        {estimateToken > 0 && (
                          <Typography
                            className={classes.centertext}
                            variant="h5"
                          >
                            You will receive: {estimateToken.toFixed(2)}{" "}
                            {` tdd`}
                          </Typography>
                        )}
                      </Grid>

                      <Grid item md={4} xs={12}></Grid>
                      <Grid item md={4} xs={12}></Grid>
                      <Grid item md={4} xs={12}>
                        <Button
                          variant="contained"
                          fullWidth
                          size="large"
                          color="primary"
                          onClick={handelBuy}
                          className={classes.margin}
                          style={{
                            background:
                              "linear-gradient(to right, #D50000, #8C9EFF)",
                            color: "white",
                          }}
                        >
                          Swap
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Fade>
              </Modal>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

EarningsSegmentation.propTypes = {
  className: PropTypes.string,
};

export default EarningsSegmentation;

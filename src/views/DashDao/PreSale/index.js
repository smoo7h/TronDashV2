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
  iconButton: {
    background: "#000000",
    borderRadius: 0,
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
    padding: "16px",
    marginRight: "-14px",

    "&:hover": {
      background: "#000000",
    },
  },
  inputAdornment: {
    zIndex: 1,
    marginLeft: 0,
  },
}));

// https://stackoverflow.com/questions/56958742/cant-change-border-color-of-material-ui-outlinedinput
const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    backgroundClip: "padding-box",
    background: "#000000",
    padding: "2px 15px 1px 1px",
    "&$focused $notchedOutline": {
      background:
        "rgba(0, 0, 0, 0) linear-gradient(to right, rgb(213, 0, 0), rgb(140, 158, 255)) repeat scroll 0% 0%",
      border: 0,
      borderRadius: "4px",
      borderWidth: "2px",
      top: "-4.5px",
    },
    "&$focused $input": {
      background: "#000000",
      borderRadius: "4px",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      zIndex: 1,
    },
  },
  input: {},
  focused: {},
  notchedOutline: {},
}));

function PreSale({ className, ...rest }) {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [graphObject, setGraphObject] = useState([]);
  const [soldPercentage, setSoldPercentage] = useState(0);

  const [walletBalance, setWalletBalance] = useState(0);
  const [textValue, setTextValue] = useState(0);
  const [estimateToken, setestimateToken] = useState(0);
  const [tokenBalance, settokenBalance] = useState(0);
  const [tokensLeft, setTokensLeft] = useState(0);
  const [farmName, setfarmName] = useState("");

  const tokenAddress = "TQ2Qyqu6rPXskGGfcPSkF8X7vYnfLMxCx5";
  const presaleContractAddress = "TFZR8AAYGwymEHQy192tBk6PPUQEDW7tfx";
  const currentContractAddress = "TFZR8AAYGwymEHQy192tBk6PPUQEDW7tfx";
  const contractTokenStart = 10000000;

  useEffect(() => {
    let mounted = true;

    const fetchEarnings = () => {
      if (mounted) {
        let data = getContractData(presaleContractAddress, "tokensleft()").then(
          (response) => {
            if (response) {
              let graphvalues = [
                {
                  id: "27e84d20-f4a8-11ea-be42-79f6d264d75f",
                  color: "#3f51b5",
                  label: "Sold",
                  value: contractTokenStart - response,
                },
                {
                  id: "27e84d21-f4a8-11ea-be42-79f6d264d722",
                  color: "#424242",
                  label: "For Sale",
                  value: response,
                },
              ];
              setGraphObject(graphvalues);
              //figure out how mant are sold
              let percentage = response / contractTokenStart;
              setSoldPercentage(percentage);
            }
          }
        );
      }
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

    if (Number(textValue) > 0) {
      ExecuteInvestContract(
        presaleContractAddress,
        "buyTokens(address)",
        window.tronWeb.defaultAddress.base58,
        textValue,
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

  useEffect(() => {
    let mounted = true;
    let currentuseraddress = window.tronWeb.defaultAddress.base58;
    const fetchTokenBalance = () => {
      let data = getContractData(
        tokenAddress,
        "balanceOf(address)",
        currentuseraddress
      ).then((response) => {
        if (response) {
          settokenBalance(response);
        }
      });
      //console.log(data);
    };

    fetchTokenBalance();

    return () => {
      mounted = false;
    };
  }, []);

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
            ? await contract[functionSelector]().send({ feeLimit: 100000000 })
            : await contract[functionSelector](contractParameter).send({
                feeLimit: 100000000,
              });
      } catch (error) {
        //sometimes if they have the wrong value for the functionSelector this happens
        console.log(error);
      }
    });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Pre Sale" className={classes.centertext} />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.chartContainer}>
          <Typography
            align="center"
            component="h6"
            gutterBottom
            variant="overline"
          >
            Pre sale has now ended
            <br />
            <br />
            Stay tuned for an announcement for when TDD will be listed on
            justswap
          </Typography>
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
              {soldPercentage.toFixed(0)}%
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
              {tokenBalance.toFixed(2)}
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
              //onClick={handleOpen}
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
                      <Grid item md={12} xs={12}>
                        <Typography className={classes.centertext}>
                          * TDD Tokens will be frozen until presale is complete
                        </Typography>
                      </Grid>
                      <Grid item md={4} xs={0}></Grid>
                      <Grid item md={4} xs={10}>
                        <OutlinedInput
                          //className={classes.margin}
                          label="Deposit trx"
                          variant="outlined"
                          id="entervaluetxt"
                          type={"text"}
                          classes={outlinedInputClasses}
                          notched={false}
                          fullWidth
                          onChange={handleTextChange}
                          value={textValue}
                          margin="normal"
                          endAdornment={
                            <InputAdornment
                              position="end"
                              className={classes.inputAdornment}
                            >
                              <IconButton
                                aria-label="max"
                                onClick={handleMax}
                                onMouseDown={handleMax}
                                edge="end"
                                className={classes.iconButton}
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

PreSale.propTypes = {
  className: PropTypes.string,
};

export default PreSale;

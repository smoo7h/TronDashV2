import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import BigNumber from "bignumber.js";
import { makeStyles } from "@material-ui/styles";
import Dashimage from "src/assets/dashcoinlogo.png";
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

import axios from "src/utils/axios";
import Visibility from "@material-ui/icons/Visibility";

import Button from "@material-ui/core/Button";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
    //color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: "#212121",
    margin: "auto",
    boxShadow:
      "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    width: theme.spacing(10),
    height: theme.spacing(10),
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
  centeritem: {
    textAlign: "center",
    margin: "auto",
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

function FarmCard({ className, ...rest }) {
  const classes = useStyles();
  const [graphObject, setGraphObject] = useState([]);
  const [soldPercentage, setSoldPercentage] = useState(0);

  const [walletBalance, setWalletBalance] = useState(0);
  const [textValue, setTextValue] = useState(0);
  const [estimateToken, setestimateToken] = useState(0);
  const [tokenBalance, settokenBalance] = useState(0);
  const [tokenBalanceNormilized, settokenBalanceNormilized] = useState(0);
  const [tokensLeft, setTokensLeft] = useState(0);
  const [clickState, setclickState] = useState(0);
  const [farmName, setfarmName] = useState("trondash farm");
  const [farmIcon, setfarmIcon] = useState("🥑");
  const [depositTokenName, setdepositTokenName] = useState("dash/trx");
  const [earnTokenName, setearnTokenName] = useState("dash");
  const [tokensEarned, settokensEarned] = useState(0);
  const [tokensStaked, settokensStaked] = useState(0);
  const [tokensHeld, settokensHeld] = useState(0);
  const [tokensAllowance, settokensAllowance] = useState(0);
  const [stakingContractAddress, setstakingContractAddress] = useState(
    "TVuvY19L6BjiST9bNQrYAasNE6wJCXocnq"
  );
  const [inputTokenContractAddress, setinputTokenContractAddress] = useState(
    "TQ8moz2tt1xHKvAugPJQWSMHeMrycBjHiJ"
  );

  const [outputTokenContractAddress, setoutputTokenContractAddress] = useState(
    "TCFLL5dx5ZJdKnWuesXxi1VPwjLVmWZZy9"
  );
  const [inputTokenDecimalPlaces, setinputTokenDecimalPlaces] = useState(0);
  const [outputTokenDecimalPlaces, setoutputTokenDecimalPlaces] = useState(0);
  const tokenAddress = "TJASWoyYgUw2M1jvDje7zYLooDCzWYRdkm";
  const presaleContractAddress = "TYZ9qt1W4JdTA8FRE4yKJuio9hvqNvinBc";

  const contractTokenStart = 100;

  useEffect(() => {
    let mounted = true;
    let currentuseraddress = window.tronWeb.defaultAddress.base58;
    const fetchDecimalPlaces = () => {
      if (mounted) {
        let data = getContractData(
          inputTokenContractAddress,
          "decimals()"
        ).then((response) => {
          if (response) {
            let decimalConverted = response * 1000000;
            setinputTokenDecimalPlaces(decimalConverted);
          }
        });

        let data2 = getContractData(
          outputTokenContractAddress,
          "decimals()"
        ).then((response) => {
          if (response) {
            let decimalConverted = response * 1000000;
            setoutputTokenDecimalPlaces(decimalConverted);
          }
        });
      }
    };

    fetchDecimalPlaces();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let currentuseraddress = window.tronWeb.defaultAddress.base58;
    const fetchAllowance = () => {
      if (mounted) {
        let data = getContractData(
          inputTokenContractAddress,
          "allowance(address,address)",
          currentuseraddress,
          stakingContractAddress
        ).then((response) => {
          if (response) {
            settokensAllowance(response);
          }
        });
      }
    };

    fetchAllowance();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let currentuseraddress = window.tronWeb.defaultAddress.base58;
    const fetchUserTokenBalance = () => {
      if (mounted) {
        let data = getContractData(
          inputTokenContractAddress,
          "balanceOf(address)",
          currentuseraddress
        ).then((response) => {
          if (response) {
            if (inputTokenDecimalPlaces > 0) {
              let decimals = inputTokenDecimalPlaces - 6;
              let balance = BigNumber(response).div(10 ** decimals);

              settokensHeld(balance.toFixed(2).toString());
              //set the normilized value
            }
          }
        });
      }
    };

    fetchUserTokenBalance();

    return () => {
      mounted = false;
    };
  }, [inputTokenDecimalPlaces]);

  useEffect(() => {
    let mounted = true;
    let currentuseraddress = window.tronWeb.defaultAddress.base58;
    const fetchUserTokenEarned = () => {
      if (mounted) {
        let data = getContractData(
          stakingContractAddress,
          "earned(address)",
          currentuseraddress
        ).then((response) => {
          if (response) {
            console.log(response);
            settokensEarned(response);
          }
        });
      }
    };

    fetchUserTokenEarned();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let currentuseraddress = window.tronWeb.defaultAddress.base58;
    const fetchUserTokenStaked = () => {
      if (mounted) {
        let data = getContractData(
          stakingContractAddress,
          "balanceOf(address)",
          currentuseraddress
        ).then((response) => {
          if (response) {
            console.log(response);
            settokensStaked(response);
          }
        });
      }
    };

    fetchUserTokenStaked();

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
        inputTokenDecimalPlaces,
        ""
      );
    }
  };

  const handelAllowance = () => {
    //execute the contract

    ExecuteInvestContract(
      presaleContractAddress,
      "buyTokens(address)",
      window.tronWeb.defaultAddress.base58,
      textValue,
      inputTokenDecimalPlaces,
      "trx"
    );
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleMax = () => {
    setTextValue(tokensHeld);
  };

  const handleTextChange = (event) => {
    //  event.persist();
    setTextValue(event.target.value);
  };

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
    contractParameter,
    contractParameter2
  ) => {
    var contractValue = await window.tronWeb
      .contract()
      .at(contractAddress, async (error, contract) => {
        if (error) return console.error(error);
        let getbalance1;

        try {
          //you have to send the one with a
          if (contractParameter2) {
            getbalance1 = await contract[functionSelector](
              contractParameter,
              contractParameter2
            ).call();
          } else {
            getbalance1 =
              contractParameter == "" || !contractParameter
                ? await contract[functionSelector]().call()
                : await contract[functionSelector](contractParameter).call();
          }
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

  const handelHarvest = (event, id) => {
    //get selected object and execute the reinvest command

    executeContract(stakingContractAddress, "getReward()", "");
    setclickState(clickState + 1);
  };

  const handleUnskate = () => {
    executeContract(stakingContractAddress, "exit()", "");
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title={farmName} className={classes.centertext} />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.chartContainer}>
          <Avatar className={classes.large}>
            <Typography className={classes.centertext} variant="h1">
              {farmIcon}
            </Typography>
          </Avatar>
          <br></br>
          <Typography className={classes.centertext} variant="h6">
            Deposit {depositTokenName}
          </Typography>
          <Typography className={classes.centertext} variant="h6">
            Earn {earnTokenName}
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
              Farmed {earnTokenName}
              {`'s`}
            </Typography>
            <Typography align="center" variant="h4">
              {tokensEarned}
            </Typography>
          </div>
          <div className={classes.statsItem} key={"sold2"}>
            <Typography
              align="center"
              component="h6"
              gutterBottom
              variant="overline"
            >
              {depositTokenName}
              {" Staked"}
            </Typography>
            <Typography align="center" variant="h4">
              {tokensStaked}
            </Typography>
          </div>
        </div>
        <Divider />
        <Grid container spacing={1}>
          <Grid item md={6} xs={6}>
            <div className={classes.statsItem} key="harvest">
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={handelHarvest}
                className={classes.margin}
                style={{
                  background: "linear-gradient(to left, #796eff, #ff5263",
                  color: "white",
                }}
              >
                Harvest
              </Button>
            </div>
          </Grid>
          <Grid item md={6} xs={6}>
            <div className={classes.statsItem} key="stake">
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
                Stake
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
                          <Avatar className={classes.large}>
                            <Typography
                              className={classes.centertext}
                              variant="h1"
                            >
                              {farmIcon}
                            </Typography>
                          </Avatar>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <Typography
                            className={classes.centertext}
                            variant="h3"
                          >
                            {farmName}
                          </Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <Typography className={classes.centertext}>
                            Deposit {depositTokenName} and earn {earnTokenName}
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
                          <Typography
                            className={classes.centertext}
                            variant="h5"
                          >
                            Balance: {tokensHeld}
                            {` `} {depositTokenName}
                          </Typography>
                        </Grid>
                        <Grid item md={3} xs={0}></Grid>
                        <Grid item md={3} xs={0}></Grid>
                        <Grid item md={3} xs={6}>
                          <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            color="primary"
                            onClick={handleUnskate}
                            className={classes.margin}
                            style={{
                              background:
                                "linear-gradient(to right, #D50000, #FF8A80)",
                              color: "white",
                            }}
                          >
                            Unstake
                          </Button>
                        </Grid>
                        <Grid item md={3} xs={6}>
                          {tokensAllowance > 0 && (
                            <Button
                              variant="contained"
                              fullWidth
                              size="large"
                              color="primary"
                              // onClick={handelBuy}
                              className={classes.margin}
                              style={{
                                background:
                                  "linear-gradient(to right, #D50000, #8C9EFF)",
                                color: "white",
                              }}
                            >
                              Stake
                            </Button>
                          )}
                          {tokensAllowance == 0 && (
                            <Button
                              variant="contained"
                              fullWidth
                              size="large"
                              color="primary"
                              // onClick={handelBuy}
                              className={classes.margin}
                              style={{
                                background:
                                  "linear-gradient(to right, #D50000, #8C9EFF)",
                                color: "white",
                              }}
                            >
                              Approve
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  </Fade>
                </Modal>
              </div>
            </div>
          </Grid>
        </Grid>

        <div className={classes.statsContainer}></div>
      </CardContent>
    </Card>
  );
}

FarmCard.propTypes = {
  className: PropTypes.string,
};

export default FarmCard;

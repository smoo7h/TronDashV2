import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import DappIcon from "../../../assets/watering.svg";
import BigNumber from "bignumber.js";
import AddIcon from "@material-ui/icons/Add";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { makeStyles } from "@material-ui/styles";
import HelpOutline from "@material-ui/icons/HelpOutline";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  IconButton,
  OutlinedInput,
  Avatar,
  Slider,
  Link,
  Typography,
} from "@material-ui/core";
import { ExecuteInvestContract } from "src/utils/ContractFunctions";
import DashImage from "../../../assets/dashcoinlogo.png";
import TrxImage from "../../../assets/tron-trx-logo.png";

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
    margin: "auto",
    boxShadow:
      "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  statsContainer: {
    display: "flex",
  },
  centertext: {
    textAlign: "center",
  },
  centertextarea: {
    textAlign: "center",
    padding: theme.spacing(2, 4, 3),
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
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
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

function DappCard({
  className,
  swapClick,
  poolClick,
  dappAddress,
  tokenAddress,
  ...rest
}) {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();

  const [trxInputTextValue, settrxInputTextValue] = useState(0);
  const [tokenInputTextValue, settokenInputTextValue] = useState(0);
  const [estimateToken, setestimateToken] = useState(0);
  const [tokenBalance, settokenBalance] = useState(0);
  const [lptokenBalance, setlptokenBalance] = useState(0);
  const [checkSiteData, setcheckSiteData] = useState(0);
  const [lptokensReceived, setlptokensReceived] = useState(0);
  const [tokensNeededForAdd, settokensNeededForAdd] = useState(0);
  const [lpTokensToBeRemoved, setlpTokensToBeRemoved] = useState(0);
  const [tick, setTick] = useState(1);

  const [trxReceivedForRemove, settrxReceivedForRemove] = useState(0);
  const [tokenReceivedForRemove, settokenReceivedForRemove] = useState(0);

  const [sliderValue, setSliderValue] = React.useState(0);
  const [currentPrice, setcurrentPrice] = useState();

  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);

  //Dapp data

  const [walletBalance, setWalletBalance] = useState(0);
  const [userStake, setuserStake] = useState(0);
  const [userTokenBalance, setuserTokenBalance] = useState(0);
  const [userDividend, setuserDividend] = useState(0);
  const [dividendPool, setdividendPool] = useState(0);
  const [dividendPoolToken, setdividendPoolToken] = useState(0);
  const [contractBalance, setcontractBalance] = useState(0);
  const [memberCount, setmemberCount] = useState(0);

  //timer for refresh
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    //this is the data refresh interval it will refresh every x amount of time after the %
    setTick((tick) => tick + 1);
    if (tick % 5 == 0) {
      fetchPageData();
    }
  }, 1000);

  const clearAddLiqValues = () => {
    settrxInputTextValue(0);
    setestimateToken(0);
    setlptokensReceived(0);
    settokensNeededForAdd(0);
  };

  const fetchPageData = () => {
    let currentuseraddress = window.tronWeb.defaultAddress.base58;
    //get useers balance address

    const fetchUserBalance = () => {
      let data = getContractData(
        dappAddress,
        "trxBalance(address)",
        currentuseraddress
      ).then((response) => {
        if (response) {
          setWalletBalance(response);
        }
      });
    };

    fetchUserBalance();

    //get user userStake
    const fetchUserStake = () => {
      let data = getContractData(
        dappAddress,
        "statsOf(address)",
        currentuseraddress
      ).then((response) => {
        if (response) {
          setuserStake(response);
        }
      });
    };

    fetchUserStake();

    //get user token balance
    //userTokenBalance

    //get user userStake
    const fetchUserTokenBalance = () => {
      let data = getContractData(
        dappAddress,
        "balanceOf(address)",
        currentuseraddress
      ).then((response) => {
        if (response) {
          setuserTokenBalance(response);
        }
      });
    };

    fetchUserTokenBalance();

    //get user Dividends
    const fetchUserDivs = () => {
      let data = getContractData(dappAddress, "myDividends()").then(
        (response) => {
          if (response) {
            setuserDividend(response);
          }
        }
      );
    };

    fetchUserDivs();

    //dividendBalance

    const fetDivPoolTrx = () => {
      let data = getContractData(dappAddress, "dividendBalance()").then(
        (response) => {
          if (response) {
            setdividendPool(response);
          }
        }
      );
    };

    fetDivPoolTrx();

    //div balance token
    const fetDivPoolToken = () => {
      let data = getContractData(dappAddress, "lockedTokenBalance()").then(
        (response) => {
          if (response) {
            setdividendPoolToken(response);
          }
        }
      );
    };

    fetDivPoolToken();

    //get member count
    const fetchMemberCount = () => {
      let data = getContractData(dappAddress, "players()").then((response) => {
        if (response) {
          setmemberCount(response * 1000000);
        }
      });
    };

    fetchMemberCount();

    //totalTokenBalance
    const fetchcontractbalance = () => {
      let data = getContractData(dappAddress, "totalTokenBalance()").then(
        (response) => {
          if (response) {
            setcontractBalance(response);
          }
        }
      );
    };

    fetchcontractbalance();
  };

  useEffect(() => {
    let mounted = true;

    const fetchData = () => {
      if (mounted) {
        fetchPageData();
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const checkForzero = () => {
      if (mounted) {
        //clear text if slier is 0
        if (sliderValue === 0) {
          settrxReceivedForRemove(0);
          settokenReceivedForRemove(0);
          setlpTokensToBeRemoved(0);
        }
      }
    };

    checkForzero();

    return () => {
      mounted = false;
    };
  }, [sliderValue]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleReinvest = () => {
    //call the blockchain for approval
    executeContract(dappAddress, "reinvest()", "").then((response) => {
      if (response) {
        //successsetapprovedStatus(true);
        setcheckSiteData(checkSiteData + 1);
      }
    });
  };

  const handleWithdral = () => {
    //call the blockchain for approval
    executeContract(dappAddress, "withdraw()", "").then((response) => {
      if (response) {
        //successsetapprovedStatus(true);
        setcheckSiteData(checkSiteData + 1);
      }
    });
  };

  const executeTrxToTokenSwapContract = async (contractAddress, callValue) => {
    //get the contacct value
    window.tronWeb.contract().at(contractAddress, async (error, contract) => {
      if (error) return console.error(error);
      let returnvalue;

      try {
        //convert call value to slolidiy valye
        let trxSumbitAmount = callValue * 1000000;

        //remove decimals

        if (trxSumbitAmount % 1 != 0) {
          // trxSumbitAmount = ~~trxSumbitAmount;
          trxSumbitAmount = Math.floor(trxSumbitAmount);
        }

        //you have to send the one with afunctionSelector
        returnvalue = await contract
          .buy()
          .send({
            feeLimit: 10000000,
            callValue: trxSumbitAmount,
          })
          .then((response) => {
            if (response) {
              setcheckSiteData(checkSiteData + 1);
              handleClose();

              return response;
            }
          });
        return returnvalue;
      } catch (error) {
        //error
        console.log(error);
      }
    });
  };
  //handel  deposit

  const handleDeposit = () => {
    //call the blockchain for approval
    executeTrxToTokenSwapContract(dappAddress, trxInputTextValue).then(
      (response) => {
        if (response) {
          //successsetapprovedStatus(true);
          setcheckSiteData(checkSiteData + 1);
        }
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const handleAddLiquidity = () => {
    executeAddLiquitityContract(dappAddress, trxInputTextValue).then(
      (response) => {
        if (response) {
          //successsetapprovedStatus(true);
          // setcheckSiteData(checkSiteData + 1);
        }
      }
    );
  };

  const handleMax = () => {
    settrxInputTextValue(walletBalance);
    handelPoolInputCalculation(walletBalance);
  };

  const handleAddTrxTextChange = (event) => {
    //  event.persist();
    //remove the letters from the string value
    var sValue = event.target.value.replace(/[^\d.-]/g, "");
    if (sValue && sValue != "") {
      settrxInputTextValue(sValue);
      handelPoolInputCalculation(sValue);
    } else {
      settrxInputTextValue("");
      settokensNeededForAdd("");
    }
  };

  //calculates the number of tokens required to add liquidity from a trx value
  const handelPoolInputCalculation = (value) => {
    if (value && value > 0) {
      let ogValue = value;
      //multiply it to remove decimals
      value = value * 1000000;
      if (value % 1 != 0) {
        // value = ~~value;
        value = Math.floor(value);
      }
      //first we need to call getTrxToLiquidityInputPrice(uint256) on the contract to see how many lp tokens we get
      let data = getContractData(
        dappAddress,
        "getTrxToLiquidityInputPrice(uint256)",
        value
      ).then((response) => {
        if (response) {
          //save response
          setlptokensReceived(response);
          //change number to solidity notation
          response = response * 1000000;
          if (response % 1 != 0) {
            // value = ~~value;
            response = Math.floor(response);
          }
          //now that we have the value we need to call getLiquidityToReserveInputPrice(uint256)
          //to get the tokens needed

          let data = getContractData(
            dappAddress,
            "getLiquidityToReserveInputPrice(uint256)",
            response
          ).then((response) => {
            if (response) {
              //save response
              //we now knwo how many tokens we need to add liquidity
              settokensNeededForAdd(response);
            }
          });
        }
      });

      //get an estimate on how many tokens they will receive
    }
  };

  //get token balances on load
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

    const fetchLPTokenBalance = () => {
      let data = getContractData(
        dappAddress,
        "balanceOf(address)",
        currentuseraddress
      ).then((response) => {
        if (response) {
          setlptokenBalance(response);
        }
      });
      //console.log(data);
    };

    fetchTokenBalance();
    fetchLPTokenBalance();

    return () => {
      mounted = false;
    };
  }, []);

  //use ths function to get contract data
  const getContractData = async (
    contractAddress,
    functionSelector,
    contractParameter,
    numberofOutPuts
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

        if (numberofOutPuts && numberofOutPuts > 1) {
          const returnArray = [];
          for (let index = 0; index < numberofOutPuts; index++) {
            //need to cast number as bignumber 4 no overflow
            let returnValueIndexd =
              getbalance1[Object.keys(getbalance1)[index]];
            let numchec = new BigNumber(returnValueIndexd);
            let returnValue = 0;

            //remove the decmalls
            let multiplier = Math.pow(10, 6 * -1);
            returnValue = Number(numchec) * multiplier;

            //add it to the array
            returnArray.push(returnValue);
          }

          //return the array
          return returnArray;
        } else {
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
        }
      });

    return contractValue;
  };

  //use this function to execute a contract
  const executeContract = async (
    contractAddress,
    functionSelector,
    contractParameter,
    callValue
  ) => {
    //get the contacct value
    window.tronWeb.contract().at(contractAddress, async (error, contract) => {
      if (error) return console.error(error);
      let returnvalue;

      //first one is if you neeed 2 send trx with it
      if (callValue > 0) {
        try {
          //convert call value to slolidiy valye
          let trxSumbitAmount = callValue * 1000000;
          //you have to send the one with a
          returnvalue =
            contractParameter == ""
              ? await contract[functionSelector]().send({
                  feeLimit: 10000000,
                  call_value: trxSumbitAmount,
                })
              : await contract[functionSelector](contractParameter).send({
                  feeLimit: 10000000,
                  call_value: trxSumbitAmount,
                });
          return returnvalue;
        } catch (error) {
          //sometimes if they have the wrong value for the functionSelector this happens
          console.log(error);
        }
      } else {
        try {
          // no trx sent
          returnvalue =
            contractParameter == ""
              ? await contract[functionSelector]().send({ feeLimit: 10000000 })
              : await contract[functionSelector](contractParameter).send({
                  feeLimit: 10000000,
                });
          return returnvalue;
        } catch (error) {
          //sometimes if they have the wrong value for the functionSelector this happens
          console.log(error);
        }
      }
    });
  };

  //use this function to execute a contract
  const executeApprovalContract = async (
    contractAddress,
    contractParameter1,
    contractParameter2
  ) => {
    //get the contacct value
    window.tronWeb.contract().at(contractAddress, async (error, contract) => {
      if (error) return console.error(error);
      let returnvalue;

      //first one is if you neeed 2 send trx with it

      try {
        // no trx sent
        returnvalue = await contract
          .approve(contractParameter1, contractParameter2)
          .send({
            feeLimit: 10000000,
          });
        return returnvalue;
      } catch (error) {
        //sometimes if they have the wrong value for the functionSelector this happens
        console.log(error);
      }
    });
  };

  //use this function to execute a contract
  const executeAddLiquitityContract = async (contractAddress, trxInput) => {
    // this is a 3 step process
    //first step is to call getTrxToLiquidityInputPrice(uint256)
    window.tronWeb.contract().at(contractAddress, async (error, contract) => {
      if (error) return console.error(error);
      let returnvalue;

      trxInput = trxInput * 1000000;
      if (trxInput % 1 != 0) {
        //trxInput = ~~trxInput;
        trxInput = Math.floor(trxInput);
      }

      try {
        // get getTrxToLiquidityInputPrice
        let trxInputPrice = await contract
          .getTrxToLiquidityInputPrice(trxInput)
          .call();

        //now we need to call getLiquidityToReserveInputPrice with the returneed value of

        let liquidityToReserveInputPrice = await contract
          .getLiquidityToReserveInputPrice(trxInputPrice)
          .call();

        //now that we have this number we need to add 20% and then send it to the contract with the trx input

        //Get the initial input price from the [1] value returned from the prior function
        let liquidityToReserveInputPriceMax =
          liquidityToReserveInputPrice[1] * 1.2;

        //remove any decimals
        if (liquidityToReserveInputPriceMax % 1 != 0) {
          //liquidityToReserveInputPriceMax = ~~liquidityToReserveInputPriceMax;
          liquidityToReserveInputPriceMax = Math.floor(
            liquidityToReserveInputPriceMax
          );
        }

        //now lets call the contract

        try {
          // no trx sent
          let finalreturnvalue = await contract
            .addLiquidity(1, liquidityToReserveInputPriceMax)
            .send({
              feeLimit: 10000000,
              callValue: trxInput,
              //not seending the trx duh
            })
            .then(() => {
              handleClose();
              clearAddLiqValues();
              //clear values
            });
          return returnvalue;
        } catch (error) {
          //sometimes if they have the wrong value for the functionSelector this happens
          console.log(error);
        }

        return returnvalue;
      } catch (error) {
        //sometimes if they have the wrong value for the functionSelector this happens
        console.log(error);
      }
    });
  };

  //use this function to execute a contract
  const executeRemoveLiquitityContract = async (
    contractAddress,
    lpTokenAmount
  ) => {
    //get the contacct value
    window.tronWeb.contract().at(contractAddress, async (error, contract) => {
      if (error) return console.error(error);
      let returnvalue;

      /*
      lpTokenAmount = lpTokenAmount * 1000000;
      if (lpTokenAmount % 1 != 0) {
        lpTokenAmount = ~~lpTokenAmount;
      }
      //first one is if you neeed 2 send trx with it
*/
      try {
        // no trx sent
        returnvalue = await contract
          .removeLiquidity(lpTokenAmount, "1", "1")
          .send({
            feeLimit: 10000000,
          })
          .then(() => {
            handleClose();
            //clear values
            setSliderValue(0);
            settrxReceivedForRemove(0);
            settokenReceivedForRemove(0);
            setlpTokensToBeRemoved(0);
          });
        return returnvalue;
      } catch (error) {
        //sometimes if they have the wrong value for the functionSelector this happens
        console.log(error);
      }
    });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Grid container>
        <Grid item md={12} xs={12}>
          <CardHeader
            title="TDD Liquidity Farm"
            className={classes.centertext}
            action={
              <IconButton aria-label="settings" onClick={handleOpenInfo}>
                <HelpOutline />
              </IconButton>
            }
            // onClick={handleSwapClick}
          />
        </Grid>
      </Grid>
      <Divider />
      <br></br>
      <Grid container direction="row" justify="center" alignItems="center">
        <Avatar
          alt="icon"
          src={DappIcon}
          className={classes.large}
          // style={{ objectFit: "fill" }}
        />
      </Grid>
      <br></br>
      <Grid container>
        <Typography className={classes.centertextarea} variant="h5">
          TronDash’s Liquidity Farm is the best of way to profit from the
          TronDash platform. Your share of TDDFRM entitles you to community
          deposit distributions, TTDLP reserved tokens their earned fees, a 2%
          daily pool payout, and provides liquidity to TDD-TRX staked pools,
          encouraging trading, and fee generation, vaulting the value of your
          TDDFRM staked position.
        </Typography>
      </Grid>

      <CardContent className={classes.content}>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}></Grid>
          <Grid item md={1} xs={1}></Grid>
          <Grid item md={5} xs={5} s={5}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              onClick={handleWithdral}
              className={classes.margin}
              style={{
                background: "linear-gradient(to right, #4700d5, #8C9EFF)",

                color: "white",
              }}
            >
              Withdrawal
            </Button>
          </Grid>
          <Grid item md={5} xs={5} s={5}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              color="primary"
              onClick={handleReinvest}
              className={classes.margin}
              style={{
                background: "linear-gradient(to right, #D50000, #ff8c8c)",
                color: "white",
              }}
            >
              Reinvest
            </Button>
          </Grid>
        </Grid>
        <br></br>
        <Divider />
        <div className={classes.statsContainer}>
          <div className={classes.statsItem}>
            <Typography
              align="center"
              component="h6"
              gutterBottom
              variant="overline"
            >
              TDDFRM Balance
            </Typography>
            <Typography align="center" variant="h4">
              {userTokenBalance.toFixed(2)}
            </Typography>
          </div>
          <div className={classes.statsItem}>
            <Typography
              align="center"
              component="h6"
              gutterBottom
              variant="overline"
            >
              Dividend
            </Typography>
            <Typography align="center" variant="h4">
              {userDividend.toFixed(2)} {` trx`}
            </Typography>
          </div>
          <div className={classes.statsItem}>
            <Typography
              align="center"
              component="h6"
              gutterBottom
              variant="overline"
            >
              TRX Balance
            </Typography>
            <Typography align="center" variant="h4">
              {walletBalance.toFixed(2)} {` `} trx
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.statsContainer}>
          <div className={classes.statsItem}>
            <Grid item md={12} xs={12}>
              <OutlinedInput
                //className={classes.margin}
                label="Deposit trx"
                variant="outlined"
                id="entervaluetxt"
                type={"text"}
                classes={outlinedInputClasses}
                notched={false}
                fullWidth
                onChange={handleAddTrxTextChange}
                value={trxInputTextValue}
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
                    <IconButton
                      aria-label="token"
                      //onClick={handleMax}
                      //onMouseDown={handleMax}
                      edge="end"
                      //  className={classes.iconButton}
                    >
                      <Avatar src={TrxImage} />
                    </IconButton>
                    <IconButton
                      aria-label="max"
                      onClick={handleMax}
                      onMouseDown={handleMax}
                      edge="end"
                      className={classes.iconButton}
                    >
                      <Typography className={classes.centertext}>
                        TRX
                      </Typography>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <br></br>
            <Button
              variant="contained"
              size="large"
              color="primary"
              disabled={
                walletBalance >= trxInputTextValue &&
                tokenBalance >= tokensNeededForAdd
                  ? false
                  : true
              }
              onClick={handleOpen}
              className={classes.margin}
              style={{
                background: "linear-gradient(to right, #D50000, #8C9EFF)",
                color: "white",
              }}
            >
              {walletBalance >= trxInputTextValue && "Deposit"}
              {walletBalance < trxInputTextValue && "Not Enough TRX"}
            </Button>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            ></Grid>
            <Typography className={classes.centertext} variant="h6">
              Bonus Reward: Mine Dash at a 10 to 1 ratio on all deposits
            </Typography>
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
                    <Grid container spacing={2}>
                      <Grid item md={12} xs={12}>
                        <Typography className={classes.centertext} variant="h4">
                          Deposit
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item md={6} xs={12} sm={12}>
                        <Typography
                          className={classes.centertextarea}
                          variant="h6"
                        >
                          A transaction fee of 10% is charged on all deposits
                          that is distributed to the pool in the following
                          manner: 4% of fees are payed instantly, 4% goes to a
                          2% daily drip, and 2% is permanently locked as
                          liquidity.
                        </Typography>
                        <Typography
                          className={classes.centertextarea}
                          variant="h6"
                        >
                          You cannot withdraw your deposit, it will be farmed
                          back with divs over time
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item md={6} xs={12} sm={12}>
                        <OutlinedInput
                          //className={classes.margin}
                          label="Deposit trx"
                          variant="outlined"
                          id="entervaluetxt"
                          type={"text"}
                          classes={outlinedInputClasses}
                          notched={false}
                          fullWidth
                          disabled
                          style={{ color: "white" }}
                          // onChange={handleAddTrxTextChange}
                          value={trxInputTextValue}
                          margin="normal"
                          endAdornment={
                            <InputAdornment
                              position="end"
                              className={classes.inputAdornment}
                            >
                              <IconButton
                                aria-label="token"
                                //onClick={handleMax}
                                //onMouseDown={handleMax}
                                edge="end"
                                //  className={classes.iconButton}
                              >
                                <Avatar src={TrxImage} />
                              </IconButton>
                              <IconButton
                                aria-label="max"
                                // onClick={handleMax}
                                //onMouseDown={handleMax}
                                edge="end"
                                className={classes.iconButton}
                              >
                                <Typography className={classes.centertext}>
                                  TRX
                                </Typography>
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </Grid>
                    </Grid>
                    <br></br>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item md={6} xs={12} sm={12}>
                        <Button
                          variant="contained"
                          fullWidth
                          size="large"
                          color="primary"
                          onClick={handleDeposit}
                          className={classes.margin}
                          style={{
                            background:
                              "linear-gradient(to right, #D50000, #8C9EFF)",
                            color: "white",
                          }}
                        >
                          Deposit
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Fade>
              </Modal>
            </div>
            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openInfo}
                onClose={handleCloseInfo}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openInfo}>
                  <div className={classes.paper}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item md={12} xs={12} sm={12}>
                        <Typography className={classes.centertext} variant="h5">
                          Contract Address
                        </Typography>
                      </Grid>
                      <Grid item md={6} xs={12} sm={12}>
                        <Typography
                          className={classes.centertext}
                          variant="h6"
                          href="https://tronscan.org/#/contract//code"
                        >
                          <Link
                            color="inherit"
                            target="_blank"
                            //   component={RouterLink}
                            // to={customer.website}
                            href={
                              "https://tronscan.org/#/contract/" +
                              dappAddress +
                              "/code"
                            }
                            variant="h6"
                          >
                            {dappAddress}
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                    <br></br>
                    <Grid item md={12} xs={12} sm={12}>
                      <Typography className={classes.centertext} variant="h5">
                        Fees
                      </Typography>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item md={6} xs={12} sm={12}>
                        <Typography className={classes.centertext} variant="h6">
                          A transaction fee of 10% is charged on all deposits
                          that is distributed to the pool in the following
                          manner: 4% of fees are payed instantly, 4% goes to a
                          2% daily drip, and 2% is permanently locked as
                          liquidity.
                        </Typography>
                      </Grid>
                    </Grid>
                    <br></br>
                    <Grid item md={12} xs={12} sm={12}>
                      <Typography className={classes.centertext} variant="h5">
                        Bonus Rewards
                      </Typography>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item md={6} xs={12} sm={12}>
                        <Typography className={classes.centertext} variant="h6">
                          For a limited time mine DASH deflationary token at a
                          10:1 ratio on all deposits
                        </Typography>
                      </Grid>
                    </Grid>
                    <br></br>
                    <Divider />
                    <div className={classes.statsContainer}>
                      <div className={classes.statsItem}>
                        <Typography
                          align="center"
                          component="h6"
                          gutterBottom
                          variant="overline"
                        >
                          Dividend Pool
                        </Typography>
                        <Typography align="center" variant="h4">
                          {dividendPool.toFixed(2)} trx /
                          {dividendPoolToken.toFixed(2)} tdd
                        </Typography>
                      </div>
                      <div className={classes.statsItem}>
                        <Typography
                          align="center"
                          component="h6"
                          gutterBottom
                          variant="overline"
                        >
                          Contract Balance
                        </Typography>
                        <Typography align="center" variant="h4">
                          {contractBalance.toFixed(2)} {` tddlp`}
                        </Typography>
                      </div>
                      <div className={classes.statsItem}>
                        <Typography
                          align="center"
                          component="h6"
                          gutterBottom
                          variant="overline"
                        >
                          Members
                        </Typography>
                        <Typography align="center" variant="h4">
                          {memberCount}
                        </Typography>
                      </div>
                    </div>
                    <Divider />
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

DappCard.propTypes = {
  className: PropTypes.string,
};

export default DappCard;

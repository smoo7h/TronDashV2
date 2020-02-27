import React, { useState, useEffect, useInterval, useRef } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Container,
  Tabs,
  Tab,
  Divider,
  colors,
  Grid,
  Avatar
} from "@material-ui/core";
import axios from "axios";
import BigNumber from "bignumber.js";
import Page from "src/components/Page";
import Header from "./Header";
import Summary from "./Summary";
import Invoices from "./Invoices";
import LatestProjects from "./LatestProjects";
import Logs from "./Logs";

import TotalTransactions from "./TotalTransactions";
import DappInfo from "./DappInfo";
import Invest from "./Invest";
import Devest from "./Devest";
import TotalVolume from "./TotalVolume";

import DividendPool from "./DividendPool";
import NumberOfPlayers from "./NumberOfPlayers";
import PerformanceOverTime from "./PerformanceOverTime";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.white
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  },
  grid: {
    marginTop: theme.spacing(2)
  }
}));
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DashBank({ match, history }) {
  const classes = useStyles();
  const [dappData, setdappData] = useState(null);
  const [dataFetched, setdataFetched] = useState(false);
  const [timerrunning, settimerrunning] = useState(false);
  const [numberOfUsers, setnumberOfUsers] = useState(0);
  const [volume, setVolume] = useState(0);

  const [tick, setTick] = useState(1);
  const { id, tab: currentTab } = match.params;
  const tabs = [
    { value: "about", label: "About" },
    { value: "transactions", label: "Transactions" },
    { value: "leaderboard", label: "Leaderboard" }
  ];

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

  const fetchContractValue = async (
    rowItem,
    fieldName,
    contractAddress,
    functionSelector,
    contractParameter,
    dappDecimals,
    functionItem
  ) => {
    let returnValue;

    //check if we have a number instead of a function if we do just use
    if (functionItem.ServerValue) {
      //check if its an estimated field if it is we need 2 do math
      let currentObject = dappData;
      //add return value to the object
      currentObject[fieldName] = Number(functionItem.ServerValue);

      //update the state
      setdappData(currentObject => currentObject);
    } else {
      if (contractParameter == "@UserAddress") {
        contractParameter = window.tronWeb.defaultAddress.base58;
      }

      if (functionSelector == "@ContractBalance") {
        //just get the contact balance 6 044 007 486709
        returnValue = await window.tronWeb.trx.getBalance(contractAddress);
        let currentObject = dappData;
        //check if its in the list
        currentObject[fieldName] = returnValue * 0.000001; //always 6 decimal places because its trx

        //update the state
        setdappData(currentObject);
      } else {
        //get the contacct value
        window.tronWeb
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
            let returnValueIndexd =
              getbalance1[
                Object.keys(getbalance1)[functionItem.ReturnValueIndex]
              ];
            let numchec = new BigNumber(returnValueIndexd);

            //set the value
            let multiplier = Math.pow(10, dappDecimals * -1);
            returnValue = Number(numchec) * multiplier;
            //remove the decmalls
            returnValue = returnValue;

            let currentObject = dappData;
            //add return value to the object
            currentObject[fieldName] = returnValue;

            //update the state
            setdappData(currentObject => currentObject);
            console.log(dappData);
          });
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    const fetchContractData = contractAddress => {
      if (contractAddress.length == 34) {
        axios
          .get(
            "https://trondashdashbankdata.azurewebsites.net/api/GetTronDashDashBankData?code=lUbha0ckHPiJEPYzrIkq0taQWJm5CUs7e6bGOJANP4Oct4VbshcEOA==&contractaddress=" +
              contractAddress
          )
          .then(response => {
            setdappData(response.data);

            setdataFetched(true);
          });
      }
    };
    //get contract address
    let contractAddress = match.params.id;

    //get the data from the API
    if (mounted) {
      fetchContractData(contractAddress);
    }
    return () => {
      mounted = false;
    };
  }, []);

  //this is the data refresh timer
  useEffect(() => {
    if (dappData) {
      //now grab the values from the
      fetchContractValue(
        dappData,
        "CurrentUserInvestment",
        dappData.Investment.ContractAddress,
        dappData.Investment.ContractFunctionSelector,
        dappData.Investment.ContractParameter,
        dappData.Investment.Decimals,
        dappData.Investment
      );

      //CurrentUserDivs
      fetchContractValue(
        dappData,
        "CurrentUserDivs",
        dappData.UserDividend.ContractAddress,
        dappData.UserDividend.ContractFunctionSelector,
        dappData.UserDividend.ContractParameter,
        dappData.UserDividend.Decimals,
        dappData.UserDividend
      );

      //user CurrentDivPool
      fetchContractValue(
        dappData,
        "CurrentDivPool",
        dappData.DivPool.ContractAddress,
        dappData.DivPool.ContractFunctionSelector,
        dappData.DivPool.ContractParameter,
        dappData.DivPool.Decimals,
        dappData.DivPool
      );

      //user buy price
      fetchContractValue(
        dappData,
        "CurrentBuyPrice",
        dappData.BuyPrice.ContractAddress,
        dappData.BuyPrice.ContractFunctionSelector,
        dappData.BuyPrice.ContractParameter,
        dappData.BuyPrice.Decimals,
        dappData.BuyPrice
      );
      //user sell price
      fetchContractValue(
        dappData,
        "CurrentSellPrice",
        dappData.SellPrice.ContractAddress,
        dappData.SellPrice.ContractFunctionSelector,
        dappData.SellPrice.ContractParameter,
        dappData.SellPrice.Decimals,
        dappData.SellPrice
      );
    }

    return () => {
      settimerrunning(true);
    };
  }, dappData);

  const [data, setData] = useState([
    163,
    166,
    161,
    159,
    99,
    163,
    173,
    166,
    167,
    183,
    176,
    172
  ]);

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const handleNumberOfUsersChange = value => {
    setnumberOfUsers(value);
  };

  const handleVolumeChange = value => {
    setVolume(value);
  };

  useInterval(() => {
    //this is the data refresh interval it will refresh every x amount of time after the %
    setTick(tick => tick + 1);
    if (tick % 5 == 0) {
      console.log(tick);
      //fetchCustomers();
    }
  }, 1000);

  if (!currentTab) {
    return <Redirect to={`/dashbank/${id}/transactions`} />;
  }

  if (!tabs.find(tab => tab.value === currentTab)) {
    return <Redirect to="/errors/error-404" />;
  }

  if (!dappData) {
    return <div>loading</div>;
  }

  return (
    <Page className={classes.root} title="DashBank">
      <Container maxWidth={false}>
        <Header />
        <Grid container spacing={3} className={classes.grid}>
          <Grid item lg={3} sm={6} xs={12}>
            <DividendPool dappData={dappData ? dappData : 0} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <NumberOfPlayers
              dappData={dappData ? dappData : 0}
              numberOfusers={numberOfUsers}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TotalTransactions dappData={dappData ? dappData : 0} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TotalVolume
              dappData={dappData ? dappData : 0}
              totalVolume={volume}
            />
          </Grid>
          <Grid item lg={3} xs={12}>
            <DappInfo dappData={dappData ? dappData : 0} />
          </Grid>
          <Grid item lg={3} xs={12}>
            <Invest dappData={dappData ? dappData : 0} />
            <br />
            <Devest dappData={dappData ? dappData : 0} />
          </Grid>
          <Grid item lg={6} xs={12}>
            <PerformanceOverTime
              dappdata={dappData ? dappData : 0}
              handleNumberOfUsersChange={handleNumberOfUsersChange}
              handleVolumeChange={handleVolumeChange}
            />
          </Grid>
        </Grid>

        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={currentTab}
          variant="scrollable"
        >
          {tabs.map(tab => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {currentTab === "about" && (
            <Summary dappData={dappData ? dappData : 0} />
          )}
          {currentTab === "transactions" && (
            <LatestProjects dappData={dappData ? dappData : 0} />
          )}
          {currentTab === "leaderboard" && (
            <Logs dappData={dappData ? dappData : 0} />
          )}
        </div>
      </Container>
    </Page>
  );
}

DashBank.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default DashBank;

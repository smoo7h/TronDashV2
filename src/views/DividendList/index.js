import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
//import axios from 'src/utils/axios';
import axios from "axios";
import Page from "src/components/Page";
import SearchBar from "src/components/SearchBar";
import Header from "./Header";
import Results from "./Results";
import Statistics from "./Statistics";
import TronWeb from "tronweb";
import BigNumber from "bignumber.js";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  loading: {
    display: "flex",
    alignItems: "center"
  }
}));

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

function DividendList() {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [tick, setTick] = useState(1);

  const handleFilter = () => {};

  const handleSearch = () => {};

  //use

  //use
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
    let updatelist = customers;
    let objIndex = updatelist.findIndex(obj => obj.ID == rowItem.ID);
    //get the latest datapoint from state
    if (objIndex >= 0) {
      rowItem = customers[objIndex];
    }
    //check if we have a number instead of a function if we do just use
    if (functionItem.ServerValue) {
      rowItem[fieldName] = Number(functionItem.ServerValue);
      //check if its an estimated field if it is we need 2 do math
      if (
        fieldName == "TotalStaked" &&
        rowItem.CurrentUserInvestment &&
        rowItem.CurrentDivPool &&
        rowItem.EstimageDivs
      ) {
        //okay we need to do some maths here to calculate the estimated divs
        var divamount = rowItem.CurrentDivPool * Number(rowItem.DivPoolDivider);
        var totalfrozen = functionItem.ServerValue;
        let estimatedProfit =
          (divamount / totalfrozen) * rowItem.CurrentUserInvestment;
        returnValue = estimatedProfit;
        rowItem["EstimatedDivs"] = returnValue;
      }

      // if it is push otherwise update
      if (objIndex == -1) {
        updatelist.push(rowItem);
      } else {
        updatelist[objIndex] = rowItem;
      }
      //update the state
      setCustomers(updatelist => updatelist);
    } else {
      if (contractParameter == "@UserAddress") {
        contractParameter = window.tronWeb.defaultAddress.base58;
      }

      if (functionSelector == "@ContractBalance") {
        //just get the contact balance
        returnValue = await window.tronWeb.trx.getBalance(contractAddress);

        //check if its in the list
        rowItem[fieldName] = returnValue * 0.000001; //always 6 decimal places because its trx

        let objIndex = updatelist.findIndex(obj => obj.ID == rowItem.ID);
        // if it is push otherwise update
        if (objIndex == -1) {
          updatelist.push(rowItem);
        } else {
          updatelist[objIndex] = rowItem;
        }
        //update the state
        setCustomers(updatelist => updatelist);
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

            //if this is a estimated dividend do the calculation here
            if (
              fieldName == "TotalStaked" &&
              rowItem.CurrentUserInvestment &&
              rowItem.CurrentDivPool &&
              rowItem.EstimageDivs
            ) {
              //okay we need to do some maths here to calculate the estimated divs
              var divamount =
                rowItem.CurrentDivPool * Number(rowItem.DivPoolDivider);
              var totalfrozen = returnValue;
              let estimatedProfit =
                (divamount / totalfrozen) * rowItem.CurrentUserInvestment;
              returnValue = estimatedProfit;
              //dont return negitaves
              if (returnValue < 0) {
                returnValue = 0;
              }
              rowItem["EstimatedDivs"] = returnValue;
            }

            //add return value to the object
            rowItem[fieldName] = returnValue;

            //check if its in the list
            let objIndex = updatelist.findIndex(obj => obj.ID == rowItem.ID);
            // if it is push otherwise update
            if (objIndex == -1) {
              updatelist.push(rowItem);
            } else {
              updatelist[objIndex] = rowItem;
            }
            //update the state
            setCustomers(updatelist => updatelist);
            //not sure what the line below does but maybe it updates the list
            // setCustomers(updatelist => [...customers, updatelist]);
          });
      }
    }
  };

  const fetchCustomers = async () => {
    //get data from our api server
    axios
      .get(
        "https://trondashdappdatav2.azurewebsites.net/api/GetTronDashData?code=qOwvPJ6qxBfsGyozUauaoi082IZUMo9xl6h5smuvsMDKRS4PWV6i6w==&user=" +
          window.tronWeb.defaultAddress.hex
      )
      .then(response => {
        //now get data for each contract function we
        response.data.map(async (item, key) => {
          //divpool
          fetchContractValue(
            item,
            "CurrentDivPool",
            item.DivPool.ContractAddress,
            item.DivPool.ContractFunctionSelector,
            item.DivPool.ContractParameter,
            item.DivPool.Decimals,
            item.DivPool
          );
          //CurrentUserDivs
          fetchContractValue(
            item,
            "CurrentUserDivs",
            item.UserDividend.ContractAddress,
            item.UserDividend.ContractFunctionSelector,
            item.UserDividend.ContractParameter,
            item.UserDividend.Decimals,
            item.UserDividend
          );
          //user investment
          fetchContractValue(
            item,
            "CurrentUserInvestment",
            item.Investment.ContractAddress,
            item.Investment.ContractFunctionSelector,
            item.Investment.ContractParameter,
            item.Investment.Decimals,
            item.Investment
          );

          //ony get this if its an estimate in the db
          if (item.EstimageDivs) {
            //CurrentUserDivsEstimated
            fetchContractValue(
              item,
              "TotalStaked",
              item.TotalStaked.ContractAddress,
              item.TotalStaked.ContractFunctionSelector,
              item.TotalStaked.ContractParameter,
              item.TotalStaked.Decimals,
              item.TotalStaked
            );
          }
          //only do this for ones that require an estimate
        });
      });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchCustomers();
    }
    return () => {
      mounted = false;
    };
  }, []);

  useInterval(() => {
    //this is the data refresh interval it will refresh every x amount of time after the %
    setTick(tick => tick + 1);
    if (tick % 5 == 0) {
      console.log(tick);
      fetchCustomers();
    }
  }, 1000);

  return (
    <Page className={classes.root} title="TronDash">
      <Container maxWidth={false}>
        <Statistics className={classes.statistics} customers={customers} />
        {customers && (
          <div>
            <Results className={classes.results} customers={customers} />
          </div>
        )}
        {customers.length == 0 && (
          <Container maxWidth={false} className={classes.loading}>
            <CircularProgress color="primary" />
          </Container>
        )}
      </Container>
    </Page>
  );
}

export default DividendList;

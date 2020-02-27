import React, { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import GenericMoreButton from "src/components/GenericMoreButton";
import Chart from "./Chart";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {},
  buttons: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      marginLeft: theme.spacing(1)
    }
  },
  inner: {
    height: 375,
    minWidth: 500
  },
  chart: {
    height: "100%"
  }
}));

function PerformanceOverTime({
  className,
  dappdata,
  handleNumberOfUsersChange,
  handleVolumeChange,
  ...rest
}) {
  const classes = useStyles();

  const [transactions, setTransactions] = useState([]);
  const [chartelements, setchartelements] = useState([]);
  const [numberOfUsers, setnumberOfUsers] = useState(0);
  const [volume, setVolume] = useState(0);
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
    if (numberOfUsers > 0) {
      let totalusers = numberOfUsers;
      handleNumberOfUsersChange(totalusers);
    }

    return () => {
      mounted = false;
    };
  }, [numberOfUsers]);

  useEffect(() => {
    let mounted = true;
    if (numberOfUsers > 0) {
      let totalVolume = volume;
      handleVolumeChange(totalVolume);
    }

    return () => {
      mounted = false;
    };
  }, [volume]);

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

    return theday;
  }

  function getDailyUsers(transactions) {
    //get the daily unique users
    var result = transactions.reduce(
      (acc, o) => (
        (acc[o.result.customerAddress] =
          (acc[o.result.customerAddress] || 0) + 1),
        acc
      )
    );

    let numUSers = Object.keys(result).length;

    return numUSers;
  }

  useEffect(() => {
    let mounted = true;

    const orderData = (transactions, dappdata) => {
      //get our list
      let startingvalue = dappdata.CurrentDivPool;

      //make the graph look better
      if (startingvalue > 10000000) {
        startingvalue = dappdata.CurrentDivPool * 10000;
      } else if (startingvalue > 1000000) {
        startingvalue = dappdata.CurrentDivPool * 100000;
      } else {
        startingvalue = dappdata.CurrentDivPool * 1000000;
      }

      let sortedtransactions = transactions;
      let graphdata = [];
      let graphlabels = [];

      //create the first element on the graph
      graphdata.push(Number(startingvalue).toFixed(0));
      graphlabels.push(
        convertDateToString(sortedtransactions[0].block_timestamp)
      );

      sortedtransactions.forEach(element => {
        let lastnumber = graphdata[graphdata.length - 1];

        if (element.transactiontype == "Invest") {
          //get the bottom of the stack
          let numertor =
            element.result[dappdata.InvestEvent.AmountEventQualifier];
          let newvalue = Number(lastnumber) - numertor;
          graphdata.push(Number(newvalue).toFixed(0));
          graphlabels.push(convertDateToString(element.block_timestamp));
        } else if (element.transactiontype == "Reinvest") {
          let lastnumber = graphdata[graphdata.length - 1];
          let numertor =
            element.result[dappdata.ReInvestEvent.AmountEventQualifier];
          let newvalue = Number(lastnumber) - numertor;
          graphdata.push(Number(newvalue).toFixed(0));
          graphlabels.push(convertDateToString(element.block_timestamp));
        } else if (element.transactiontype == "Devest") {
          //get the bottom of the stack
          let lastnumber = graphdata[graphdata.length - 1];
          let numertor =
            element.result[dappdata.DeVestEvent.AmountEventQualifier];
          let newvalue = Number(lastnumber) + numertor;
          graphdata.push(Number(newvalue).toFixed(0));
          graphlabels.push(convertDateToString(element.block_timestamp));
        } else if (element.transactiontype == "Withdraw") {
          //get the bottom of the stack
          //

          let lastnumber = graphdata[graphdata.length - 1];
          let ele = dappdata.WithdrawalEvent.AmountEventQualifier.toString();
          let numertor = element.result.tronWithdrawn;
          let newvalue = Number(lastnumber) + numertor;
          if (newvalue) {
            graphdata.push(Number(newvalue).toFixed(0));
            graphlabels.push(convertDateToString(element.block_timestamp));
          }
        }
      });

      graphdata = graphdata.reverse();
      graphlabels = graphlabels.reverse();

      let decimalgraphdata = graphdata.map(x => {
        x = x * 0.000001;

        return x.toFixed(0);
      });

      const data = {
        dappGraphData: {
          data: decimalgraphdata,
          labels: graphlabels
        }
      };

      return data;
    };

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
              x.result[amountQualifier] = returnValue;

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
        dappdata.DeVestEvent.ContractAddress,
        dappdata.DeVestEvent.EventName,
        "Devest",
        "red",
        dappdata.DeVestEvent.AmountEventQualifier,
        dappdata.DeVestEvent.Decimals
      );
    } else if (loadcount == 1) {
      fetchProjects(
        dappdata.ReInvestEvent.ContractAddress,
        dappdata.ReInvestEvent.EventName,
        "Reinvest",
        "green",
        dappdata.ReInvestEvent.AmountEventQualifier,
        dappdata.ReInvestEvent.Decimals
      );
    } else if (loadcount == 2) {
      //fetch sells
      fetchProjects(
        dappdata.InvestEvent.ContractAddress,
        dappdata.InvestEvent.EventName,
        "Invest",
        "green",
        dappdata.InvestEvent.AmountEventQualifier,
        dappdata.InvestEvent.Decimals
      );
    } else if (loadcount == 3) {
      fetchProjects(
        dappdata.WithdrawalEvent.ContractAddress,
        dappdata.WithdrawalEvent.EventName,
        "Withdraw",
        "red",
        dappdata.WithdrawalEvent.AmountEventQualifier,
        dappdata.WithdrawalEvent.Decimals
      );
    } else if (loadcount == 4) {
      //draw the graph showhow
      if (dappdata && dappdata.CurrentDivPool) {
        //get the data 4 chart
        let returnedData = orderData(transactions, dappdata);
        setchartelements(returnedData.dappGraphData);
        //get userCount
        let totalusers = getDailyUsers(transactions);
        setnumberOfUsers(totalusers);

        function get24HourVolume(trans, timestamp) {
          //get current time stamp
          let total = 0;
          //subtrace a day from the time stamp
          timestamp = timestamp - 86400000;
          trans.forEach(element => {
            if (element.block_timestamp > timestamp) {
              total = total + Object.values(element.result)[1];
            }
          });
          //get the decimal value

          let multiplier = Math.pow(10, dappdata.Invest.Decimals * -1);
          let totalValue = total * multiplier;

          return totalValue;
        }

        let currenTimeStamp = window.tronWeb.trx
          .getCurrentBlock()
          .then(response => {
            let currentstamp = response.block_header.raw_data.timestamp;

            let totalTransactions = get24HourVolume(transactions, currentstamp);

            setVolume(totalTransactions);
          });
      }
    }

    return () => {
      mounted = false;
    };
  }, [loadcount]);

  if (chartelements.length <= 30) {
    return <div>loading</div>;
  }
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        //action={<GenericMoreButton />}
        title="Dividend Pool Balance Over Time"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Chart
              className={classes.chart}
              data={chartelements.data}
              labels={chartelements.labels}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
}

PerformanceOverTime.propTypes = {
  className: PropTypes.string
};

export default PerformanceOverTime;

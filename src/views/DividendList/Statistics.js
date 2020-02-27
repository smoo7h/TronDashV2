import React, { useState, useEffect, useRef, setTimeoutCount } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Grid, colors } from '@material-ui/core';
import axios from 'axios';
import Label from 'src/components/Label';
import TronWeb from 'tronweb';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  overline: {
    marginTop: theme.spacing(1)
  }
}));

function Statistics({ className, customers, ...rest }) {
  const classes = useStyles();

  const [trxBalance, settrxBalance] = useState(null);
  const [divBalance, setdivBalance] = useState(null);
  const [divsPerDay, setdivsPerDay] = useState(0);
  const [userEnergy, setuserEnergy] = useState(0);
  const [userBandwidth, setuserBandwidth] = useState(0);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
      fetchBalance();
      fetchEnergy();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //calculate div total balance
    if (customers) {
      let totaldivs = customers.reduce(function(prev, cur) {
        if (
          cur.UserDividend.Currency == 'trx' &&
          cur.CurrentUserDivs &&
          !cur.DivPoolPreFix
        ) {
          return prev + cur.CurrentUserDivs;
        } else {
          return prev;
        }
      }, 0);
      setdivBalance(totaldivs ? totaldivs.toFixed(2) : 0);
    }
  });

  useEffect(() => {
    //calculate the divs per day
    if (customers) {
      let totaldivs = customers.reduce(function(prev, cur) {
        if (cur.DivPoolPreFix == '*' && cur.EstimatedDivs) {
          return prev + cur.EstimatedDivs;
        } else if (
          cur.DappType.Name == 'Bank' &&
          cur.UserDividend.Currency == 'trx'
        ) {
          //calculate bank divs at 0.001% a day estimate
          var dailyestimate = cur.CurrentUserInvestment * 0.001;
          return prev + dailyestimate;
        } else {
          return prev;
        }
      }, 0);
      setdivsPerDay(totaldivs ? totaldivs.toFixed(2) : 0);
    }
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchBalance();
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchEnergy();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const fetchBalance = () => {
    let currentuseraddress = window.tronWeb.defaultAddress.base58;
    if (window.tronWeb) {
      window.tronWeb.trx.getBalance(
        currentuseraddress,
        (error, contractBalance) => {
          if (error) return console.error(error);
          settrxBalance((contractBalance * 0.000001).toFixed(2));
        }
      );
    }
  };

  const fetchEnergy = () => {
    let currentuseraddress = window.tronWeb.defaultAddress.base58;
    if (window.tronWeb) {
      axios
        .get(
          'https://apilist.tronscan.org/api/account?address=' +
            window.tronWeb.defaultAddress.base58
        )
        .then(response => {
          setuserEnergy(
            response.data.bandwidth.energyRemaining.toLocaleString()
          );
          setuserBandwidth(
            response.data.bandwidth.freeNetRemaining.toLocaleString()
          );
        })
        .catch(error => {
          console.error('Error during service worker registration:', error);
        });
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="center" container justify="space-between">
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Typography variant="h2">{trxBalance} trx</Typography>
          <Typography className={classes.overline} variant="overline">
            Wallet Amount
          </Typography>
        </Grid>
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <div className={classes.titleWrapper}>
            <Typography variant="h2">
              {divBalance ? divBalance : 0} trx
            </Typography>
            {divBalance > 0 && (
              <Label className={classes.label} color={colors.green[600]}>
                ^
              </Label>
            )}
          </div>
          <Typography className={classes.overline} variant="overline">
            Available Divs
          </Typography>
        </Grid>
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <Typography variant="h2">
            {`* `}
            {divsPerDay} trx
          </Typography>
          <Typography className={classes.overline} variant="overline">
            Divs Per Day
          </Typography>
        </Grid>
        <Grid className={classes.item} item md={3} sm={6} xs={12}>
          <div className={classes.titleWrapper}>
            <Typography component="span" variant="h2">
              {userEnergy}
            </Typography>
          </div>
          <Typography className={classes.overline} variant="overline">
            Energy
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

Statistics.propTypes = {
  className: PropTypes.string
};

export default Statistics;

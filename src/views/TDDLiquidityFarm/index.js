import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Swap from "src/views/TDDLiquidityFarm/Swap";
import Pool from "src/views/TDDLiquidityFarm/DappCard";
import { makeStyles } from "@material-ui/styles";
import Dashimage from "../../assets/dashcoinlogo.png";
import Avatar from "@material-ui/core/Avatar";
import Whitepaper from "src/assets/TDWP.pdf";
import withWidth from "@material-ui/core/withWidth";

import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
  TextField,
  Switch,
  Button,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    backgroundColor: "transparent",

    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2),
    },
  },
  actions: {
    justifyContent: "flex-end",
  },
  card: {
    // [theme.breakpoints.up("sm")]: {
    // backgroundColor: "#424242",
    // },
  },
  buycard: {
    backgroundColor: "#212121",
  },
  divider: {
    width: 1,
    height: 24,
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

  centerbtn: {
    textAlign: "center",
    margin: "auto",
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  centertext: {
    textAlign: "center",
  },
}));

function TDDLiquidityFarm({ open, onClose, customer, className, ...rest }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    ...customer,
  });

  const [tokenAddress, setTokenAddress] = useState(
    "TQ2Qyqu6rPXskGGfcPSkF8X7vYnfLMxCx5"
  );
  const [swapAddress, setSwapAddress] = useState(
    "TYtCU5129eRyMF35g3dz7J3Nan5kqAkg67"
  );

  const handleFieldChange = (event) => {
    event.persist();
    setValues((currentValues) => ({
      ...currentValues,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  };

  return (
    <Card className={clsx(classes.root)}>
      <form className={classes.card}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item lg={3} xl={3} xs={12}></Grid>
            <Grid item lg={6} xl={6} xs={12}>
              <Card>
                <Pool
                  swapAddress={swapAddress}
                  tokenAddress={tokenAddress}
                  className={classes.buycard}
                />
              </Card>
            </Grid>
            <Grid item lg={3} xl={3} xs={12}></Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
}

TDDLiquidityFarm.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

TDDLiquidityFarm.defaultProps = {};

export default withWidth()(TDDLiquidityFarm);

import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Swap from "src/views/DashSwap/Swap";
import Pool from "src/views/DashSwap/Pool";
import { makeStyles } from "@material-ui/styles";
import Dashimage from "../../assets/dashcoinlogo.png";
import Avatar from "@material-ui/core/Avatar";
import Whitepaper from "src/assets/TDWP.pdf";
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
    padding: theme.spacing(3),
    backgroundColor: "transparent",
  },
  actions: {
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#424242",
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

function DashSwap({ open, onClose, customer, className, ...rest }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    ...customer,
  });
  const [viewState, setviewState] = useState("swap");

  const [tokenAddress, setTokenAddress] = useState(
    "TTaWvzX3mLA587AQ6V2qs9t72rqoLE1sh5"
  );
  const [swapAddress, setSwapAddress] = useState(
    "TVUu7s1DLLhegheMYhoNcyo9qY6ER6PZh7"
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
  const handlePoolClick = () => {
    setviewState("pool");
  };
  const handleSwapClick = () => {
    setviewState("swap");
  };

  return (
    <Card className={clsx(classes.root)}>
      <form className={classes.card}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item lg={3} xl={3} xs={12}></Grid>
            <Grid item lg={6} xl={6} xs={12}>
              <Card>
                {viewState == "swap" && (
                  <Swap
                    swapAddress={swapAddress}
                    tokenAddress={tokenAddress}
                    className={classes.buycard}
                    swapClick={handleSwapClick}
                    poolClick={handlePoolClick}
                  />
                )}
                {viewState == "pool" && (
                  <Pool
                    swapAddress={swapAddress}
                    tokenAddress={tokenAddress}
                    swapClick={handleSwapClick}
                    poolClick={handlePoolClick}
                    className={classes.buycard}
                  />
                )}
              </Card>
            </Grid>
            <Grid item lg={3} xl={3} xs={12}></Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
}

DashSwap.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

DashSwap.defaultProps = {};

export default DashSwap;

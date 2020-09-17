import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import FarmCard from "src/views/Farm/FarmCard";
import { makeStyles } from "@material-ui/styles";
import Dashimage from "../../assets/dashcoinlogo.png";
import Avatar from "@material-ui/core/Avatar";
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

function DashFarm({ open, onClose, customer, className, ...rest }) {
  const classes = useStyles();
  const [farmName, setfarmName] = useState("");
  const [farmIcon, setfarmIcon] = useState("🥑");
  const [values, setValues] = useState({
    ...customer,
  });

  return (
    <Card className={clsx(classes.root)}>
      <div className={classes.card}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Avatar src={Dashimage} className={classes.large} />
              <br />
              <Typography className={classes.centertext} variant="h2">
                Select a Farm
              </Typography>
              <br />
              <Typography className={classes.centertext} variant="h3">
                Earn DASH token by providing liquidity
              </Typography>
            </Grid>
          </Grid>
          <br></br>
          <Grid container spacing={3}>
            <Grid item lg={4} xl={4} xs={12}>
              <Card>
                <FarmCard className={classes.buycard} />
              </Card>
            </Grid>
            <Grid item lg={4} xl={4} xs={12}>
              <Card>
                <FarmCard className={classes.buycard} />
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
}

DashFarm.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

DashFarm.defaultProps = {};

export default DashFarm;

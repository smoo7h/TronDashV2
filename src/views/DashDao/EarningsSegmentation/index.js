import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
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
}));

function EarningsSegmentation({ className, ...rest }) {
  const classes = useStyles();
  const [earnings, setEarnings] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchEarnings = () => {
      axios.get("/api/dashboard/earnings").then((response) => {
        if (mounted) {
          setEarnings(response.data.earnings);
        }
      });
    };

    fetchEarnings();

    return () => {
      mounted = false;
    };
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Presale" className={classes.centertext} />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.chartContainer}>
          <Chart className={classes.chart} data={earnings} />
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
          <div className={classes.statsItem} key={"sold"}>
            <Typography
              align="center"
              component="h6"
              gutterBottom
              variant="overline"
            >
              {"sold"}
            </Typography>
            <Typography align="center" variant="h4">
              {75}%
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
              {29992}
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
              onClick={handleOpen}
              className={classes.margin}
              style={{
                background: "linear-gradient(to right, #D50000, #8C9EFF)",
                color: "white",
              }}
            >
              Buy
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
                      <Grid item md={4} xs={4}></Grid>
                      <Grid item md={4} xs={4}>
                        <OutlinedInput
                          //className={classes.margin}
                          label="Deposit trx"
                          variant="outlined"
                          id="entervaluetxt"
                          type={"text"}
                          className={classes.root}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="max"
                                // onClick={handleClickShowPassword}
                                //   onMouseDown={handleMouseDownPassword}
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
                        <Typography className={classes.centertext} variant="h5">
                          Balance: 1000 trx
                        </Typography>
                      </Grid>
                      <Grid item md={4} xs={12}></Grid>
                      <Grid item md={4} xs={12}></Grid>
                      <Grid item md={4} xs={12}>
                        <Button
                          variant="contained"
                          fullWidth
                          size="large"
                          color="primary"
                          onClick={handleOpen}
                          className={classes.margin}
                          style={{
                            background:
                              "linear-gradient(to right, #D50000, #8C9EFF)",
                            color: "white",
                          }}
                        >
                          Buy
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

EarningsSegmentation.propTypes = {
  className: PropTypes.string,
};

export default EarningsSegmentation;

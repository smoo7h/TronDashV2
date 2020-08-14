import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Modal,
  Card,
  Link,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  Typography,
  TextField,
  Switch,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: "#333",
  },
  actions: {
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#424242",
  },
}));

function Referral({ open, onClose, customer, className, ...rest }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    ...customer,
  });

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
        <CardHeader title="Referral System" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Typography variant="h5">How it works</Typography>
              <Typography variant="body1">
                When ever a user uses the TronDash platform with your referral
                link all outbound links will be set to your address
                <br></br>
                On select dapps your refferal address will be injected into the
                reinvest contract function
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="h5">Your Referral URL</Typography>
              <Typography variant="body1">
                <Link
                  color="inherit"
                  target="_blank"
                  //   component={RouterLink}
                  // to={customer.website}
                  href={
                    "https://trondash.com/?ref=" +
                    window.tronWeb.defaultAddress.base58
                  }
                  variant="h6"
                >
                  {"https://trondash.com/?ref=" +
                    window.tronWeb.defaultAddress.base58}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
}

Referral.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

Referral.defaultProps = {};

export default Referral;

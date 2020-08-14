import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

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
    backgroundColor: "#333",
  },
  actions: {
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#424242",
  },
}));

function Faq({ open, onClose, customer, className, ...rest }) {
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
        <CardHeader title="Faq" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Typography variant="h5">Who we are</Typography>
              <Typography variant="body1">
                TronDash is the Tron ecosystem’s epicenter for dApp dividend
                management.
                <br></br>
                Pioneering the incorporation of div data into an intuitive
                interface where Tron users can see their daily earnings,
                reinvest, or withdraw it all with a single click.
                <br></br> TronDash streamlines the dApp experience
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="h5">
                The dapp dividend list is not loading
              </Typography>
              <Typography variant="body1">
                Change your node to https://api.tronstack.io for better results
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="h5">
                How is the divs per day calculated
              </Typography>
              <Typography variant="body1">
                This is calculated based on the current div pool sizes in
                relation to your staked tokens
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="h5">How do you get a dapp listed</Typography>
              <Typography variant="body1">
                Please submit your dapp here for review
                <br></br>
                TronDash only lists community vetted dapps
                <br></br>
                <Link
                  color="inherit"
                  target="_blank"
                  //   component={RouterLink}
                  // to={customer.website}
                  href={"https://forms.gle/P5SBw1qJGX7mSAoEA"}
                  variant="h6"
                >
                  {"https://forms.gle/P5SBw1qJGX7mSAoEA"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
}

Faq.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

Faq.defaultProps = {};

export default Faq;

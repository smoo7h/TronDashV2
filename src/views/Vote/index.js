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
    backgroundColor: "transparent",
  },
  actions: {
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#424242",
  },
}));

function Vote({ open, onClose, customer, className, ...rest }) {
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
        <CardHeader title="DAO Voting" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Typography variant="h5">
                No proposal up for voting, please check back later.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
}

Vote.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

Vote.defaultProps = {};

export default Vote;

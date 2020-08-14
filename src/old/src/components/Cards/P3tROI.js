import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import p3tlogo from "../../assets/p3t.png";
import Button from "@material-ui/core/Button";
import Utils from "utils";
import Swal from "sweetalert2";

const styles = theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: "30%"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});
//Utils.setTronWeb(window.tronWeb);
function withdrawl() {
  Utils.p3TDailyROIContract
    .withdraw()
    .send({})
    .then(res =>
      Swal({
        title: "p3t withdrawn success",
        type: "success"
      })
    )
    .catch(err =>
      Swal({
        title: "p3t withdrawn Failed",
        type: "error"
      })
    );

  return;
}

function P3tROI(props) {
  const { classes, theme } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            P3T Daily ROI
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            URL: https://p3t.network/dailyroi/
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Contract: TKbDT4VAwaMENxQUfTih1TZELGndmzB2vz
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Balance: {props.balance}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Investment: {props.investment}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Refferal: {props.refferal}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Dividend: {props.dividend}
          </Typography>
        </CardContent>

        <div className={classes.controls}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
            onClick={d => withdrawl()}
          >
            Withdrawl
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.margin}
          >
            Deposit
          </Button>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={p3tlogo}
        title="Live from space album cover"
      />
      <div> ji </div>
    </Card>
  );
}

P3tROI.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(P3tROI);

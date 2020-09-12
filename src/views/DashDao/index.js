import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import EarningsSegmentation from "src/views/DashDao/EarningsSegmentation";
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
}));

function Dao({ open, onClose, customer, className, ...rest }) {
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
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Avatar src={Dashimage} className={classes.large} />
              <br />
              <Typography className={classes.centertext} variant="h5">
                TronDash DAO
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="body1">
                TronDash is now a DAO, allowing you to secure a portion of the
                innovative dividend management platform that revolutionized the
                ecosystem’s approach to decentralized applications. With well
                over a year of history and experience, Trondash has been
                innovating at the forefront of the Tron ecosystem and steadily
                building community support unlike any other Tron-specific
                platform.
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              The core pain point of early 2019 was the inability of Tron users
              to approach decentralized applications in a centralized way. In
              this highly fragmented environment, users were less apt to
              interact with new dApps. Despite innovative decentralized
              applications being deployed, the frustration over having to visit
              these sites daily or lose their allocated portion of the staking
              pool represented a considerable headache that was dragging the
              ecosystem down in a substantial way. Enter TronDash and their
              innovative approach to pulling API feeds from respective sites and
              introducing a seamless, simple dashboard with powerful features
              never before seen, empowering many decentralized applications to
              enjoy faster growth and made the experience of interfacing with
              the dApp ecosystem that much more user-friendly, revitalizing the
              entire fragile ecosystem.
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="body1">
                Simplicity is the mother of invention and by delivering this
                simplicity, the transformative effect on Tron dApps can not be
                understated and this Newfound ability to interact with several
                dApps a minute as opposed to a few an hour brought about the
                considerable popularity and notoriety of the platform, leading
                to a community appreciation for the innovative tool that started
                it all. This serve as a launching point beyond which TronDash
                further introduced clean, easily understandable, and interactive
                ways to enter a lotto or stake into a pool, years before the
                DeFi craze hit its stride and automated market maker pools
                became all the rage. TronDash took a thought leader ship
                position and ran with it in continually materializing
                innovations that traveled purely by word-of-mouth and gained a
                considerable following among the difficult to impress difficult
                to impress developer community.
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="body1">
                Now that many of the same technologies and the Tron blockchain
                has began to gain traction, the development team felt that this
                is an appropriate opportunity to introduce the platform,
                fittingly, using the latest innovation in governance, the
                decentralized autonomous organization and use the resources to
                further advance this goodwill into being within reach for
                institutional investment and savvy solo blockchain investors.
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="body1">
                Today we're announcing the presale of the DAO tokens , which
                will commence immediately and will be sold at a 10% discount
                until the 23rd of September, at which point it will be listed on
                several exchanges as a crypto pair with TRX and BTC. The core
                developer team is staying right alongside this important and
                impactful project and are excited to see this newfound interest
                in the decentralized finance as a transformative avenue to
                benefit blockchain engineers and enthusiasts alike.
              </Typography>
            </Grid>
          </Grid>
          <br></br>
          <br></br>
          <Grid container spacing={3}>
            <Grid item lg={4} xl={4} xs={12}></Grid>
            <Grid item lg={4} xl={4} xs={12}>
              <Card>
                <EarningsSegmentation className={classes.buycard} />
              </Card>
            </Grid>
            <Grid item lg={4} xl={4} xs={12}></Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
}

Dao.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

Dao.defaultProps = {};

export default Dao;

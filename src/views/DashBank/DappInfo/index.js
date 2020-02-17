import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import gradients from "src/utils/gradients";
import Chart from "./Chart";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: gradients.indigo,
    color: theme.palette.primary.contrastText
  },
  content: {
    paddingTop: 0
  },
  itemDivider: {
    borderBottomColor: "rgba(255,255,255,0.2)"
  },
  actions: {
    paddingTop: 0,
    justifyContent: "flex-end"
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1)
  },

  avatar: {
    border: `2px solid ${theme.palette.common.white}`,
    height: 120,
    width: 120,
    backgroundColor: theme.palette.common.white
    //   top: -60,
    //  left: theme.spacing(3),
    //  right: theme.spacing(3)
    // position: "absolute"
  }
}));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DappInfo({ className, ...rest }) {
  const classes = useStyles();

  const [data, setData] = useState([
    163,
    166,
    161,
    159,
    99,
    163,
    173,
    166,
    167,
    183,
    176,
    172
  ]);

  useEffect(() => {
    let mounted = true;

    setInterval(() => {
      if (mounted) {
        setData(data => {
          const newData = [...data];

          newData.shift();
          newData.push(0);

          return newData;
        });
      }

      setTimeout(() => {
        if (mounted) {
          setData(prevData => {
            const newData = [...prevData];
            const random = getRandomInt(100, 200);

            newData.pop();
            newData.push(random);

            return newData;
          });
        }
      }, 500);
    }, 2000);

    return () => {
      mounted = false;
    };
  }, []);

  const labels = data.map((value, i) => i);

  const pages = [
    {
      pathname: "/projects",
      views: "24"
    },
    {
      pathname: "/chat",
      views: "21"
    },
    {
      pathname: "/cart",
      views: "15"
    },
    {
      pathname: "/cart/checkout",
      views: "8"
    }
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subheader="bankroll.network"
        subheaderTypographyProps={{ color: "inherit" }}
        title="Credits"
        titleTypographyProps={{ color: "inherit" }}
      />

      <CardContent className={classes.content}>
        <Box display="flex">
          <Box m="auto">
            <Avatar
              alt="Person"
              className={classes.avatar}
              src={"https://trondash.com/static/media/bankroll.71f452fa.png"}
            />
          </Box>
        </Box>

        <List>
          <Box display="flex">
            <Box m="auto">
              <ListItem
                classes={{ divider: classes.itemDivider }}
                // divider
                key={"mystats"}
              >
                <ListItemText
                  primary={"My Stats"}
                  primaryTypographyProps={{
                    color: "inherit",
                    variant: "body1"
                  }}
                />
              </ListItem>
            </Box>
          </Box>

          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"Invested"}
          >
            <ListItemText
              primary={"Invested"}
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">
              {"15,223"}
              {` `}
              {"trx"}
            </Typography>
          </ListItem>
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"StartDate"}
          >
            <ListItemText
              primary={"Start Date"}
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">{"02/12/19"}</Typography>
          </ListItem>
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"TotalWithdrawn"}
          >
            <ListItemText
              primary={"Total Withdrawn"}
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">
              {"2,222"}
              {` `}
              {"trx"}
            </Typography>
          </ListItem>
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"TotalReinvest"}
          >
            <ListItemText
              primary={"Total Reinvest"}
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">
              {"23,222"}
              {` `}
              {"trx"}
            </Typography>
          </ListItem>
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={"MyDividends"}
          >
            <ListItemText
              primary={"My Dividends"}
              primaryTypographyProps={{ color: "inherit", variant: "body1" }}
            />
            <Typography color="inherit">
              {"23"}
              {` `}
              {"trx"}
            </Typography>
          </ListItem>
        </List>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          //  component={RouterLink}
          size="small"
          //  to="#"
          variant="contained"
        >
          Reinvest
        </Button>
        <Button
          color="primary"
          //   component={RouterLink}
          size="small"
          // to="#"
          variant="contained"
        >
          Withdraw
        </Button>
      </CardActions>
    </Card>
  );
}

DappInfo.propTypes = {
  className: PropTypes.string
};

export default DappInfo;

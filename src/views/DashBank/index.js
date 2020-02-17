import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Container,
  Tabs,
  Tab,
  Divider,
  colors,
  Grid,
  Avatar
} from "@material-ui/core";
import Page from "src/components/Page";
import Header from "./Header";
import Summary from "./Summary";
import Invoices from "./Invoices";
import Logs from "./Logs";
import LatestProjects from "./LatestProjects";
import TotalTransactions from "./TotalTransactions";
import DappInfo from "./DappInfo";
import Invest from "./Invest";
import Devest from "./Devest";
import TotalVolume from "./TotalVolume";
import TeamTasks from "./TeamTasks";
import DividendPool from "./DividendPool";
import NumberOfPlayers from "./NumberOfPlayers";
import PerformanceOverTime from "./PerformanceOverTime";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.common.white
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  },
  grid: {
    marginTop: theme.spacing(2)
  }
}));

function CustomerManagementDetails({ match, history }) {
  const classes = useStyles();
  const { id, tab: currentTab } = match.params;
  const tabs = [
    { value: "about", label: "About" },
    { value: "transactions", label: "Transactions" },
    { value: "leaderboard", label: "Leaderboard" }
  ];

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  if (!currentTab) {
    return <Redirect to={`/dashbank/${id}/transactions`} />;
  }

  if (!tabs.find(tab => tab.value === currentTab)) {
    return <Redirect to="/errors/error-404" />;
  }

  return (
    <Page className={classes.root} title="DashBank">
      <Container maxWidth={false}>
        <Header />
        <Grid container spacing={3} className={classes.grid}>
          <Grid item lg={3} sm={6} xs={12}>
            <DividendPool />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <NumberOfPlayers />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TotalTransactions />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TotalVolume />
          </Grid>
          <Grid item lg={3} xs={12}>
            <DappInfo />
          </Grid>
          <Grid item lg={3} xs={12}>
            <Invest />
            <br />
            <Devest />
          </Grid>
          <Grid item lg={6} xs={12}>
            <PerformanceOverTime />
          </Grid>
        </Grid>

        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={currentTab}
          variant="scrollable"
        >
          {tabs.map(tab => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {currentTab === "about" && <Summary />}
          {currentTab === "transactions" && <Invoices />}
          {currentTab === "leaderboard" && <Logs />}
        </div>
      </Container>
    </Page>
  );
}

CustomerManagementDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default CustomerManagementDetails;

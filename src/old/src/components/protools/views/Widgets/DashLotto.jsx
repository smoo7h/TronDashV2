import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import Utils from "../../../../utils";
import TronWeb from "tronweb";

// import Weekend from "@material-ui/icons/Weekend";

import Avatar from "@material-ui/core/Avatar";
import Countdown from "react-countdown-now";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "../../components/CustomButtons/Button.jsx";

import Card from "../../components/Card/Card.jsx";

import CardBody from "../../components/Card/CardBody.jsx";

import image from "../../../../assets/dashlotto.png";

import {
  cardTitle,
  roseColor,
} from "../../assets/jss/material-dashboard-pro-react.jsx";

const styles = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0",
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem",
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px",
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "135px",
    height: "135px",
    //border: "1px solid #E5E5E5",
    borderRadius: "50%",
    overflow: "visible",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "45px",
      fontSize: "45px",
    },
  },
  iconRose: {
    color: roseColor,
  },
  marginTop30: {
    marginTop: "30px",
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px",
    },
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999",
  },
  root: {
    //  paddingTop: 24,

    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 14,
    fontWeight: 400,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    borderBottom: "1px solid #515151",
    letterSpacing: "-0.05px",
    verticalAlign: "inherit",
  },
  card: {
    backgroundColor: "#424242",
    color: "#FFFFFF",
  },
  title: {
    fontWeight: 500,
  },
  reinvestbutton: {
    background: "linear-gradient(to right, #D50000, #FF8A80)",
    color: "black",
    boxShadow:
      "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    fontWeight: 900,
  },
  withdrawlbutton: {
    background: "linear-gradient(to right, #796eff, #ff5263)",
    color: "black",
    boxShadow:
      "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    fontWeight: 900,
  },
  table: {
    backgroundColor: "#424242",
  },
};

class DashLotto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deposit: "0",
      withdrawall: "0",
      dailycountdown: "0",
      weeklycountdown: "0",
      weeklyJackPot: "0",
      weeklyusers: "0",
      dailyusers: "0",
      userprogressivewins: "0",
      userdailywins: "0",
      userdailyticketcount: "0",
      userweeklyticketcount: "0",
      usersavings: "0",
      dailyrows: [],
      weeklyrows: [],
    };
  }

  handleDepositChange = (name) => (event) => {
    this.setState({
      deposit: event.target.value,
    });
  };

  handleWithdralChange = (name) => (event) => {
    this.setState({
      withdrawall: event.target.value,
    });
  };

  handelbuyticket = (name) => (event) => {
    name = Utils.buyLottoticket().then((response) => {
      //clear it
      //  this.fetchdappdata();
      this.fetchdbdata();
      this.setState({
        userbalance: this.state.userbalance - 10,
      });
      //manually subtrack their balance
    });
  };

  async componentDidMount() {
    await new Promise((resolve) => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready,
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState,
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {
          const TRONGRID_API = "https://api.tronstack.io";

          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false,
            },
          });

          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) return tries++;

        this.setState({
          tronWeb: tronWebState,
        });

        resolve();
      }, 100);
    });

    if (!this.state.tronWeb.loggedIn) {
      window.tronWeb.on("addressChanged", () => {
        if (this.state.tronWeb.loggedIn) return;

        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true,
          },
        });
      });
    }

    Utils.setTronWeb(window.tronWeb);
    this.setState({
      deposit: await Utils.fetchdashusertokentotalbalance(
        window.tronWeb.defaultAddress.base58
      ),
    });
    this.fetchdappdata();
    this.fetchdbdata();
    this.interval = setInterval(
      () => this.fetchdappdata() && this.fetchdbdata(),
      5000
    );
  }

  async fetchdappdata() {
    //get Your Savings
    this.setState({
      usersavings: await Utils.fetchdashusertokentotalbalance(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //get your trx of dash
    this.setState({
      userbalance: await Utils.getusertrxbalance(
        window.tronWeb.defaultAddress.base58
      ),
    });

    this.setState({
      weeklyJackPot: await Utils.fetchWeeklyJackpot(),
    });
    this.setState({
      weeklyusers: await Utils.fetchweeklyusers(),
    });

    this.setState({
      dailyusers: await Utils.fetchdailyusers(),
    });
    this.setState({
      userprogressivewins: await Utils.fetchuserprogressivewins(),
    });
    this.setState({
      userdailywins: await Utils.fetchuserdailywins(),
    });
  }

  async fetchdbdata() {
    function createDailyData(date, prize, winner) {
      return { date, prize, winner };
    }

    function createWeeklyData(date, prize, winningnumber, winner) {
      return { date, prize, winningnumber, winner };
    }

    //

    axios
      .get(
        "https://gettrondashdatadash.azurewebsites.net/api/GetData?code=cuaWYE6VttDteeGZOhw7qQiB27ncpyrQux6a7f4bid8oZPMqcokdJg==&publickey=" +
          window.tronWeb.defaultAddress.base58
      )
      .then((response) => {
        var converteddailyarray = [];

        for (var i = 0; i < response.data.DailyWinners.length; i++) {
          var single = createDailyData(
            response.data.DailyWinners[i].Date,
            "1000 DASH",
            response.data.DailyWinners[i].Winner
          );
          converteddailyarray.push(single);
        }

        var convertedweeklyarray = [];

        for (var i = 0; i < response.data.WeeklyWinners.length; i++) {
          var single = createWeeklyData(
            response.data.WeeklyWinners[i].Date,
            response.data.WeeklyWinners[i].Prize + " TRX",
            response.data.WeeklyWinners[i].WinningNumber,
            response.data.WeeklyWinners[i].Winner
          );
          convertedweeklyarray.push(single);
        }

        this.setState({
          dailyrows: converteddailyarray,
        });

        this.setState({
          weeklyrows: convertedweeklyarray,
        });

        this.setState({
          userweeklyticketcount: response.data.UserWeeklyRaffelTickets,
        });

        this.setState({
          userdailyticketcount: response.data.UserDailyRaffelTickets,
        });

        let tomorrowsdate = Date.parse(response.data.NextDailyLotto);

        let sundaydate = Date.parse(response.data.NextWeeklyLotto);

        this.setState({
          dailycountdown: tomorrowsdate,
        });
        this.setState({
          weeklycountdown: sundaydate,
        });

        //load up the data to the table
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { classes } = this.props;
    const renderer = ({ hours, minutes, seconds, completed }) => {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    };
    return (
      <GridContainer className={classes.root}>
        <GridItem xs={12} sm={12} md={12}>
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={12} lg={12}>
                    <Card pricing className={classes.card}>
                      <CardBody pricing>
                        <b>
                          <p className={classes.cardDescription}>DASH Lotto</p>
                        </b>
                        <Avatar
                          alt="DashLotto"
                          src={image}
                          className={classes.icon}
                        />
                        <br />
                        <p className={classes.cardDescription}>
                          Play our new 100% provably fair lottery: DashLotto!
                          <br />
                          For one 10 TRX ticket you are entered to win two
                          Jackpots!
                          <br />
                          1000 DASH are awarded daily and a progressive TRX
                          jackpot builds all week
                        </p>
                        <br></br>
                        <GridContainer>
                          <GridItem xs={1} sm={4} md={4}>
                            {``}
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            <b> Weekly Jackpot</b>
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            <b> Daily Jackpot</b>
                          </GridItem>
                          <GridItem xs={1} sm={4} md={4}>
                            {``}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={1} sm={4} md={4}>
                            {``}
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            {this.state.weeklyJackPot} trx
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            {/*this.state.userrefferals*/} 1,000 dash
                          </GridItem>
                          <GridItem xs={1} sm={4} md={4}>
                            {``}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={1} sm={4} md={4}>
                            {``}
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            {this.state.weeklyusers} Tickets
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            {this.state.dailyusers} Tickets
                          </GridItem>
                          <GridItem xs={1} sm={4} md={4}>
                            {``}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={1} sm={4} md={4}>
                            {``}
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            {/*this.state.userdivs*/}{" "}
                            <Countdown date={this.state.weeklycountdown} />
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            {/*this.state.userrefferals*/}{" "}
                            <Countdown
                              date={this.state.dailycountdown}
                              renderer={renderer}
                            />
                          </GridItem>
                          <GridItem xs={1} sm={4} md={4}>
                            {``}
                          </GridItem>
                        </GridContainer>
                        <br />
                        <Button
                          round
                          // disableElevation={true}
                          //style={{ backgroundColor: "#3f51b5" }}
                          className={classes.withdrawlbutton}
                          onClick={this.handelbuyticket()}
                        >
                          Purchase Ticket
                        </Button>
                        <br></br>
                        <br></br>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Your Tron Wallet:</b> {this.state.userbalance}{" "}
                            TRX
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Your Dash Wallet:</b> {this.state.usersavings}{" "}
                            DASH
                          </GridItem>
                        </GridContainer>

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <br />
                            <b>Your Progressive Tickets :</b>{" "}
                            {this.state.userweeklyticketcount} tickets
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Your Daily Tickets :</b>{" "}
                            {this.state.userdailyticketcount} tickets
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Your Progressive Winnings :</b>{" "}
                            {/*this.state.userdailywins*/}0 TRX
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Your Daily Winnings :</b>{" "}
                            {this.state.userprogressivewins} DASH
                          </GridItem>
                        </GridContainer>

                        <br />
                        <p className={classes.cardDescription}>
                          <br /> Each ticket gives you an equal chance to win a
                          daily prize of 1000 DASH!
                          <br /> Feeling lucky? Each ticket gives you a 1/65,535
                          chance to win the progressive weekly Jackpot
                          <br />
                          The hash determines the dash, with the result
                          completely verifiable on the Tron blockchain.
                          <br />
                          HODLing DASH as well? 15% of the massive weekly
                          Jackpot benefits you! This chunk of the jackpot goes
                          into DASH buybacks and burns
                        </p>
                        <br />
                        <p className={classes.cardDescription}>
                          <b> Daily Jackpot History</b>
                        </p>

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={3}>
                            {` `}
                          </GridItem>

                          <GridItem xs={12} sm={12} md={6}>
                            <div style={{ width: "100%", overflowX: "auto" }}>
                              <Table className={classes.table} size="small">
                                <TableHead className={classes.table}>
                                  <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Prize</TableCell>
                                    <TableCell align="right">Winner</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {this.state.dailyrows.map((row) => (
                                    <TableRow key={row.date}>
                                      <TableCell component="th" scope="row">
                                        {row.date.substring(
                                          0,
                                          row.date.indexOf(" ")
                                        )}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.prize}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.winner}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                            <br />
                            <p className={classes.cardDescription}>
                              <b> Weekly Jackpot History</b>
                            </p>
                            <br></br>
                            <div style={{ width: "100%", overflowX: "auto" }}>
                              <Table className={classes.table} size="small">
                                <TableHead className={classes.table}>
                                  <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Prize</TableCell>
                                    <TableCell align="right">
                                      Winning Number
                                    </TableCell>
                                    <TableCell align="right">Winner</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {this.state.weeklyrows.map((row) => (
                                    <TableRow key={row.date}>
                                      <TableCell component="th" scope="row">
                                        {row.date.substring(
                                          0,
                                          row.date.indexOf(" ")
                                        )}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.prize}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.winningnumber}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.winner}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                            {` `}
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

DashLotto.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(DashLotto);

import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import RefferalCard from "../../../Reff/RefferalCard";
import withStyles from "@material-ui/core/styles/withStyles";
import Utils from "../../../../utils";
import TronWeb from "tronweb";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
// @material-ui/icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// import Weekend from "@material-ui/icons/Weekend";
import { makeStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

import Card from "../../components/Card/Card.jsx";

import CardBody from "../../components/Card/CardBody.jsx";

import image from "../../../../assets/dragon.png";
//import image from "../../../../assets/tewkenaire.png";

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
    marginTop: 0,
  },
  testimonialIcon: {
    marginTop: 0,
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
    //  color: "black",
    fontWeight: 900,
  },
  withdrawlbutton: {
    background: "linear-gradient(to right, #796eff, #ff5263)",
    // color: "black",
    fontWeight: 900,
  },
};

class Widgets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deposit: "0",
      withdrawall: "0",
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

  handleDepositClick = (name) => (event) => {
    let refferal = "";

    if (window.location.search) {
      refferal = window.location.search.substr(5);
    }

    if (Number(name) >= 1) {
      name = Utils.bttbankDeposit(
        name,
        refferal,
        window.tronWeb.defaultAddress.base58
      ).then((response) => {
        //clear it
        this.setState({
          deposit: "0",
        });
      });
    }
  };

  handleWithdrawallClick = (name) => (event) => {
    //   Utils.withdrawlldash(name);

    if (Number(name) >= 1) {
      name = Number(name).toFixed(0);
      name = Utils.bttbankwithdrawl(name).then((response) => {
        //clear it
        this.setState({
          withdrawall: "0",
        });
      });
    }
  };

  handleWithdrawalldivsClick = (name) => (event) => {
    Utils.bttbankwithdrawlDivs();
  };

  handleReinvestdivsClick = (name) => (event) => {
    Utils.bttbankReinvestDivs();
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
          const TRONGRID_API = "https://api.trongrid.io";

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
      deposit: await Utils.fetchuserwalletbtt(
        window.tronWeb.defaultAddress.base58
      ),
    });
    this.fetchdappdata();

    this.interval = setInterval(() => this.fetchdappdata(), 1000);
  }

  async fetchdappdata() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }

    //get Your Divs
    this.setState({
      userdivs: await Utils.fetchuserdivsbtt(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //get Your Divs
    this.setState({
      totalstaked: await Utils.fetchtotalbttstaked(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //get your refferals
    this.setState({
      userrefferals: await Utils.fetchuserbttrefferals(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //get Your Savings
    this.setState({
      usersavings: await Utils.fetchuserbttstaked(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //get your holding of dash
    this.setState({
      userheld: await Utils.fetchuserwalletbtt(
        window.tronWeb.defaultAddress.base58
      ),
    });
  }
  render() {
    const { classes } = this.props;

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
                          <p className={classes.cardDescription}>BTT Bank</p>
                        </b>
                        <Avatar
                          alt="DashBank"
                          src={image}
                          className={classes.icon}
                        />
                        <br />
                        <p className={classes.cardDescription}>
                          Passively earn divs by storing your BTT inside
                          DashBank
                          <br />
                        </p>
                        <br />
                        <GridContainer>
                          <GridItem xs={1} sm={4} md={4}>
                            {``}
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            <b> Your Divs</b>
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            <b> Referrals</b>
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
                            {this.state.userdivs} BTT
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            {this.state.userrefferals} BTT
                          </GridItem>
                          <GridItem xs={1} sm={4} md={4}>
                            {``}
                          </GridItem>
                        </GridContainer>
                        <br />
                        <Button
                          round
                          // color="rose"
                          className={classes.reinvestbutton}
                          onClick={this.handleReinvestdivsClick()}
                        >
                          Reinvest Divs
                        </Button>
                        <Button
                          round
                          className={classes.withdrawlbutton}
                          onClick={this.handleWithdrawalldivsClick()}
                        >
                          Withdrawl Divs
                        </Button>

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <br />
                            <b>Total Staked :</b>{" "}
                            {this.state.totalstaked
                              ? Number(this.state.totalstaked)
                                  .toFixed(0)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : "0"}{" "}
                            BTT
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Your Savings :</b>{" "}
                            {this.state.usersavings
                              ? Number(this.state.usersavings)
                                  .toFixed(0)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : "0"}{" "}
                            BTT
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Your Wallet :</b>{" "}
                            {this.state.userheld
                              ? Number(this.state.userheld)
                                  .toFixed(2)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : "0"}{" "}
                            BTT
                          </GridItem>
                        </GridContainer>

                        <br />
                        <GridContainer>
                          <GridItem xs={0} sm={0} md={0}>
                            {``}
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              id="depositdash"
                              //  className={clsx(classes.margin, classes.textField)}
                              variant="outlined"
                              //type={values.showPassword ? "text" : "password"}
                              label="Deposit"
                              margin="normal"
                              value={this.state.deposit}
                              onChange={this.handleDepositChange("deposit")}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      style={
                                        {
                                          //  left: 22,
                                        }
                                      }
                                      edge="end"
                                      color="secondary"
                                      aria-label="Deposit"
                                      className={classes.margin}
                                      onClick={this.handleDepositClick(
                                        this.state.deposit
                                      )}
                                    >
                                      <Button
                                        round
                                        //color="rose"
                                        className={classes.reinvestbutton}
                                        style={{
                                          lineHeight: 0,
                                        }}
                                      >
                                        deposit
                                      </Button>
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              id="withdrawl"
                              //  className={clsx(classes.margin, classes.textField)}
                              variant="outlined"
                              //type={values.showPassword ? "text" : "password"}
                              label="Withdrawal"
                              className={classes.outline}
                              margin="normal"
                              value={this.state.withdrawall}
                              onChange={this.handleWithdralChange("withdrawal")}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      edge="end"
                                      color="secondary"
                                      variant="contained"
                                      aria-label="withdrawal"
                                      className={classes.margin}
                                      style={
                                        {
                                          //  left: 22,
                                        }
                                      }
                                      onClick={this.handleWithdrawallClick(
                                        this.state.withdrawall
                                      )}
                                    >
                                      <Button
                                        round
                                        className={classes.withdrawlbutton}
                                        style={{
                                          lineHeight: 0,
                                          // backgroundColor: "#3f51b5",
                                        }}
                                      >
                                        Withdraw
                                      </Button>
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={0} sm={0} md={4}>
                            {``}
                          </GridItem>
                        </GridContainer>
                        <p className={classes.cardDescription}>
                          <br />A transaction fee of 10% is charged on
                          deposits/withdrawals 9% is then distributed to the
                          dividend pool 1% for promotion and development
                        </p>
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

Widgets.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Widgets);
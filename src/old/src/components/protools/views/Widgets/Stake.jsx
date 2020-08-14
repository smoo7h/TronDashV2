import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
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

import Avatar from "@material-ui/core/Avatar";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

import Card from "../../components/Card/Card.jsx";

import CardBody from "../../components/Card/CardBody.jsx";

import image from "../../../../assets/energy.png";

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
    if (Number(name) >= 1) {
      // name = Number(name).toFixed(0);
      name = Utils.depositdash(name, window.tronWeb.defaultAddress.base58).then(
        (response) => {
          //clear it
          this.setState({
            deposit: "0",
          });
        }
      );
    }
  };

  handleWithdrawallClick = (name) => (event) => {
    //   Utils.withdrawlldash(name);

    if (Number(name) >= 1) {
      name = Number(name).toFixed(0);
      name = Utils.withdrawlldash(name).then((response) => {
        //clear it
        this.setState({
          withdrawall: "0",
        });
      });
    }
  };

  handleWithdrawalldivsClick = (name) => (event) => {
    Utils.withdrawlldashdivs();
  };

  handleReinvestdivsClick = (name) => (event) => {
    Utils.reinvestdashdivs();
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
      deposit: await Utils.fetchdashusertokentotalbalance(
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
      userdivs: await Utils.fetchuserdivsdash(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //get Your Divs
    this.setState({
      totalstaked: await Utils.fetchtotaldashstaked(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //get your refferals
    this.setState({
      userrefferals: await Utils.fetchuserdashrefferals(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //get Your Savings
    this.setState({
      usersavings: await Utils.fetchuserdashstaked(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //get your holding of dash
    this.setState({
      userheld: await Utils.fetchdashusertokentotalbalance(
        window.tronWeb.defaultAddress.base58
      ),
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <GridContainer>
                  <GridItem xs={12} sm={12} lg={12}>
                    <Card pricing>
                      <CardBody pricing>
                        <h6 className={classes.cardCategory}>DashBank</h6>

                        <Avatar
                          alt="DashBank"
                          src={image}
                          className={classes.icon}
                        />
                        <br />
                        <p className={classes.cardDescription}>
                          Passively earn divs by storing your DASH inside
                          DashBank
                          <br />
                        </p>

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
                            {this.state.userdivs} DASH
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            {this.state.userrefferals} DASH
                          </GridItem>
                          <GridItem xs={1} sm={4} md={4}>
                            {``}
                          </GridItem>
                        </GridContainer>
                        <br />
                        <Button
                          round
                          color="rose"
                          onClick={this.handleReinvestdivsClick()}
                        >
                          Reinvest Divs
                        </Button>
                        <Button
                          round
                          style={{ backgroundColor: "#3f51b5" }}
                          onClick={this.handleWithdrawalldivsClick()}
                        >
                          Withdrawl Divs
                        </Button>

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <br />
                            <b>Total Staked :</b> {this.state.totalstaked} DASH
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Your Savings :</b> {this.state.usersavings} DASH
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Your Wallet :</b> {this.state.userheld} DASH
                          </GridItem>
                        </GridContainer>

                        <br />
                        <GridContainer>
                          <GridItem xs={0} sm={0} md={4}>
                            {``}
                          </GridItem>
                          <GridItem xs={12} sm={12} md={2}>
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
                                      edge="end"
                                      color="secondary"
                                      aria-label="Deposit"
                                      className={classes.margin}
                                      onClick={this.handleDepositClick(
                                        this.state.deposit
                                      )}
                                    >
                                      <ExpandMore />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={2}>
                            <TextField
                              id="withdrawl"
                              //  className={clsx(classes.margin, classes.textField)}
                              variant="outlined"
                              //type={values.showPassword ? "text" : "password"}
                              label="Withdrawal"
                              margin="normal"
                              value={this.state.withdrawall}
                              onChange={this.handleWithdralChange("withdrawal")}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      edge="end"
                                      color="primary"
                                      variant="contained"
                                      aria-label="withdrawal"
                                      className={classes.margin}
                                      onClick={this.handleWithdrawallClick(
                                        this.state.withdrawall
                                      )}
                                    >
                                      <ExpandLess />
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
                          deposits/withdrawals which is then distributed to the
                          dividend pool
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

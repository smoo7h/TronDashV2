import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Utils from "utils";
import TronWeb from "tronweb";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import image from "../../../../assets/tewkenaire.png";

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
    width: "250px",
    height: "75px",
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

class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deposit: "0",
      withdrawall: "0",
      buyamount: "0",
      sellamount: "0",
    };
  }

  handleDepositChange = (name) => (event) => {
    this.setState({
      deposit: event.target.value,
      buyamount: (event.target.value / this.state.buyPrice).toFixed(2),
    });
  };

  handleWithdralChange = (name) => (event) => {
    this.setState({
      withdrawall: event.target.value,
      sellamount: (event.target.value * this.state.sellPrice).toFixed(2),
    });
  };

  handleDepositClick = (name) => (event) => {
    if (Number(name) >= 1) {
      name = Number(name).toFixed(0);
      name = Utils.depositdash(name).then((response) => {
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
      name = Utils.withdrawlldash(name).then((response) => {
        //clear it
        this.setState({
          withdrawall: "0",
        });
      });
    }
  };

  handleWithdrawalldivsClick = (name) => (event) => {
    Utils.tewkenaireTokenwithdrawl();
  };

  handleReinvestdivsClick = (name) => (event) => {
    Utils.tewkenaireTokenReinvest();
  };
  handleBuyClick = (amount) => (event) => {
    Utils.tewkenaireTokenBuy(amount);
    this.state.deposit = 0;
  };
  handleSellClick = (amount) => (event) => {
    Utils.tewkenaireTokenSell(amount);
    this.state.withdrawall = 0;
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
      deposit: 0,
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
      userdivs: await Utils.fetchTewkenaireTokenAvailableDividend(
        window.tronWeb.defaultAddress.base58
      ),
    });

    //get your refferals
    this.setState({
      userrefferals: await Utils.fetchTewkenaireTokenRefferalReward(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //get Your Savings
    this.setState({
      usersavings: await Utils.fetchTewkenaireTokenInvestment(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //user trx balance
    this.setState({
      usertrxbalance: await Utils.getusertrxbalance(
        window.tronWeb.defaultAddress.base58
      ),
    });
    //get your holding of dash
    this.setState({
      buyPrice: await Utils.fetchTewkenaireTokenBuyPrice(),
    });
    this.setState({
      sellPrice: await Utils.fetchTewkenaireTokenSellPrice(),
    });
    //contract balance
    this.setState({
      contractBalance: await Utils.fetchTewkenaireContractTokenBalance(),
    });

    //fetchTewkenaireTokenInvestment
    //
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
                        <h6 className={classes.cardCategory}>Exchange</h6>

                        <Avatar
                          alt="DashBank"
                          src={image}
                          className={classes.icon}
                        />
                        <br />
                        {/* 
                        <p className={classes.cardDescription}>
                          tewkenaire
                          <br />
                        </p>
                        */}

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
                            {this.state.userdivs} trx
                          </GridItem>
                          <GridItem xs={5} sm={2} md={2}>
                            {this.state.userrefferals} trx
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
                            <b>Contrat Balance :</b>{" "}
                            {this.state.contractBalance} trx
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Your Tokens :</b> {this.state.usersavings}
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Trx Balance :</b> {this.state.usertrxbalance} trx
                          </GridItem>
                        </GridContainer>

                        <br />
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Buy Price :</b> {this.state.buyPrice} trx
                          </GridItem>
                          {this.state.deposit != "0" &&
                            this.state.deposit != "" && (
                              <GridItem xs={12} sm={12} md={12}>
                                <b>You Get :</b> {this.state.buyamount} tewken
                              </GridItem>
                            )}
                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              id="depositdash"
                              //  className={clsx(classes.margin, classes.textField)}
                              variant="outlined"
                              //type={values.showPassword ? "text" : "password"}
                              label="Buy (number of trx to spend)"
                              margin="normal"
                              value={this.state.deposit}
                              onChange={this.handleDepositChange("deposit")}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      style={{
                                        left: 22,
                                      }}
                                      edge="end"
                                      color="secondary"
                                      aria-label="Deposit"
                                      className={classes.margin}
                                      onClick={this.handleBuyClick(
                                        this.state.deposit
                                      )}
                                    >
                                      <Button
                                        round
                                        color="rose"
                                        style={{
                                          lineHeight: 0,
                                        }}
                                      >
                                        Buy
                                      </Button>
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <b>Sell Price :</b> {this.state.sellPrice} trx
                          </GridItem>
                          {this.state.withdrawall != "0" &&
                            this.state.withdrawall != "" && (
                              <GridItem xs={12} sm={12} md={12}>
                                <b>You Get :</b> {this.state.sellamount} trx
                              </GridItem>
                            )}

                          <GridItem xs={12} sm={12} md={12}>
                            <TextField
                              id="withdrawl"
                              //  className={clsx(classes.margin, classes.textField)}
                              variant="outlined"
                              //type={values.showPassword ? "text" : "password"}
                              label="Sell (number of tewken to sell)"
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
                                      style={{
                                        left: 22,
                                      }}
                                      onClick={this.handleSellClick(
                                        this.state.withdrawall
                                      )}
                                    >
                                      <Button
                                        round
                                        style={{
                                          lineHeight: 0,
                                          backgroundColor: "#3f51b5",
                                        }}
                                      >
                                        Sell
                                      </Button>
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
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

Exchange.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Exchange);

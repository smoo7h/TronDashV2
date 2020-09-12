import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "@material-ui/core";
import CardAvatar from "../../components/Card/CardAvatar.jsx";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";

// core components
import GridContainer from "../../components/Grid/GridContainer.jsx";

import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

import InfoArea from "../../components/InfoArea/InfoArea.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";

import registerPageStyle from "../../assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import image from "../../../../assets/dashcoinlogo.png";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  }
  render() {
    const styles = {
      testimonialIcon: {
        // marginTop: "60px",
        //marginBottom: "10px",
        "& svg": {
          width: "40px",
          height: "40px",
        },
      },
      root: {
        paddingTop: 24,

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
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        color: "#FFFFFF",
      },
      title: {
        fontWeight: 500,
      },
      reinvestbutton: {
        background: "linear-gradient(to right, #D50000, #FF8A80)",
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

    const { classes } = this.props;
    return (
      <div
        style={{
          paddingLeft: 24,
          width: "100%",
        }}
      >
        <GridContainer
          className={styles.root}
          className={classes.card}
          style={
            {
              //    padding: 24,
            }
          }
        >
          <GridItem xs={12} sm={12} md={10}>
            <Card
              className={classes.cardSignup}
              style={{ backgroundColor: "#424242" }}
            >
              <div style={{ marginBottom: 0 }}>
                <CardAvatar testimonial style={{ marginTop: 1 }}>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <img src={image} alt="..." />
                  </a>
                </CardAvatar>
              </div>
              <br></br>
              <h2 style={{ color: "#FFFFFF" }} className={classes.cardTitle}>
                Dash Token
              </h2>
              <CardBody style={{ color: "#FFFFFF", fontColor: "#FFFFFF" }}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={5}>
                    <InfoArea
                      title="DASH Definition"
                      description0=" TronDash.com, an innovative utility that enables you to see your div earnings on the most popular dApps utilizing the Tron blockchain."
                      description1="There’s a 2% burn rate for all DASH transactions and a predefined amount of just under 21MM, a total that will be widdled down through a continuous transaction burn. "
                      description2="Not just an economic experiment, DASH is backed by the TronDash ecosystem. "
                      icon={Timeline}
                      iconColor="rose"
                    />
                    <InfoArea
                      title="DASH Distribution"
                      description0="DASH will be airdropped in waves to those who make use of the TronDash tools"
                      description1="For those who want to compound their DASH exposure, staking mechanisms will be available, allowing you to seamlessly grow your DASH crypto portfolio 
                      "
                      icon={Code}
                      iconColor="primary"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={8} md={5}>
                    <InfoArea
                      title="DASH Destination"
                      description0="DASH strives to build an ecosystem of dApps that use its TRC-20 token
                      "
                      description1="DASH will enjoy the spikes and stability from continued innovation of the TronDash network, delivering trailblazing utilities that set the precedent for other dApp development
                      "
                      description2="A stability floor for DASH, built on the burn and buybacks from platform activity earnings and deflationary transaction pressure"
                      icon={Group}
                      iconColor="info"
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className={classes.center}>
                      <h4
                        className={classes.socialTitle}
                        style={{ color: "#FFFFFF" }}
                      >
                        Exchanges
                      </h4>
                      <br></br>
                      <Link
                        color="inherit"
                        target="_blank"
                        //   component={RouterLink}
                        // to={customer.website}
                        href={"https://poloniex.org/exchange?id=206"}
                        variant="h6"
                      >
                        <Button
                          justIcon
                          round
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Avatar
                            alt="Poloniex"
                            src="https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/ef/fd/df/effddff6-672c-46fa-ccb9-3013a6ceabfd/AppIcon-1x_U007emarketing-0-7-0-0-sRGB-85-220.png/246x0w.png"
                          />
                        </Button>
                      </Link>
                      {` `}

                      <Link
                        color="inherit"
                        target="_blank"
                        //   component={RouterLink}
                        // to={customer.website}
                        href={"https://playroyal.com/exchange/DASH-TRX"}
                        variant="h6"
                      >
                        <Button
                          justIcon
                          round
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Avatar
                            alt="PlayRoyal"
                            src="data:image/jpeg;base64,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"
                          />
                        </Button>
                      </Link>
                      {` `}

                      <Link
                        color="inherit"
                        target="_blank"
                        //   component={RouterLink}
                        // to={customer.website}
                        href={
                          "https://justswap.io/?lang=en-US#/home?tokenAddress=TJASWoyYgUw2M1jvDje7zYLooDCzWYRdkm&type=swap"
                        }
                        variant="h6"
                      >
                        <Button
                          justIcon
                          round
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Avatar
                            alt="JustSwap"
                            src="https://miro.medium.com/fit/c/256/256/1*tPB9Iy0Ej7fHqHOb11_13A.png"
                          />
                        </Button>
                      </Link>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(registerPageStyle)(RegisterPage);

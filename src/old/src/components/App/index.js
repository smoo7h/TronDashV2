import React from "react";
import TronWeb from "tronweb";
import Utils from "utils";
import DappTable from "../Table/DappTable";
import DappTableMoblie from "../Table/DappTableMobile";
import DeflationaryTokenTable from "../Table/DeflationaryTokenTable";
import DeflationaryTokenTableMobile from "../Table/DeflationaryTokenTableMobile";
import { ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { createMuiTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import RefferalCard from "../Reff/RefferalCard";
import Stake from "../../components/protools/views/Widgets/Stake.jsx";
import BTTBank from "../../components/protools/views/Widgets/BTTBank.jsx";
import TRXBank from "../../components/protools/views/Widgets/TRXBank.jsx";
import DashLotto from "../../components/protools/views/Widgets/DashLotto.jsx";
import Exchange from "../../components/protools/views/Widgets/Exchange.jsx";
import RegisterPage from "../../components/protools/views/Pages/RegisterPage.jsx";
import AppHeader from "../AppHeader";
import { BrowserView, MobileView } from "react-device-detect";
import "./App.scss";

const FOUNDATION_ADDRESS = "TYrNrk11FhuZWZEzPZTf6YqaKA6joeApaa";

class App extends React.Component {
  async handler(someValue) {
    this.setState({
      currentpage: "token"
    });
  }
  async handler2(someValue) {
    this.setState({
      currentpage: "home"
    });
  }
  async handlerdapps(someValue) {
    this.setState({
      currentpage: "dapps"
    });
  }
  async handlerbttbank(someValue) {
    this.setState({
      currentpage: "bttbank"
    });
  }
  async handlertrxbank(someValue) {
    this.setState({
      currentpage: "trxbank"
    });
  }

  async handlerlotto(someValue) {
    this.setState({
      currentpage: "dashlotto"
    });
  }

  async handlerexchange(someValue) {
    this.setState({
      currentpage: "exchange"
    });
  }

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.handler2 = this.handler2.bind(this);
    this.handlerdapps = this.handlerdapps.bind(this);
    this.handlerexchange = this.handlerexchange.bind(this);
    this.handlerlotto = this.handlerlotto.bind(this);
    this.handlerbttbank = this.handlerbttbank.bind(this);
    this.handlertrxbank = this.handlertrxbank.bind(this);

    this.state = {
      tronWeb: {
        installed: false,
        loggedIn: false
      },
      currentpage: "home"
    };
  }

  async componentDidMount() {
    //  window.addEventListener("hashchange", this.doSomething, false);

    /*
    if (window.location.pathname == "/") {
      this.setState({
        currentpage: "home"
      });
    } else if (window.location.pathname == "/dash") {
      this.setState({
        currentpage: "token"
      });
    }
*/

    if (this.props.history.location.pathname === "/bttbank") {
      this.setState({
        currentpage: "bttbank"
      });
    } else if (this.props.history.location.pathname === "/dashbank") {
      this.setState({
        currentpage: "dapps"
      });
    } else if (this.props.history.location.pathname === "/dashlotto") {
      this.setState({
        currentpage: "dashlotto"
      });
    } else if (this.props.history.location.pathname === "/trxbank") {
      this.setState({
        currentpage: "trxbank"
      });
    }

    await new Promise(resolve => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if (tronWebState.installed) {
        this.setState({
          tronWeb: tronWebState
        });

        return resolve();
      }

      let tries = 0;

      const timer = setInterval(() => {
        if (tries >= 10) {
          const TRONGRID_API = "https://api.trongrid.io";
          //const TRONGRID_API = "https://api.shasta.trongrid.io";
          window.tronWeb = new TronWeb(
            TRONGRID_API,
            TRONGRID_API,
            TRONGRID_API
          );

          this.setState({
            tronWeb: {
              installed: false,
              loggedIn: false
            }
          });

          clearInterval(timer);
          return resolve();
        }

        tronWebState.installed = !!window.tronWeb;
        tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

        if (!tronWebState.installed) return tries++;

        this.setState({
          tronWeb: tronWebState
        });

        resolve();
      }, 100);
    });

    if (!this.state.tronWeb.loggedIn) {
      console.log("not logged in");
      // Set default address (foundation address) used for contract calls
      // Directly overwrites the address object as TronLink disabled the
      // function call
      window.tronWeb.defaultAddress = {
        hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
        base58: FOUNDATION_ADDRESS
      };
      this.setState({
        tronWeb: {
          installed: true,
          loggedIn: true
        }
      });
      window.tronWeb.on("addressChanged", () => {
        if (this.state.tronWeb.loggedIn) return;

        this.setState({
          tronWeb: {
            installed: true,
            loggedIn: true
          }
        });
      });
    }

    Utils.setTronWeb(window.tronWeb);
  }

  render() {
    if (this.state.tronWeb.loggedIn) {
      return (
        <div>
          <div style={{ flex: 1 }}>
            <BrowserView>
              <AppHeader
                mobile={false}
                handler={this.handler}
                handlerdapps={this.handlerdapps}
                handlerbttbank={this.handlerbttbank}
                handlertrxbank={this.handlertrxbank}
                handler2={this.handler2}
                handlerlotto={this.handlerlotto}
                handlerexchange={this.handlerexchange}
              />
            </BrowserView>
            <MobileView>
              <AppHeader
                mobile={true}
                handler={this.handler}
                handlerdapps={this.handlerdapps}
                handlerbttbank={this.handlerbttbank}
                handlertrxbank={this.handlertrxbank}
                handler2={this.handler2}
                handlerlotto={this.handlerlotto}
                handlerexchange={this.handlerexchange}
              />
              <br />
            </MobileView>
          </div>
          {this.state.currentpage === "token" && (
            <div>
              <RegisterPage />
            </div>
          )}
          {this.state.currentpage === "dapps" && (
            <div>
              <Stake />
            </div>
          )}
          {this.state.currentpage === "bttbank" && (
            <div>
              <BTTBank handlerbttbank={this.handlerbttbank} />
            </div>
          )}
          {this.state.currentpage === "trxbank" && (
            <div>
              <TRXBank handlertrxbank={this.handlertrxbank} />
            </div>
          )}
          {this.state.currentpage === "dashlotto" && (
            <div>
              <DashLotto />
            </div>
          )}
          {this.state.currentpage === "exchange" && (
            <div>
              <Exchange />
            </div>
          )}

          <BrowserView>
            {this.state.currentpage === "home" && (
              <div className="kontainer">
                <DappTable />
                <br />
                <DeflationaryTokenTable handlerbttbank={this.handlerbttbank} />
                <br />
                {window.tronWeb.defaultAddress.base58 && (
                  <RefferalCard
                    publickey={window.tronWeb.defaultAddress.base58}
                  />
                )}

                <br />
              </div>
            )}
          </BrowserView>
          <MobileView>
            {this.state.currentpage === "home" && (
              <div className="kontainer">
                <DappTableMoblie />
                <br />
                <DeflationaryTokenTableMobile
                  handlerbttbank={this.handlerbttbank}
                />
                <br />
                {window.tronWeb.defaultAddress.base58 && (
                  <RefferalCard
                    publickey={window.tronWeb.defaultAddress.base58}
                  />
                )}

                <br />
              </div>
            )}
          </MobileView>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <AppHeader style={{ flex: 1 }} />
          </div>{" "}
          please login to{" "}
          <a href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec">
            tronlink
          </a>
        </div>
      );
    }
  }
}

export default App;

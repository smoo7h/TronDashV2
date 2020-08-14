import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DashLogo from "../assets/TronDashLogo.png";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
const styles = {
  root: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto"
  }
};

function AppHeader(props) {
  const { classes } = props;

  return (
    <div>
      <div
        className={classes.root}
        style={{ alignItems: "center", justifyContent: "center" }}
        onClick={props.handler2}
      >
        <BrowserView>
          <img src={DashLogo} alt="" />
        </BrowserView>
        <MobileView>
          <img src={DashLogo} alt="" style={{ width: "100%" }} />
        </MobileView>
      </div>
      <div
        className={classes.root}
        style={{
          alignItems: "center",
          justifyContent: "center"
          // paddingLeft: 32
        }}
      >
        Manage all of your dapps in one place
        <br />
        <a
          style={{ float: "right", paddingLeft: 12 }}
          href="https://forms.gle/P5SBw1qJGX7mSAoEA"
        >
          Submit
        </a>
        <a
          style={{ float: "right", paddingLeft: 12 }}
          href="https://t.me/joinchat/KvdhdA90OAS1fAnp92HXug"
        >
          Telegram
        </a>
        <div
          style={{ float: "right", color: "#FF0014", paddingLeft: 12 }}
          onClick={props.handlertrxbank}
        >
          TrxBank
        </div>
        <div
          style={{ float: "right", color: "#007bff", paddingLeft: 12 }}
          onClick={props.handler}
          //  style={{ color: "#0000EE" }}
        >
          DashToken
        </div>
        <div
          style={{ float: "right", color: "#007bff", paddingLeft: 12 }}
          onClick={props.handlerlotto}
          //  style={{ color: "#0000EE" }}
        >
          DashLotto
        </div>
        <div
          style={{ float: "right", color: "#007bff", paddingLeft: 12 }}
          onClick={props.handlerdapps}
          //  style={{ color: "#0000EE" }}
        >
          DashBank
        </div>
        <div
          style={{ float: "right", color: "#007bff", paddingLeft: 12 }}
          onClick={props.handlerbttbank}
          //  style={{ color: "#0000EE" }}
        >
          BttBank
        </div>
        <div
          style={{ float: "right", color: "#007bff" }}
          onClick={props.handlerexchange}
          //  style={{ color: "#0000EE" }}
        >
          Exchange
        </div>
      </div>
      <br />
    </div>
  );
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppHeader);

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import axios from "axios";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Utils from "utils";
import TronWeb from "tronweb";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import tronbetlogo from "../../assets/tronbet.png"; // Tell Webpack this JS file uses this image
import bankrolllogo from "../../assets/bankroll.png"; // Tell Webpack this JS file uses this image
import livelogo from "../../assets/live.png"; // Tell Webpack this JS file uses this image
import tronpayslogo from "../../assets/tronpayslogo.png"; // Tell Webpack this JS file uses this image
import doublelogo from "../../assets/doublelogo.png"; // Tell Webpack this JS file uses this image
import tronvegaslogo from "../../assets/tronvegas.png"; // Tell Webpack this JS file uses this image
import Slider from "@material-ui/lab/Slider";
import eeeogo from "../../assets/888logo.png"; // Tell Webpack this JS file uses this image
import p3tlogo from "../../assets/p3tlogo.png"; // Tell Webpack this JS file uses this image
import tronraiderlogo from "../../assets/tronraider.png"; // Tell Webpack this JS file uses this image
import safemathroilogo from "../../assets/SafeMathLogo.png"; // Tell Webpack this JS file uses this image
import pokertronlogo from "../../assets/pokertron.png"; // Tell Webpack this JS file uses this image
import tronextlogo from "../../assets/tronext.png"; // Tell Webpack this JS file uses this image
import oneuplogo from "../../assets/one-up.png";
import blazelogo from "../../assets/blazeicon.png";
import dragonlogo from "../../assets/dragon.png";
import winklogo from "../../assets/wink.jpg";
import topialogo from "../../assets/trontopia.png";
import rocketlogo from "../../assets/rocketgame.png";
import moolahlogo from "../../assets/moolahbet.png";
import trxbanklogo from "../../assets/dashcoinlogo.png";
import tewkenairelogo from "../../assets/tewkenairelogo.png";
import justgamelogo from "../../assets/justgameimg.png";

var CryptoJS = require("crypto-js");
let counter = 0;
function createData(
  name,
  contractbalance,
  investment,
  refferal,
  dividend,
  url,
  dividendnumber,
  dailyRoi
) {
  counter += 1;
  return {
    id: name,
    name,
    contractbalance,
    investment,
    refferal,
    dividend,
    url,
    dividendnumber,
    dailyRoi
  };
}

function desc(a, b, orderBy) {
  if (orderBy == "contractbalance") {
    let num1 = b[orderBy];
    let num2 = a[orderBy];

    if (num1 == "") {
      return 0;
    }

    if (Number(num1) < Number(num2)) {
      return -1;
    }
    if (Number(num1) > Number(num2)) {
      return 1;
    }
    return 0;
  } else if (orderBy == "dividend") {
    var num1 = b[orderBy];
    var num2 = a[orderBy];

    if (num1 == "") {
      return 0;
    }
    if (num1.includes("*")) {
      num1 = b[orderBy].toString().replace("* ", "");
    }
    if (num2.includes("*")) {
      num2 = a[orderBy].toString().replace("* ", "");
    }

    if (Number(num1) < Number(num2)) {
      return -1;
    }
    if (Number(num1) > Number(num2)) {
      return 1;
    }
    return 0;
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);

    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "image",
    numeric: false,
    disablePadding: true,
    label: ""
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dapp"
  },
  /* {
    id: "dailyRoi",
    numeric: false,
    disablePadding: true,
    label: "Daily Roi %"
  },*/
  {
    id: "contractbalance",
    numeric: true,
    disablePadding: false,
    label: "Div Pool"
  },

  {
    id: "investment",
    numeric: true,
    disablePadding: false,
    label: "Investment"
  },
  { id: "refferal", numeric: true, disablePadding: false, label: "Referral" },
  { id: "dividend", numeric: true, disablePadding: false, label: "My Dividend" }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 "
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});
var state = {
  value: 50
};
//withdrawll and reinvest functions

let reinvestAll = property => event => {
  var reinvestPercent = property.slider * 0.01;
  /*
  var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
  if (window.location.pathname.length >= 8) {
    userrefferlstring = window.location.pathname.substr(5);
  }
  var refferal;

  if (userrefferlstring.length == 34) {
    refferal = userrefferlstring;
  } else {
    refferal = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
  }
*/
  var refferal = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
  if (window.location.search) {
    refferal = window.location.search.substr(5);
    // console.log(userrefferlstring);
  }
  refferal = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
  var tabledata = property.tabledata;
  // var selecteddata = property.selecteddata;
  /*
  if (tabledata[0].dividendnumber >= 0.5) {
    //bankroll
    Utils.bankrollreinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    );
  }

  if (tabledata[11].dividendnumber >= 0.5) {
    //shrimp
    Utils.shrimpreinvest(reinvestPercent, refferal);
  }
  */
  let objIndex = tabledata.findIndex(obj => obj.id == "TronPays Token");
  if (tabledata[objIndex].dividendnumber >= 0.1) {
    //tron pays token
    Utils.tronpaystokenreinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    ).then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "P3T Token");
  if (tabledata[objIndex].dividendnumber >= 0.5) {
    //p3t token
    Utils.p3TTokenreinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    ).then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Tewkenaire Crazy");
  if (tabledata[objIndex].dividendnumber >= 0.01) {
    //Tewkenaire token
    Utils.tewkenaireTokenReinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    ).then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Tewkenaire Stable");
  if (tabledata[objIndex].dividendnumber >= 0.01) {
    //Tewkenaire token
    Utils.tewkenaireStableTokenReinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    ).then(response => {
      sendairdrop("2");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "Bankroll Credits");
  if (tabledata[objIndex].dividendnumber >= 0.1) {
    //babnkroll credits

    Utils.creditsreinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    ).then(response => {
      sendairdrop("2");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "Bankroll Moon");
  if (tabledata[objIndex].dividendnumber >= 0.1) {
    //babnkroll moon

    Utils.moonreinvest().then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Trx Bank");
  if (tabledata[objIndex].dividendnumber >= 0.1) {
    //trx bank

    Utils.trxbankReinvestDivs().then(response => {
      sendairdrop("2");
    });
  }

  return;
};

let withdrawlAll = property => event => {
  let objIndex = property.findIndex(obj => obj.id == "888 Tron");
  if (property[objIndex].dividendnumber >= 0.1) {
    //888

    Utils.eeewithdrawl().then(response => {
      sendairdrop("1");
    });
  }
  /*
  objIndex = property.findIndex(obj => obj.id == "Blaze Economy");
  if (
    !property[objIndex].dividend.includes("*") &&
    property[objIndex].dividendnumber >= 0.1
  ) {
    //blaze

    Utils.blazewithdrawl().then(response => {
      sendairdrop("1");
    });
  }
*/
  objIndex = property.findIndex(obj => obj.id == "TronTopia");
  if (
    !property[objIndex].dividend.includes("*") &&
    property[objIndex].dividendnumber >= 0.01
  ) {
    //topia

    Utils.topiawithdrawl().then(response => {
      sendairdrop("1");
    });
  }

  objIndex = property.findIndex(obj => obj.id == "TronTopia Diamonds");
  if (
    !property[objIndex].dividend.includes("*") &&
    property[objIndex].dividendnumber >= 0.01
  ) {
    //topia diamonds

    Utils.topiaDiamondwithdrawl().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = property.findIndex(obj => obj.id == "P3T Token");
  if (property[objIndex].dividendnumber >= 0.1) {
    //p3t token
    Utils.p3ttokenwithdrawl().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = property.findIndex(obj => obj.id == "Tewkenaire Crazy");
  if (property[objIndex].dividendnumber >= 0.01) {
    //p3t token
    Utils.tewkenaireTokenwithdrawl().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = property.findIndex(obj => obj.id == "Tewkenaire Stable");
  if (property[objIndex].dividendnumber >= 0.01) {
    //p3t token
    Utils.tewkenaireStableTokenwithdrawl().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = property.findIndex(obj => obj.id == "TronPays Token");
  if (property[objIndex].dividendnumber >= 0.1) {
    //tron pays token
    Utils.paystokenwithdrawl().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = property.findIndex(obj => obj.id == "Trx Bank");
  if (property[objIndex].dividendnumber >= 0.1) {
    //trx bank
    Utils.trxbankwithdrawlDivs().then(response => {
      sendairdrop("1");
    });
  }

  /*
  objIndex = property.findIndex(obj => obj.id == "Trondouble D3T Token");
  if (property[objIndex].dividendnumber >= 0.1) {
    //double token
    Utils.doubleTokenwithdrawl().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = property.findIndex(obj => obj.id == "SafeMath");
  if (property[objIndex].dividendnumber >= 0.1) {
    //math roi
    Utils.mathroiwithdrawl(window.tronWeb.defaultAddress.base58).then(
      response => {
        sendairdrop("1");
      }
    );
  }
  */
  objIndex = property.findIndex(obj => obj.id == "Bankroll Credits");
  if (property[objIndex].dividendnumber >= 0.1) {
    //bankrollcredits
    Utils.creditswithdrawl().then(response => {
      sendairdrop("1");
    });
  }

  objIndex = property.findIndex(obj => obj.id == "Bankroll Moon");
  if (property[objIndex].dividendnumber >= 0.1) {
    //bankrollcredits
    Utils.moonwithdrawl().then(response => {
      sendairdrop("1");
    });
  }

  //
  objIndex = property.findIndex(obj => obj.id == "Bankroll Daily");
  if (property[objIndex].dividendnumber >= 0.1) {
    //bankroll roi
    Utils.bankrollwithdrawl().then(response => {
      sendairdrop("1");
    });
  }
  // sendairdrop("1");
  //creditswithdrawl
};

let reinvestSelected = property => event => {
  var reinvestPercent = property.slider * 0.01;

  var refferal = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
  if (window.location.search) {
    refferal = window.location.search.substr(5);
    // console.log(userrefferlstring);
  }
  refferal = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
  /*
  if (window.location.pathname.length >= 8) {
    userrefferlstring = window.location.pathname.substr(5);
  }
  

  if (userrefferlstring.length == 34) {
    refferal = userrefferlstring;
  } else {
    refferal = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
  }
  */

  var tabledata = property.tabledata;
  var selecteddata = property.selecteddata;
  let objIndex = tabledata.findIndex(obj => obj.id == "TronPays Token");
  /*if (
    tabledata[0].dividendnumber >= 0.5 &&
    selecteddata.includes(tabledata[0].id)
  ) {
    //bankroll
    Utils.bankrollreinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    );
  }
*/
  objIndex = tabledata.findIndex(obj => obj.id == "TronPays Token");
  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //tron pays token
    Utils.tronpaystokenreinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    ).then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "P3T Token");
  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //p3t token
    Utils.p3TTokenreinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    ).then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Tewkenaire Crazy");
  if (
    tabledata[objIndex].dividendnumber >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //p3t token
    Utils.tewkenaireTokenReinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    ).then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Tewkenaire Stable");
  if (
    tabledata[objIndex].dividendnumber >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //p3t token
    Utils.tewkenaireStableTokenReinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    ).then(response => {
      sendairdrop("2");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "Bankroll Credits");
  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //babnkroll credits

    Utils.creditsreinvest(
      window.tronWeb.defaultAddress.base58,
      reinvestPercent,
      refferal
    ).then(response => {
      sendairdrop("2");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "Bankroll Moon");
  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //babnkroll credits

    Utils.moonreinvest().then(response => {
      sendairdrop("2");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "Trx Bank");
  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //babnkroll credits

    Utils.trxbankReinvestDivs().then(response => {
      sendairdrop("2");
    });
  }

  // sendairdrop("2");
  //creditsreinvest
};

let withdrawlSelected = property => event => {
  var tabledata = property.tabledata;
  var selecteddata = property.selecteddata;
  let objIndex = tabledata.findIndex(obj => obj.id == "888 Tron");

  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //888

    Utils.eeewithdrawl().then(response => {
      sendairdrop("1");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "TronTopia");
  if (
    !tabledata[objIndex].dividend.includes("*") &&
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //blaze
    Utils.topiawithdrawl().then(response => {
      sendairdrop("1");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "TronTopia Diamonds");
  if (
    !tabledata[objIndex].dividend.includes("*") &&
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //blaze
    Utils.topiaDiamondwithdrawl().then(response => {
      sendairdrop("1");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "P3T Token");
  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //p3t token
    Utils.p3ttokenwithdrawl().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Tewkenaire Crazy");
  if (
    tabledata[objIndex].dividendnumber >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //p3t token
    Utils.tewkenaireTokenwithdrawl().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Tewkenaire Stable");
  if (
    tabledata[objIndex].dividendnumber >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //p3t token
    Utils.tewkenaireStableTokenwithdrawl().then(response => {
      sendairdrop("1");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "Bankroll Daily");
  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //bankroll roi
    Utils.bankrollwithdrawl().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "TronPays Token");
  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //tron pays token
    Utils.paystokenwithdrawl().then(response => {
      sendairdrop("1");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "Bankroll Credits");
  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //bankrollcredits
    Utils.creditswithdrawl().then(response => {
      sendairdrop("1");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "Bankroll Moon");
  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //bankrollcredits
    Utils.moonwithdrawl().then(response => {
      sendairdrop("1");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "Trx Bank");
  if (
    tabledata[objIndex].dividendnumber >= 0.1 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //bankrollcredits
    Utils.trxbankwithdrawlDivs().then(response => {
      sendairdrop("1");
    });
  }
};

var sendairdrop = type => {
  {
    let userrefferlstring = "none";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    //login
    let resstring =
      window.tronWeb.defaultAddress.base58 +
      "|" +
      userrefferlstring +
      "|" +
      type;

    let ciphertext = CryptoJS.AES.encrypt(resstring, "smokeweed");

    let sendbackstring = ciphertext.toString().replace("/", "|");

    sendbackstring =
      "https://dashairdrop.azurewebsites.net/api/airdrop?id=" + sendbackstring;
    axios
      .get(sendbackstring)
      .then(response => {
        console.log("u are in");
      })
      .catch(error => console.log(error));
  }
};

var handleChange = (event, value) => {
  if (value < 1) {
    value = 1;
  }

  state = {
    value: value
  };
};

let EnhancedTableToolbar = props => {
  const { numSelected, classes, totaldivsselected } = props;

  const styles = {
    root: {
      width: 100
    },
    slider: {
      padding: "22px 0px"
    }
  };

  var passbackdata = {
    selecteddata: props.selecteddata,
    tabledata: props.tabledata,
    slider: state.value.toFixed(0)
  };

  if (
    window.tronWeb.defaultAddress.base58 != "TMFcSHfVQV5x6rJrmkaw223AdmHR9NQAbP"
  ) {
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <div>
              <Typography color="inherit" variant="subtitle1">
                {numSelected} selected
              </Typography>
              {/* 
              <Typography variant="p" id="tableTitle">
                <Switch
                  checked={state.checkedA ? true : false}
                  onChange={props.filtertoggle}
                  value="checkedA"
                />
                show invested
              </Typography>
            */}
            </div>
          ) : (
            <div>
              <Typography variant="h6" id="tableTitle">
                Dapp Dividends
              </Typography>
              {/* 
              <Typography variant="p" id="tableTitle">
                <Switch
                  checked={state.checkedA}
                  onChange={props.filtertoggle}
                  value="checkedA"
                />
                show invested
              </Typography>
              */}
            </div>
          )}
        </div>
        <div className={classes.spacer} />

        <div className={classes.actions} style={{ paddingRight: 12 }}>
          {numSelected > 0 ? (
            <div>
              <Typography style={{ paddingBottom: 8 }}>
                Selected Available Divs:
              </Typography>
              <Typography style={{ paddingBottom: 8 }}>
                Divs Per Day:
              </Typography>
            </div>
          ) : (
            <div>
              <Typography style={{ paddingBottom: 8 }}>
                Available Divs:
              </Typography>
              <Typography style={{ paddingBottom: 8 }}>
                Divs Per Day:
              </Typography>
            </div>
          )}
        </div>
        <div className={classes.actions} style={{ paddingRight: 86 }}>
          {numSelected > 0 ? (
            <div>
              <Typography style={{ paddingBottom: 8 }}>
                <b>{" " + props.totaldivsselected} trx</b>
              </Typography>
              <Typography style={{ paddingBottom: 8 }}>
                <b>{" " + props.mybalance} trx</b>
              </Typography>
            </div>
          ) : (
            <div>
              <Typography style={{ paddingBottom: 8 }}>
                <b>{" " + props.totaldivs} trx</b>
              </Typography>
              <Typography style={{ paddingBottom: 8 }}>
                <b>{" " + props.mybalance + " "} trx</b>
              </Typography>
            </div>
          )}
        </div>

        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="reinvest">
              <Button
                variant="contained"
                color="secondary"
                aria-label="reinvest"
                className={classes.button}
                onClick={reinvestSelected(passbackdata, props.selecteddata)}
                style={{ marginLeft: 8 }}
              >
                reinvest selected
              </Button>
            </Tooltip>
          ) : (
            <div>
              <Tooltip title="reinvest">
                <Button
                  style={{ marginLeft: 8 }}
                  variant="contained"
                  color="secondary"
                  aria-label="reinvest"
                  className={classes.button}
                  onClick={reinvestAll(passbackdata, props.selecteddata)}
                >
                  reinvest all
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <div className={classes.actions}>
              {numSelected > 0 ? (
                <div
                  className={classes.root}
                  style={{ paddingLeft: 8, paddingRight: 8 }}
                >
                  <Typography id="label" style={{ paddingBottom: 8 }}>
                    Reinvest {state.value.toFixed(0)}%
                  </Typography>
                  <Slider
                    classes={{ container: classes.slider }}
                    value={state.value}
                    aria-labelledby="label"
                    step={10}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          ) : (
            <div
              className={classes.root}
              style={{ paddingLeft: 8, paddingRight: 8 }}
            >
              <Typography id="reinvest" style={{ paddingBottom: 8 }}>
                Reinvest {state.value.toFixed(0)}%
              </Typography>
              <Slider
                classes={{ container: classes.slider }}
                value={state.value}
                aria-labelledby="reinvest"
                onChange={handleChange}
                step={10}
              />
            </div>
          )}
        </div>
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="You must have 0.01  div to withdrawl">
              <Button
                style={{ marginLeft: 8 }}
                variant="contained"
                color="primary"
                aria-label="withdrawal selected"
                className={classes.button}
                onClick={withdrawlSelected(props, props.selecteddata)}
              >
                withdrawal selected
              </Button>
            </Tooltip>
          ) : (
            <div>
              <Tooltip title="You must have 0.01 trx div to withdrawl">
                <Button
                  style={{ marginLeft: 8 }}
                  variant="contained"
                  color="primary"
                  aria-label="withdrawal all"
                  className={classes.button}
                  onClick={withdrawlAll(props.tabledata)}
                >
                  withdrawal all
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      </Toolbar>
    );
  } else {
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <div>
              <Typography variant="h6" id="tableTitle">
                Dapp Dividends
              </Typography>
            </div>
          )}
        </div>
      </Toolbar>
    );
  }
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  avatar: {
    margin: 10
  }
});

class DappTable extends React.Component {
  state = {
    //refferalstring=window.location.search.substr(5) ? window.location.search.substr(5): "",
    filter: true,
    order: "desc",
    orderBy: "contractbalance",
    selected: [],
    data: [
      createData(
        "Tewkenaire Crazy",
        "",
        "",
        "",
        "",
        "https://tewkenaire.com/crazy.html?masternode=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT"
      ),
      createData(
        "P3T Token",
        "",
        "",
        "",
        "",
        "https://p3t.network?masternode=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT"
      ),
      createData(
        "Bankroll Daily",
        "",
        "",
        "",
        "",
        "https://bankroll.network/daily.html?ref=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT"
      ),
      createData(
        "TronPays Token",
        "",
        "",
        "",
        "",
        "https://tronpays.com/?ref=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT"
      ),
      createData(
        "Tron Vegas",
        "",
        "",
        "",
        "",
        "https://tron.cryptovegas.net?intro=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT"
      ),
      createData(
        "Bankroll Moon",
        "",
        "",
        "",
        "",
        "https://bankroll.network/moon.html?ref=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT"
      ),
      createData("Wink", "", "", "", "", "https://www.wink.org/?r=trondash"),

      createData(
        "Bankroll Credits",
        "",
        "",
        "",
        "",
        "https://bankroll.network/credits.html?ref=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT"
      ),

      createData(
        "TronBet Live",
        "",
        "",
        "",
        "",
        "https://www.wink.org/?r=trondash"
      ),

      createData(
        "TronTopia",
        "",
        "",
        "",
        "",
        "https://trontopia.co/index.php?refid=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT"
      ),
      createData(
        "TronTopia Diamonds",
        "",
        "",
        "",
        "",
        "https://trontopia.co/index.php?refid=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT"
      ),
      createData(
        "Rocketgame",
        "",
        "",
        "",
        "",
        "https://rocketgame.io/#/?code=XOsSga2kQ8"
      ),
      createData("Moolah.bet", "", "", "", "", "https://moolah.bet/r/19605"),
      createData(
        "TronBet Dice",
        "",
        "",
        "",
        "",
        "https://www.wink.org/?r=trondash"
      ),
      createData("888 Tron", "", "", "", "", "https://888tron.com/?r=smooth"),
      createData("Trx Bank", "", "", "", "", "https://trondash.com/trxbank"),
      createData("Justgame", "", "", "", "", "https://curvy.ai/slashd0t"),
      createData(
        "Tewkenaire Stable",
        "--",
        "--",
        "--",
        "--",
        "https://tewkenaire.com/stable.html"
      )
    ],
    page: 0,
    rowsPerPage: 18
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));

      return;
    }

    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
    this.calculateTotalDivsSelected();
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async componentDidMount() {
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
    this.fetchTronBetInfo();
    this.fetchTableData1();
    this.fetchTableData2();
    this.fetchTableDataTewkenaire();
    this.fetchTableDataTewkenaireStable();
    this.fetchMoolahTableData();
    this.fetchTableData5();
    this.fetchTableData6();
    this.fetchTableData7();
    this.fetchMoolahInfo();
    this.fetchTableData8();
    this.fetchTableDataBankRollMoon();
    this.fetchTableDataRocketGame();
    this.fetchTableDataTronTopia();
    this.fetchTableDataTronTopiaDiamond();
    this.fetchTableDataWinDrops();
    this.fetchTableDataTrxBank();
    this.fetchTableDatajustgame();
    this.fetchTableData15();
    this.fetchTableData17();
    this.sendairdrop("0");

    this.interval = setInterval(
      () =>
        this.fetchTableData1() &&
        this.fetchTableData2() &&
        this.fetchMoolahTableData() &&
        this.fetchTableData5() &&
        this.fetchTableDataTewkenaire() &&
        this.fetchMoolahInfo() &&
        this.fetchTableData6() &&
        this.fetchTableDataTewkenaireStable() &&
        this.fetchTableData7() &&
        this.fetchTableData8() &&
        this.fetchTableDataTronTopia() &&
        this.fetchTableDataTronTopiaDiamond() &&
        this.fetchTableDataWinDrops() &&
        this.fetchTableData15() &&
        this.fetchTableDataBankRollMoon() &&
        this.fetchTableDataRocketGame() &&
        this.fetchTableData17() &&
        this.fetchTableDataTrxBank() &&
        this.calculateTotalDivsSelected() &&
        this.fetchTableDatajustgame() &&
        this.fetchMy24hdivs(),
      //   this.fetchTableData3(),
      3000
    );
  }
  async calculateTotalDivs() {
    let initialValue = 0;
    let objArray = this.state.data;
    let sum = objArray.reduce(function(total, currentValue) {
      let currentnumberstring = currentValue.dividend
        .replace(" trx", "")
        .replace("--", "0");
      //  .replace("* ", "");

      if (currentnumberstring.includes("*")) {
        currentnumberstring = "0";
      }
      //pro erroring on this
      let mynum = Number(currentnumberstring);
      if (!mynum) {
        mynum = 0;
      }

      return total + mynum;
    }, initialValue);
    this.setState({
      totaldivs: sum.toFixed(2).toString()
    });
  }
  async calculateTotalDivsSelected() {
    let initialValue = 0;
    let objArray = this.state.data;
    let selected = this.state.selected;

    let sum = objArray.reduce(function(total, currentValue) {
      let currentnumberstring = "0";
      if (selected.includes(currentValue.id)) {
        currentnumberstring = currentValue.dividend
          .replace(" trx", "")
          .replace("--", "0");
      }

      if (currentnumberstring.includes("*")) {
        currentnumberstring = "0";
      }

      let mynum = Number(currentnumberstring);
      if (!mynum) {
        mynum = 0;
      }

      return total + mynum;
    }, initialValue);

    this.setState({
      totaldivsselected: sum.toFixed(2).toString()
    });
  }
  cleanstring(inputdata) {
    let currentnumberstring = inputdata
      .replace(" trx", "")
      .replace("--", "0")
      .replace("* ", "");

    let mynum = Number(currentnumberstring);
    if (!mynum) {
      mynum = 0;
    }
    return mynum;
  }
  async fetchMyBalance() {
    window.tronWeb.trx
      .getBalance(window.tronWeb.defaultAddress.base58)
      .then(x => {
        this.setState({
          mybalance: Number((x * 0.000001).toFixed(2)).toLocaleString("en")
        });
      });
  }
  async fetchMy24hdivs() {
    let initialValue = 0;
    let objArray = this.state.data;
    let sum = objArray.reduce(function(total, currentValue) {
      let currentnumberstring = currentValue.dividend
        .replace(" trx", "")
        .replace("--", "0");
      //  .replace("* ", "");
      if (currentnumberstring.includes("*")) {
        currentnumberstring = currentnumberstring.replace("* ", "");
        //pro erroring on this
        let mynum = Number(currentnumberstring);
        if (!mynum) {
          mynum = 0;
        }
        let t = total + mynum;
        if (t < 0) {
          t = 0;
        }
        return t;
      } else {
        //check for daily ROI
        //  console.log(currentValue.name);
        //console.log(currentValue.investment);
        if (currentValue.dailyRoi && currentValue.investment) {
          if (
            //currentValue.name == "TronPays ROI" ||
            //  currentValue.name == "Bankroll" ||
            currentValue.name == "SafeMath"
            // currentValue.name == "1Up ROI"
          ) {
            //1 - 2%
            var dailypercent = currentValue.dailyRoi
              .replace("1 - 2%", "1")
              .replace("%", "");
            var myinvestment = currentValue.investment
              .toString()
              .replace(",", "");

            var dailypercentnumber = Number(dailypercent) * 0.01;

            var calc24h = Number(myinvestment) * dailypercentnumber;

            return total + calc24h;
          } else {
            return total;
          }
        } else {
          return total;
        }
      }
    }, initialValue);

    //calc daily roi value

    var totalcasino = sum.toFixed(2);

    this.setState({
      twhDivs: totalcasino.toString()
    });
  }
  async sendairdrop(type) {
    let userrefferlstring = "none";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    //login
    let resstring =
      window.tronWeb.defaultAddress.base58 +
      "|" +
      userrefferlstring +
      "|" +
      type;

    let ciphertext = CryptoJS.AES.encrypt(resstring, "smokeweed");

    let sendbackstring = ciphertext.toString().replace("/", "|");

    sendbackstring =
      "https://dashairdrop.azurewebsites.net/api/airdrop?id=" + sendbackstring;
    axios
      .get(sendbackstring)
      .then(response => {
        console.log("u are in");
      })
      .catch(error => console.log(error));
  }

  async fetchTronBetInfo() {
    //https://888tron.com/api1/getCabinetDividends

    axios
      .get(
        "https://gettrondashdatadash.azurewebsites.net/api/GetData?code=cuaWYE6VttDteeGZOhw7qQiB27ncpyrQux6a7f4bid8oZPMqcokdJg=="
      )
      .then(response => {
        this.setState({
          TronBetDivPool: Number(response.data.TronBetDivPool).toFixed(0)
        });
        this.setState({
          TroNextDivPool: Number(response.data.TroNextDivPool).toFixed(0)
        });
        this.setState({
          TronBetDailyRoi:
            Number(response.data.TronBetDailyRoi)
              .toFixed(2)
              .toString() + "%"
        });
        this.setState({
          EEEDailyRoi:
            Number(response.data.EEEDailyRoi)
              .toFixed(2)
              .toString() + "%"
        });
        this.setState({
          TronVegasDailyRoi:
            Number(response.data.TronVegasDailyRoi)
              .toFixed(2)
              .toString() + "%"
        });
        this.setState({
          TronWowDailyRoi:
            Number(response.data.TronWowDailyRoi)
              .toFixed(2)
              .toString() + "%"
        });
        this.setState({
          TronWowDivPool: Number(response.data.TronWowDivPool)
            .toFixed(2)
            .toString()
        });
        this.setState({
          TronWowFrozen: Number(response.data.TronWowFrozen)
            .toFixed(2)
            .toString()
        });
        this.setState({
          TroNextFrozen: Number(response.data.TroNextFrozen)
            .toFixed(2)
            .toString()
        });
        /*
        this.setState({
          LiveDivPool: Number(response.data.LiveDivPool)
            .toFixed(2)
            .toString()
        });
*/
        this.setState({
          WinkDivPool: Number(response.data.TronWinDivPool)
            .toFixed(2)
            .toString()
        });
        this.setState({
          RocketDivPool: Number(response.data.RocketDivPool)
            .toFixed(2)
            .toString()
        });
        this.setState({
          RocketFrozen: Number(response.data.RocketFrozen)
            .toFixed(2)
            .toString()
        });

        // create an array of contacts only with relevant data
        //TroNextFrozen
        // store the new state object in the component's state
        //   return response;
      })
      .catch(error => console.log(error));

    //fetch moolas data
    //get current address
    let moolahapiurl = "https://api.moolah.bet/dividends/trx";
    let moolahuserapi = "https://api.moolah.bet/user/info/";
    let liveapi = "https://pro-live.wink.org/user/profit";
    if (window.tronWeb.defaultAddress.hex) {
      moolahuserapi = moolahuserapi + window.tronWeb.defaultAddress.hex;
    }

    axios
      .get(liveapi)
      .then(response => {
        var liveamount = response.data.data.amount * 0.97;

        this.setState({
          LiveDivPool: Number(liveamount)
            .toFixed(0)
            .toString()
        });
      })
      .catch(error => console.log(error));

    axios
      .get(moolahuserapi)
      .then(response => {
        this.setState({
          MoolahUserStaked:
            Number(response.data.stakeUpdcAmount)
              .toFixed(2)
              .toString() + " updc"
        });
      })
      .catch(error => console.log(error));

    axios
      .get(moolahapiurl)
      .then(response => {
        this.setState({
          MoolahDivPool: Number(response.data.totalDividends)
            .toFixed(2)
            .toString()
        });
        this.setState({
          MoolahFrozen: Number(response.data.totalSumStaked)
            .toFixed(2)
            .toString()
        });
        /*
        this.setState({
          MoolahUserDiv: Number(response.data.userDividend)
            .toFixed(2)
            .toString()
        });
        */
      })
      .catch(error => console.log(error));
  }

  async fetchMoolahInfo() {
    //fetch moolas data
    //get current address
    let moolahapiurl = "https://api.moolah.bet/dividends/trx";
    let moolahuserapi = "https://api.moolah.bet/user/info/";
    let moolahuserhistoryapi = "https://api.moolah.bet/collect_history/";
    //https://api.moolah.bet/collect_history/419c86C81265b2E582A96274C9A76a55ddd81a878F

    if (window.tronWeb.defaultAddress.hex) {
      moolahuserapi = moolahuserapi + window.tronWeb.defaultAddress.hex;
      moolahuserhistoryapi =
        moolahuserhistoryapi + window.tronWeb.defaultAddress.hex;
    }
    console.log(moolahuserhistoryapi);
    axios
      .get(moolahuserapi)
      .then(response => {
        this.setState({
          MoolahUserStaked:
            Number(response.data.stakeUpdcAmount)
              .toFixed(2)
              .toString() + " updc"
        });
      })
      .catch(error => console.log(error));

    axios
      .get(moolahuserhistoryapi)
      .then(response => {
        var total = response.data.reduce((a, b) => +a + +b.value, 0);

        this.setState({
          MoolahUserDiv: (Number(total) * 0.000001).toFixed(2).toString()
        });
      })
      .catch(error => {
        this.setState({
          MoolahUserDiv: "0"
        });
        console.log(error);
      });

    axios
      .get(moolahapiurl)
      .then(response => {
        this.setState({
          MoolahDivPool: Number(response.data.totalDividends)
            .toFixed(2)
            .toString()
        });
        this.setState({
          MoolahFrozen: Number(response.data.totalSumStaked)
            .toFixed(2)
            .toString()
        });
      })
      .catch(error => console.log(error));
  }

  async fetchTableData0() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Poker Tron BJ");
    updateddata[objIndex] = createData(
      "Poker Tron BJ",

      await Utils.fetchPokerTronBJBalance(),
      await Utils.fetchPokerTronBJUserFrozen(
        window.tronWeb.defaultAddress.base58
      ),
      "--",
      await Utils.fetchPokerTronBJEstimatedDivs(
        window.tronWeb.defaultAddress.base58
      ),

      "https://pokertron.io/?invite=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchPokerTronBJEstimatedDivs(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData1() {
    // this.fetchTronBetInfo();
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "TronBet Dice");
    updateddata[objIndex] = createData(
      "TronBet Dice",
      this.state.TronBetDivPool ? this.state.TronBetDivPool : 0,
      await Utils.fetchTronBetAnteStakerInvestment(
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchTronBetAnteStakerRefferalReward(
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchTronBetAnteStakerAvailableDividend(
        window.tronWeb.defaultAddress.base58,
        this.state.TronBetDivPool
      ),

      "https://www.tronbet.io/?r=trondash",
      0,
      this.state.TronBetDailyRoi ? this.state.TronBetDailyRoi : "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData2() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
      // console.log(userrefferlstring);
    }
    //  this.fetchTronBetInfo();

    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "888 Tron");
    updateddata[objIndex] = createData(
      "888 Tron",
      await Utils.fetchEEEBalance(),
      await Utils.fetchEEEInvestment(window.tronWeb.defaultAddress.base58),
      await Utils.fetchEEERefferalReward(window.tronWeb.defaultAddress.base58),
      await Utils.fetchEEEAvailableDividend(
        window.tronWeb.defaultAddress.base58
      ),
      "https://888tron.com/?r=smooth",
      this.cleanstring(
        await Utils.fetchEEEAvailableDividend(
          window.tronWeb.defaultAddress.base58
        )
      ),
      this.state.EEEDailyRoi ? this.state.EEEDailyRoi : "0"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchMoolahTableData() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
      // console.log(userrefferlstring);
    }
    //  this.fetchTronBetInfo();
    //MoolahUserStaked MoolahUserDiv
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Moolah.bet");
    updateddata[objIndex] = createData(
      "Moolah.bet",
      this.state.MoolahDivPool ? this.state.MoolahDivPool : "0",
      this.state.MoolahUserStaked ? this.state.MoolahUserStaked : "0 updc",
      "--",
      this.state.MoolahUserDiv ? this.state.MoolahUserDiv : "0",
      "https://moolah.bet/r/19605",
      this.cleanstring(
        this.state.MoolahUserDiv ? this.state.MoolahUserDiv : "0"
      ),
      "0"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData3() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Blaze Economy");
    updateddata[objIndex] = createData(
      "Blaze Economy",
      await Utils.fetchblazecontractbalance(),
      await Utils.fetchblazeinvestment(window.tronWeb.defaultAddress.base58),
      await Utils.fetchblazeRefferal(window.tronWeb.defaultAddress.base58), //fetchblazeRefferal
      await Utils.fetchblazedivs(window.tronWeb.defaultAddress.base58),
      "https://blazeeconomy.com/?ref=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchblazedivs(window.tronWeb.defaultAddress.base58)
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData4() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Tron Raider");
    updateddata[objIndex] = createData(
      "Tron Raider",
      await Utils.fetchTronRaiderBalance(),
      await Utils.fetchTronRaiderFrozen(window.tronWeb.defaultAddress.base58),
      await Utils.fetchTronRaiderRefferal(window.tronWeb.defaultAddress.base58),
      await Utils.fetchTronRaiderAvailableDivs(
        window.tronWeb.defaultAddress.base58
      ),
      "https://www.tronraider.io/?r=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchTronRaiderAvailableDivs(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData5() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "P3T Token");
    updateddata[objIndex] = createData(
      "P3T Token",
      await Utils.fetchP3TTokenBalance(),
      await Utils.fetchP3TTokenInvestment(window.tronWeb.defaultAddress.base58),
      await Utils.fetchP3TTokenRefferalReward(
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchP3TTokenAvailableDividend(
        window.tronWeb.defaultAddress.base58
      ),
      "https://p3t.network?masternode=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchP3TTokenAvailableDividend(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData6() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Bankroll Daily");
    updateddata[objIndex] = createData(
      "Bankroll Daily",
      await Utils.fetchBankRollROIContractBalance2(),
      await Utils.fetchBankRollROIInvestment(
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchBankRollROIRefferalReward(),
      await Utils.fetchBankRollROIAvailableDividend(
        window.tronWeb.defaultAddress.base58
      ),
      "https://bankroll.network/daily.html?ref=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT",
      this.cleanstring(
        await Utils.fetchBankRollROIAvailableDividend(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "2%"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData7() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;

    //Find index of specific object using findIndex method.
    let objIndex = updateddata.findIndex(obj => obj.id == "TronPays Token");

    updateddata[objIndex] = createData(
      "TronPays Token",
      await Utils.fetchTronPaysTokenBalance(),
      await Utils.fetchTronPaysTokenInvestment(
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchTronPaysTokenRefferalReward(
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchTronPaysTokenAvailableDividend(
        window.tronWeb.defaultAddress.base58
      ),
      "https://tronpays.com/?ref=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchTronPaysTokenAvailableDividend(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData8() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;

    let objIndex = updateddata.findIndex(obj => obj.id == "Tron Vegas");
    updateddata[objIndex] = createData(
      "Tron Vegas",
      await Utils.fetchTronVegasBalance(),
      await Utils.fetchTronVegasInvestment(
        window.tronWeb.defaultAddress.base58
      ),
      "--",
      await Utils.fetchTronVegasAvailableDividend(
        window.tronWeb.defaultAddress.base58
      ),

      "https://tron.cryptovegas.net?intro=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchTronVegasAvailableDividend(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData9() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Tronext");
    updateddata[objIndex] = createData(
      "Tronext",
      this.state.TroNextDivPool ? this.state.TroNextDivPool : "--",
      await Utils.fetchTronextInvestment(window.tronWeb.defaultAddress.base58),
      await Utils.fetchTronextRefferal(window.tronWeb.defaultAddress.base58),
      await Utils.fetchTronextAvailableDivs(
        window.tronWeb.defaultAddress.base58,
        this.state.TroNextDivPool ? this.state.TroNextDivPool : null,
        this.state.TroNextFrozen ? this.state.TroNextFrozen : null
      ),

      "https://tronext.io/?referral=126290",
      this.cleanstring(
        await Utils.fetchTronextAvailableDivs(
          window.tronWeb.defaultAddress.base58,
          this.state.TroNextDivPool ? this.state.TroNextDivPool : null,
          this.state.TroNextFrozen ? this.state.TroNextFrozen : null
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData10() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(
      obj => obj.id == "Trondouble D3T Token"
    );
    updateddata[objIndex] = createData(
      "Trondouble D3T Token",
      await Utils.fetchD3TTokenBalance(),
      await Utils.fetchD3TTokenInvestment(window.tronWeb.defaultAddress.base58),
      await Utils.fetchD3TTokenRefferalReward(
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchD3TTokenAvailableDividend(
        window.tronWeb.defaultAddress.base58
      ),
      "https://www.trondouble.com/?refcode=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchD3TTokenAvailableDividend(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData11() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;

    updateddata[11] = createData(
      "Tron Shrimp",
      await Utils.fetchTronShrimpBalance(),
      await Utils.fetchTronShrimpInvestment(
        window.tronWeb.defaultAddress.base58
      ),

      await Utils.fetchTronShrimpRefferalReward(
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchTronShrimpAvailableDividend(
        window.tronWeb.defaultAddress.base58
      ),
      "https://tronshrimp2.farm/?ref=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchTronShrimpAvailableDividend(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData12() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "SafeMath");
    updateddata[objIndex] = createData(
      "SafeMath",
      await Utils.fetchSafeMathROIContractBalance(),
      await Utils.fetchSafeMathROIInvestment(
        window.tronWeb.defaultAddress.base58
      ),

      await Utils.fetchSafeMathROIRefferalReward(
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchSafeMathROIAvailableDividend(
        window.tronWeb.defaultAddress.base58
      ),
      "https://safemath.io/?ref=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchSafeMathROIAvailableDividend(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "3.33%"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData13() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Poker Tron");
    updateddata[objIndex] = createData(
      "Poker Tron",
      await Utils.fetchPokerTronBalance(),
      await Utils.fetchPokerTronUserFrozen(
        window.tronWeb.defaultAddress.base58
      ),

      "--",
      await Utils.fetchPokerTronEstimatedDivs(
        window.tronWeb.defaultAddress.base58
      ),
      "https://pokertron.io/?invite=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchPokerTronEstimatedDivs(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableDataWinDrops() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Wink");
    updateddata[objIndex] = createData(
      "Wink",
      this.state.WinkDivPool,
      await Utils.fetchTronBetWinStakerInvestment(
        window.tronWeb.defaultAddress.base58
      ),

      "--",
      await Utils.fetchTronBetWinplayerdiv(
        window.tronWeb.defaultAddress.base58,
        this.state.WinkDivPool ? this.state.WinkDivPool : 0
      ),
      "https://www.wink.org/?r=trondash",
      this.state.WinkDivPool,
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData15() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Bankroll Credits");
    updateddata[objIndex] = createData(
      "Bankroll Credits",
      await Utils.fetchcreditscontractbalance(),
      await Utils.fetchcreditsinvestment(window.tronWeb.defaultAddress.base58),

      await Utils.fetchcreditsrefferal(),
      await Utils.fetchcreditsdividends(window.tronWeb.defaultAddress.base58),
      "https://bankroll.network/credits.html?ref=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchcreditsdividends(window.tronWeb.defaultAddress.base58)
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableDataBankRollMoon() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Bankroll Moon");
    updateddata[objIndex] = createData(
      "Bankroll Moon",
      await Utils.fetchmooncontractbalance(),
      await Utils.fetchmooninvestment(window.tronWeb.defaultAddress.base58),

      await Utils.fetchmoonrefferal(),
      await Utils.fetchmoondividends(window.tronWeb.defaultAddress.base58),
      "https://bankroll.network/moon.html?ref=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchmoondividends(window.tronWeb.defaultAddress.base58)
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableDataRocketGame() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Rocketgame");
    updateddata[objIndex] = createData(
      "Rocketgame",
      this.state.RocketDivPool,
      await Utils.fetchrocketinvestment(window.tronWeb.defaultAddress.base58),

      "--",
      await Utils.fetchrocketdividends(
        window.tronWeb.defaultAddress.base58,
        this.state.RocketDivPool,
        this.state.RocketFrozen
      ),
      "https://rocketgame.io/#/?code=XOsSga2kQ8",
      "--",
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableDataTewkenaire() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Tewkenaire Crazy");
    updateddata[objIndex] = createData(
      "Tewkenaire Crazy",
      await Utils.fetchTewkenaireContractTokenBalance(),
      await Utils.fetchTewkenaireTokenInvestment(
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchTewkenaireTokenRefferalReward(
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchTewkenaireTokenAvailableDividend(
        window.tronWeb.defaultAddress.base58
      ),
      "https://tewkenaire.com/crazy.html?masternode=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT",
      this.cleanstring(
        await Utils.fetchTewkenaireTokenAvailableDividend(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableDataTewkenaireStable() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Tewkenaire Stable");
    updateddata[objIndex] = createData(
      "Tewkenaire Stable",
      await Utils.fetchTewkenaireStableContractTokenBalance(),
      await Utils.fetchTewkenaireStableTokenInvestment(
        window.tronWeb.defaultAddress.base58
      ),
      "--",
      await Utils.fetchTewkenaireStableTokenAvailableDividend(
        window.tronWeb.defaultAddress.base58
      ),
      "https://tewkenaire.com/stable.html",
      this.cleanstring(
        await Utils.fetchTewkenaireStableTokenAvailableDividend(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData16() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;

    updateddata[16] = createData(
      "Tron Wow",
      // this.state.TronWowDivPool ? this.state.TronWowDivPool : "--",
      this.state.TronWowDivPool ? this.state.TronWowDivPool : "--",
      await Utils.fetchtronwowinvestment(window.tronWeb.defaultAddress.base58),

      "--",
      await Utils.fetchtronwowdivs(
        window.tronWeb.defaultAddress.base58,
        this.state.TronWowFrozen ? this.state.TronWowFrozen : "0",
        this.state.TronWowDivPool ? this.state.TronWowDivPool : "0"
      ),
      "https://tronwow.com/?ref=" + userrefferlstring,
      this.cleanstring(
        await Utils.fetchtronwowdivs(
          window.tronWeb.defaultAddress.base58,
          this.state.TronWowFrozen ? this.state.TronWowFrozen : "0",
          this.state.TronWowDivPool ? this.state.TronWowDivPool : "0"
        )
      ),
      this.state.TronWowDailyRoi ? this.state.TronWowDailyRoi : "--"
    );

    this.setState({
      data: this.state.data
    });
    // this.calculateTotalDivs();
  }

  async fetchTableData17() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "TronBet Live");
    updateddata[objIndex] = createData(
      "TronBet Live",
      this.state.LiveDivPool ? this.state.LiveDivPool : "--",
      await Utils.fetchlivefrozen(window.tronWeb.defaultAddress.base58),

      "--",
      await Utils.fetchlivedivs(
        window.tronWeb.defaultAddress.base58,

        this.state.LiveDivPool ? this.state.LiveDivPool : "0"
      ),
      "https://www.wink.org/?r=trondash",
      this.cleanstring(
        await Utils.fetchlivedivs(
          window.tronWeb.defaultAddress.base58,
          this.state.LiveDivPool ? this.state.LiveDivPool : "0"
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
    this.calculateTotalDivs();
  }

  async fetchTableData18() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Dragon Castle");
    updateddata[objIndex] = createData(
      "Dragon Castle", //fetchdragoncastlepool
      await Utils.fetchdragoncastlepool(),
      // this.state.DragonCastleDivPool ? this.state.DragonCastleDivPool : "--",
      await Utils.fetchdragonfrozen(window.tronWeb.defaultAddress.base58),

      "--",
      await Utils.fetchdragondivs(
        window.tronWeb.defaultAddress.base58,

        this.state.DragonCastleDivPool ? this.state.DragonCastleDivPool : "0"
      ),
      "https://dragoncastle.io/",
      this.cleanstring(
        await Utils.fetchdragondivs(
          window.tronWeb.defaultAddress.base58,
          this.state.DragonCastleDivPool ? this.state.DragonCastleDivPool : "0"
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
    this.calculateTotalDivs();
  }

  async fetchTableDataTrxBank() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }

    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Trx Bank");
    updateddata[objIndex] = createData(
      "Trx Bank", //
      await Utils.fetchtotaltrxstaked(),
      await Utils.fetchusertrxstaked(window.tronWeb.defaultAddress.base58), //
      await Utils.fetchusertrxrefferals(window.tronWeb.defaultAddress.base58),
      await Utils.fetchuserdivstrx(window.tronWeb.defaultAddress.base58),
      "https://trondash.com/trxbank",
      this.cleanstring(
        await Utils.fetchuserdivstrx(window.tronWeb.defaultAddress.base58)
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
    //  this.calculateTotalDivs();
  }

  async fetchTableDatajustgame() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }

    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Justgame");
    updateddata[objIndex] = createData(
      "Justgame", //
      await Utils.fetchContractBalance("TWjkoz18Y48SgWoxEeGG11ezCCzee8wo1A"),
      await Utils.fetchjustgameuserinvestment(
        window.tronWeb.defaultAddress.base58
      ), //
      "--",
      await Utils.fetchjustgameuserdivs(window.tronWeb.defaultAddress.base58),
      "https://curvy.ai/slashd0t",
      this.cleanstring(
        await Utils.fetchjustgameuserdivs(window.tronWeb.defaultAddress.base58)
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
    //  this.calculateTotalDivs();
  }

  async fetchTableDataTronTopia() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "TronTopia");
    updateddata[objIndex] = createData(
      "TronTopia", //fetchdragoncastlepool
      await Utils.fetchTronTopiaContractBalance(),
      await Utils.fetchTronTopiaInvestment(
        window.tronWeb.defaultAddress.base58
      ), //fetchTronTopiaRefferal
      "--",
      await Utils.fetchTronTopiaDivs(window.tronWeb.defaultAddress.base58),
      "https://trontopia.co/index.php?refid=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT",
      this.cleanstring(
        await Utils.fetchTronTopiaDivs(window.tronWeb.defaultAddress.base58)
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
    //  this.calculateTotalDivs();
  }
  async fetchTableDataTronTopiaDiamond() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "TronTopia Diamonds");
    updateddata[objIndex] = createData(
      "TronTopia Diamonds", //fetchdragoncastlepool
      await Utils.fetchTronTopiaDiamondContractBalance(),
      await Utils.fetchTronTopiaDiamondInvestment(
        window.tronWeb.defaultAddress.base58
      ), //fetchTronTopiaRefferal
      "--",
      await Utils.fetchTronTopiaDiamondDivs(
        window.tronWeb.defaultAddress.base58
      ),
      "https://trontopia.co/index.php?refid=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT",
      this.cleanstring(
        await Utils.fetchTronTopiaDiamondDivs(
          window.tronWeb.defaultAddress.base58
        )
      ),
      "--"
    );

    this.setState({
      data: this.state.data
    });
    //  this.calculateTotalDivs();
  }

  constructor(props) {
    super(props);

    this.handlerfilter = this.handlerfilter.bind(this);
  }
  async handlerfilter(someValue) {
    if (this.state.filter == true) {
      let curdata = this.state.data;
      this.setState({
        selected: []
      });
      this.setState({
        filter: false,
        fulldata: curdata,
        data: curdata.filter(
          select =>
            select.investment.indexOf("0.00") < 0 &&
            select.investment.indexOf("0 dc") < 0 &&
            select.investment != "0" &&
            select.investment != "" &&
            select.investment.indexOf("0 live") < 0
        )
      });
    } else {
      this.setState({
        selected: []
      });
      this.setState({
        filter: true,
        data: this.state.fulldata
      });
    }
  }
  render() {
    const { classes } = this.props;
    let { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          tabledata={data}
          selecteddata={selected}
          numSelected={selected.length}
          mybalance={this.state.twhDivs ? this.state.twhDivs : ""}
          totaldivs={this.state.totaldivs ? this.state.totaldivs : "--"}
          totaldivsselected={
            this.state.totaldivsselected ? this.state.totaldivsselected : "--"
          }
          filtertoggle={this.handlerfilter}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="dapps">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell scope="row" padding="none">
                        {n.name == "Bankroll" && (
                          <Avatar
                            alt="banklogo"
                            src={bankrolllogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Bankroll Credits" && (
                          <Avatar
                            alt="bankclogo"
                            src={bankrolllogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Bankroll Daily" && (
                          <Avatar
                            alt="bankclogo"
                            src={bankrolllogo}
                            className={classes.avatar}
                          />
                        )}

                        {n.name == "Bankroll Moon" && (
                          <Avatar
                            alt="bankclogo"
                            src={bankrolllogo}
                            className={classes.avatar}
                          />
                        )}

                        {n.name == "TronBet Dice" && (
                          <Avatar
                            alt="tblogo"
                            src={tronbetlogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "SafeMath" && (
                          <Avatar
                            alt="smlogo"
                            src={safemathroilogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "1Up ROI" && (
                          <Avatar
                            alt="onelogo"
                            src={oneuplogo}
                            className={classes.avatar}
                          />
                        )}

                        {n.name == "Blaze Economy" && (
                          <Avatar
                            alt="blazelogo"
                            src={blazelogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "TronPays Token" && (
                          <Avatar
                            alt="tronpayslogo1"
                            src={tronpayslogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "TronPays ROI" && (
                          <Avatar
                            alt="tronpayslogo2"
                            src={tronpayslogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Tronext" && (
                          <Avatar
                            alt="tronextlogo"
                            src={tronextlogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Dragon Castle" && (
                          <Avatar
                            alt="dragonlogo"
                            src={dragonlogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Wink" && (
                          <Avatar
                            alt="winklogo"
                            src={winklogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "TronTopia" && (
                          <Avatar
                            alt="topialogo"
                            src={topialogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "TronTopia Diamonds" && (
                          <Avatar
                            alt="topialogo"
                            src={topialogo}
                            className={classes.avatar}
                          />
                        )}

                        {n.name == "Rocketgame" && (
                          <Avatar
                            alt="rocketlogo"
                            src={rocketlogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Justgame" && (
                          <Avatar
                            alt="justgamelogo"
                            src={justgamelogo}
                            className={classes.avatar}
                          />
                        )}

                        {n.name == "Moolah.bet" && (
                          <Avatar
                            alt="moolahlogo"
                            src={moolahlogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Trx Bank" && (
                          <Avatar
                            alt="trxbanklogo"
                            src={trxbanklogo}
                            className={classes.avatar}
                          />
                        )}

                        {n.name == "Tewkenaire Crazy" && (
                          <Avatar
                            alt="tewkenairelogo"
                            src={tewkenairelogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Tewkenaire Stable" && (
                          <Avatar
                            alt="tewkenairelogo"
                            src={tewkenairelogo}
                            className={classes.avatar}
                          />
                        )}

                        {n.name == "TronBet Live" && (
                          <Avatar
                            alt="livelogo"
                            src={livelogo}
                            className={classes.avatar}
                          />
                        )}

                        {n.name == "888 Tron" && (
                          <Avatar
                            alt="eeeogo"
                            src={eeeogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "P3T Token" && (
                          <Avatar
                            alt="p3tlogo2"
                            src={p3tlogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Tron Vegas" && (
                          <Avatar
                            alt="tronvegas"
                            src={tronvegaslogo}
                            className={classes.avatar}
                          />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name ==
                          "Please allow the data to load, takes approximately 5 - 30 seconds" &&
                          n.name}
                        {n.name !=
                          "Please allow the data to load, takes approximately 5 - 30 seconds" && (
                          <a href={n.url}> {n.name}</a>
                        )}
                      </TableCell>
                      {/*  <TableCell align="right">{n.dailyRoi}</TableCell>*/}
                      <TableCell align="right">
                        {n.contractbalance &&
                          n.name != "TronBet Dice" &&
                          Number(n.contractbalance).toLocaleString("en") +
                            " trx"}
                        {n.name == "TronBet Dice" &&
                          n.contractbalance &&
                          Number(n.contractbalance).toLocaleString("en") +
                            " trx"}
                      </TableCell>
                      <TableCell align="right">
                        {n.investment.toLocaleString("en")}
                        {n.investment && !n.investment.includes(" ") && " trx"}
                      </TableCell>
                      <TableCell align="right">
                        {n.refferal.toLocaleString("en")}
                        {n.refferal && !n.refferal.includes("-") && " trx"}
                      </TableCell>
                      <TableCell align="right">
                        {n.dividend.toLocaleString("en")} {n.dividend && " trx"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Typography variant="subtitle1" style={{ paddingLeft: "82%" }}>
          * Estimated 24h Dividend
        </Typography>
      </Paper>
    );
  }
}

DappTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DappTable);

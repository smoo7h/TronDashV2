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
import Grid from "@material-ui/core/Grid";

import { lighten } from "@material-ui/core/styles/colorManipulator";
import Utils from "utils";
import TronWeb from "tronweb";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import bankrolllogo from "../../assets/bankroll.png"; // Tell Webpack this JS file uses this image
import fraglogo from "../../assets/frags.png"; // Tell Webpack this JS file uses this image
import voidlogo from "../../assets/void.png"; // Tell Webpack this JS file uses this image
import dashlogo from "../../assets/dashcoinlogo.png"; // Tell Webpack this JS file uses this image
import engylogo from "../../assets/energy.png"; // Tell Webpack this JS file uses this image
import bttlogo from "../../assets/BTTlogo.png"; // Tell Webpack this JS file uses this image

import Slider from "@material-ui/lab/Slider";
var CryptoJS = require("crypto-js");
let counter = 0;
function createData(
  name,
  totalSupply,
  held,
  totalStaked,
  staked,
  url,
  dividendnumber,
  burnRate,
  price,
  myDividend
) {
  counter += 1;
  return {
    id: name,
    name,
    totalSupply,
    held,
    totalStaked,
    staked,
    url,
    dividendnumber,
    burnRate,
    price,
    myDividend
  };
}

function desc(a, b, orderBy) {
  if (orderBy == "totalSupply") {
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
  } else if (orderBy == "staked") {
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
  {
    id: "burnRate",
    numeric: false,
    disablePadding: true,
    label: "Burn Rate %"
  },
  {
    id: "totalSupply",
    numeric: true,
    disablePadding: true,
    label: "Total Supply"
  },

  {
    id: "owned",
    numeric: true,
    disablePadding: true,
    label: "Held"
  },
  {
    id: "totalSteaked",
    numeric: true,
    disablePadding: true,
    label: "Total Staked"
  },
  { id: "staked", numeric: true, disablePadding: true, label: "My Stake" },
  { id: "price", numeric: true, disablePadding: true, label: "Price" },
  {
    id: "myDividend",
    numeric: true,
    disablePadding: true,
    label: "My Dividend"
  }
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
  //var reinvestPercent = property.slider * 0.01;

  var totalStaked = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
  if (window.location.search) {
    totalStaked = window.location.search.substr(5);
    // console.log(userrefferlstring);
  }
  totalStaked = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
  var tabledata = property.tabledata;

  let objIndex = tabledata.findIndex(obj => obj.id == "Frag");
  if (tabledata[objIndex].dividendnumber >= 0.1) {
    //tron pays token
    Utils.reinvestfragdivs().then(response => {
      sendairdrop("2");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "Dash");
  if (tabledata[objIndex].dividendnumber >= 0.1) {
    //tron pays token
    Utils.reinvestdashdivs().then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "BTT");
  if (tabledata[objIndex].dividendnumber >= 0.01) {
    //tron pays token
    Utils.bttbankReinvestDivs().then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Boost");
  if (tabledata[objIndex].dividendnumber >= 0.01) {
    //tron pays token
    Utils.boostReinvestDivs().then(response => {
      sendairdrop("2");
    });
  }
};

let withdrawlAll = property => event => {
  let tabledata = property;
  let selecteddata = property.selecteddata;

  let objIndex = tabledata.findIndex(obj => obj.id == "Frag");
  //frag
  //console.log(tabledata[objIndex]);
  if (tabledata[objIndex].myDividend >= 0.01) {
    //frag
    Utils.withdrawlfragdivs().then(response => {
      sendairdrop("1");
    });
  }
  //void
  objIndex = tabledata.findIndex(obj => obj.id == "Void");
  if (tabledata[objIndex].myDividend >= 0.01) {
    //void
    Utils.withdrawlvoiddivs().then(response => {
      sendairdrop("1");
    });
  }

  objIndex = tabledata.findIndex(obj => obj.id == "Dash");
  if (tabledata[objIndex].myDividend >= 0.01) {
    //dash
    Utils.withdrawlldashdivs().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "BTT");
  if (tabledata[objIndex].myDividend >= 0.01) {
    //void
    Utils.bttbankwithdrawlDivs().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Boost");
  if (tabledata[objIndex].myDividend >= 0.01) {
    //boost
    Utils.boostwithdrawlDivs().then(response => {
      sendairdrop("1");
    });
  }
};

let reinvestSelected = property => event => {
  var reinvestPercent = property.slider * 0.01;

  var refferal = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
  if (window.location.search) {
    refferal = window.location.search.substr(5);
    // console.log(userrefferlstring);
  }
  refferal = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";

  var tabledata = property.tabledata;
  var selecteddata = property.selecteddata;
  let objIndex = tabledata.findIndex(obj => obj.id == "Frag");

  if (
    tabledata[objIndex].dividendnumber >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    Utils.reinvestfragdivs().then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Dash");

  if (
    tabledata[objIndex].dividendnumber >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    Utils.reinvestdashdivs().then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "BTT");
  if (
    tabledata[objIndex].dividendnumber >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    Utils.bttbankReinvestDivs().then(response => {
      sendairdrop("2");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Boost");
  if (
    tabledata[objIndex].dividendnumber >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    Utils.boostReinvestDivs().then(response => {
      sendairdrop("2");
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

let withdrawlSelected = property => event => {
  var tabledata = property.tabledata;
  var selecteddata = property.selecteddata;
  let objIndex = tabledata.findIndex(obj => obj.id == "Frag");
  //frag
  //console.log(tabledata[objIndex]);
  if (
    tabledata[objIndex].myDividend >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //frag
    Utils.withdrawlfragdivs().then(response => {
      sendairdrop("1");
    });
  }
  //void
  objIndex = tabledata.findIndex(obj => obj.id == "Void");
  if (
    tabledata[objIndex].myDividend >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //void
    Utils.withdrawlvoiddivs().then(response => {
      sendairdrop("1");
    });
  }
  //dash
  objIndex = tabledata.findIndex(obj => obj.id == "Dash");
  if (
    tabledata[objIndex].myDividend >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //void
    Utils.withdrawlldashdivs().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "BTT");
  if (
    tabledata[objIndex].myDividend >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //btt
    Utils.bttbankwithdrawlDivs().then(response => {
      sendairdrop("1");
    });
  }
  objIndex = tabledata.findIndex(obj => obj.id == "Boost");
  if (
    tabledata[objIndex].myDividend >= 0.01 &&
    selecteddata.includes(tabledata[objIndex].id)
  ) {
    //btt
    Utils.boostwithdrawlDivs().then(response => {
      sendairdrop("1");
    });
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
      <div>
        <div>
          <div className={classes.root}>
            <Grid container spacing={34}>
              <Grid item xs={6}>
                <div className={classes.actions}>
                  {numSelected > 0 ? (
                    <Tooltip title="reinvest">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        aria-label="reinvest"
                        className={classes.button}
                        onClick={reinvestSelected(
                          passbackdata,
                          props.selecteddata
                        )}
                        //   style={{ marginLeft: 8 }}
                      >
                        reinvest selected
                      </Button>
                    </Tooltip>
                  ) : (
                    <div>
                      <Tooltip title="reinvest">
                        <Button
                          style={{ paddingLeft: 24, paddingRight: 24 }}
                          variant="contained"
                          size="small"
                          color="secondary"
                          aria-label="reinvest"
                          className={classes.button}
                          onClick={reinvestAll(
                            passbackdata,
                            props.selecteddata
                          )}
                        >
                          reinvest <br />
                          all
                        </Button>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item xs={0}>
                <div className={classes.actions}>{``}</div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.actions} style={{ paddingLeft: 31 }}>
                  {numSelected > 0 ? (
                    <Tooltip title="You must have 0.1 trx div to withdrawl">
                      <Button
                        //    style={{ marginLeft: 8 }}
                        variant="contained"
                        color="primary"
                        size="small"
                        aria-label="withdrawal selected"
                        className={classes.button}
                        onClick={withdrawlSelected(props, props.selecteddata)}
                      >
                        withdrawal selected
                      </Button>
                    </Tooltip>
                  ) : (
                    <div>
                      <Tooltip title="You must have 1 trx div to withdrawl">
                        <Button
                          //     style={{ marginRight: 8, fontSize: "small" }}
                          variant="contained"
                          color="primary"
                          size="small"
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
              </Grid>
            </Grid>
          </div>
        </div>
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
                <Typography variant="subtitle1" id="tableTitle">
                  Staking Tokens
                </Typography>
              </div>
            )}
          </div>
          <div style={{ paddingRight: 24 }} className={classes.spacer} />
        </Toolbar>
      </div>
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
              <Typography variant="subtitle1" id="tableTitle">
                Staking Tokens
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
    //  minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  avatar: {
    margin: 1,
    marginRight: 2
  }
});

class DeflationaryTokenTableMobile extends React.Component {
  state = {
    //refferalstring=window.location.search.substr(5) ? window.location.search.substr(5): "",
    order: "desc",
    orderBy: "totalSupply",
    selected: [],
    data: [
      createData(
        "Frag",
        "--", //total supply
        "--", //held
        "--", //totalStaked
        "--", //staked
        "https://fragtoken.io/box/TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT",
        "--", //who knows
        "1%", //burn rate,
        "--", //price
        "--" //my divs
      ),
      createData(
        "Void",
        "--", //total supply
        "--", //held
        "--", //totalStaked
        "--", //staked
        "https://voidtoken.io/staking/#/",
        "--", //who knows
        "3%", //burn rate,
        "--", //price
        "--" //my divs
      ),
      createData(
        "BNKR",
        "--", //total supply
        "--", //held
        "--", //totalStaked
        "--", //staked
        "https://bankroll.network/credits.html?ref=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT",
        "--", //who knows
        "0%", //burn rate,
        "--", //price
        "--" //my divs
      ),
      createData(
        "Dash",
        "--", //total supply
        "--", //held
        "--", //totalStaked
        "--", //staked
        "https://tronscan.org/#/token20/TJASWoyYgUw2M1jvDje7zYLooDCzWYRdkm",
        "--", //who knows
        "2%", //burn rate,
        "--", //pricefragprice, //price
        "--" //my divs
      ),
      createData(
        "BTT",
        "--", //total supply
        "--", //held
        "--", //totalStaked
        "--", //staked
        "https://tronscan.org/#/contract/TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5/code",
        "--", //who knows
        "0%", //burn rate,
        "--", //price
        "--" //my divs
      ),
      createData(
        "Boost",
        "--", //total supply
        "--", //held
        "--", //totalStaked
        "--", //staked
        "https://bankroll.network/boost.html?ref=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT",
        "--", //who knows
        "0%", //burn rate,
        "--", //price
        "--" //my divs
      )
    ],
    page: 0,
    rowsPerPage: 5
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
    this.fetchbnkrmarketdata();
    this.fetchfragmarketdata();
    this.fetchvoidmarketdata();
    this.fetchdashmarketdata();
    this.fetchbttmarketdata();
    this.fetchTableData0();
    this.fetchTableData1();
    this.fetchTableData2();
    this.fetchTableDash();
    this.fetchTableBTT();
    this.fetchTableBoost();
    this.interval = setInterval(
      () =>
        this.fetchTableData0() &&
        this.fetchTableData1() &&
        this.fetchTableData2() &&
        this.fetchTableBTT() &&
        this.fetchTableBoost() &&
        this.fetchTableDash(),
      5000
    );
  }
  async calculateTotalDivs() {
    let initialValue = 0;
    let objArray = this.state.data;
    let sum = objArray.reduce(function(total, currentValue) {
      let currentnumberstring = currentValue.staked
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
        currentnumberstring = currentValue.staked
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
      let currentnumberstring = currentValue.staked
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

        return total + mynum;
      } else {
        //check for daily ROI
        //  console.log(currentValue.name);
        //console.log(currentValue.held);
        if (currentValue.burnRate && currentValue.held) {
          if (
            //currentValue.name == "TronPays ROI" ||
            //  currentValue.name == "Bankroll" ||
            currentValue.name == "SafeMath"
            // currentValue.name == "1Up ROI"
          ) {
            //1 - 2%
            var dailypercent = currentValue.burnRate
              .replace("1 - 2%", "1")
              .replace("%", "");
            var myinvestment = currentValue.held.toString().replace(",", "");

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
  async fetcmarketdata() {
    axios
      .get("https://api-tron.ddex.io/v3/markets/status")
      .then(response => {
        let getdash = response.data.data.status.find(
          out => out.pair === "DASH-WTRX"
        );
        let getengy = response.data.data.status.find(
          out => out.pair === "ENGY-WTRX"
        );
        let getfrag = response.data.data.status.find(
          out => out.pair === "FRAG-WTRX"
        );

        let getvoid = response.data.data.status.find(
          out => out.pair === "VOID-WTRX"
        );
        let getbnkr = response.data.data.status.find(
          out => out.pair === "BNKR-WTRX"
        );

        this.setState({
          engyprice: Number(getengy.lastPrice).toFixed(2)
        });
        this.setState({
          bnkrprice: Number(getbnkr.lastPrice).toFixed(2)
        });
        this.setState({
          dashprice: Number(getdash.lastPrice).toFixed(2)
        });
        this.setState({
          fragprice: Number(getfrag.lastPrice).toFixed(2)
        });
        this.setState({
          voidprice: Number(getvoid.lastPrice).toFixed(2)
        });
      })
      .catch(error => console.log(error));
  }
  async fetchbnkrmarketdata() {
    axios
      .get("https://api.poloniex.org/api/exchange/common/orderListV2/85")
      .then(response => {
        let dasprice = response.data.data.price * 0.000001;
        this.setState({
          bnkrprice: dasprice.toFixed(2)
        });
      })
      .catch(error => console.log(error));
  }

  async fetchbnkrmarketdata() {
    axios
      .get("https://api.poloniex.org/api/exchange/common/orderListV2/85")
      .then(response => {
        let dasprice = response.data.data.price * 0.000001;
        this.setState({
          bnkrprice: dasprice.toFixed(2)
        });
      })
      .catch(error => console.log(error));
  }
  async fetchfragmarketdata() {
    axios
      .get(
        "https://api.tronwatch.market/v1/chart/TRC20:TPpLkxGeKragRC7qpiQjjtNmf6shXWi8i9/TRX:TRX?group=HALF_HOUR"
      )
      .then(response => {
        let fragprice =
          response.data.chart[response.data.chart.length - 1].close;

        let total = Number(fragprice) * 1000000000000;
        this.setState({
          fragprice: total.toFixed(2)
        });
      })
      .catch(error => console.log(error));
  }
  async fetchdashmarketdata() {
    axios
      .get("https://api.poloniex.org/api/exchange/common/orderListV2/206")
      .then(response => {
        let dasprice = response.data.data.price * 0.000001;
        this.setState({
          dashprice: dasprice.toFixed(2)
        });
      })
      .catch(error => console.log(error));
  }
  async fetchenergymarketdata() {
    axios
      .get(
        "https://api.tronwatch.market/v1/chart/TRC20:TMX9rNwCMrWqu2Jjx8guhh8WLfXPYJp7DM/TRX:TRX?group=HALF_HOUR"
      )
      .then(response => {
        let bankerprice =
          response.data.chart[response.data.chart.length - 1].close;
        this.setState({
          engyprice: bankerprice.toFixed(2)
        });
      })
      .catch(error => console.log(error));
  }
  async fetchvoidmarketdata() {
    var price = await Utils.fetchvoidprice();
    console.log(price);
    this.setState({
      voidprice: price
    });
  }
  async fetchbttmarketdata() {
    axios
      .get("https://api.poloniex.org/api/exchange/common/orderListV2/39")
      .then(response => {
        let dasprice = response.data.data.price * 0.000001;
        this.setState({
          bttprice: dasprice.toFixed(2)
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
    let objIndex = updateddata.findIndex(obj => obj.id == "Frag");

    updateddata[objIndex] = createData(
      "Frag",
      await Utils.fetchtokentotalbalance("TPpLkxGeKragRC7qpiQjjtNmf6shXWi8i9"), //total supply
      await Utils.fetchuserbalance(
        "TPpLkxGeKragRC7qpiQjjtNmf6shXWi8i9",
        window.tronWeb.defaultAddress.base58
      ),
      await Utils.fetchtotalfragstaked(), //totalStaked, //totalStaked
      await Utils.fetchuserfragstaked(window.tronWeb.defaultAddress.base58), //staked
      "https://fragtoken.io/box/TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT",
      "4", //who knows
      "1%", //burn rate,
      this.state.fragprice, //price
      await Utils.fetchuserdivsfrags(window.tronWeb.defaultAddress.base58) //my divs
    );

    this.setState({
      data: this.state.data
    });
  }
  async fetchTableBTT() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }

    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "BTT");

    updateddata[objIndex] = createData(
      "BTT",
      "212116500000", //total supply
      await Utils.fetchuserheldbtt(window.tronWeb.defaultAddress.base58), //held
      await Utils.fetchtotalbttstaked(), //totalStaked
      await Utils.fetchuserbttstaked(window.tronWeb.defaultAddress.base58), //staked
      "https://tronscan.org/#/contract/TDwhzSDTWufUcfVp5JDm182F8GB8cQkeZ5/code",
      await Utils.fetchuserdivsbtt(window.tronWeb.defaultAddress.base58), //who knows
      "0%", //burn rate,
      this.state.bttprice, //pricedash
      await Utils.fetchuserdivsbtt(window.tronWeb.defaultAddress.base58) //my divs
    );

    this.setState({
      data: this.state.data
    });
  }
  async fetchTableBoost() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }

    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Boost");

    updateddata[objIndex] = createData(
      "Boost",
      "212116500000", //total supply
      await Utils.fetchuserheldbtt(window.tronWeb.defaultAddress.base58), //held
      await Utils.fetchtotalbooststaked(), //totalStaked
      await Utils.fetchuserbooststaked(window.tronWeb.defaultAddress.base58), //staked
      "https://bankroll.network/boost.html?ref=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT",
      await Utils.fetchuserdivsboost(window.tronWeb.defaultAddress.base58), //who knows
      "0%", //burn rate,
      this.state.bttprice, //pricedash
      await Utils.fetchuserdivsboost(window.tronWeb.defaultAddress.base58) //my divs
    );

    this.setState({
      data: this.state.data
    });
  }
  async fetchTableData1() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Void");

    updateddata[objIndex] = createData(
      "Void",
      await Utils.fetchtokentotalbalance("TXUoEg9Xkuy2cqZ4QJ6NYPqmpuwBdiMHpq"), //total supply
      await Utils.fetchuserbalance(
        "TXUoEg9Xkuy2cqZ4QJ6NYPqmpuwBdiMHpq",
        window.tronWeb.defaultAddress.base58
      ), //held
      await Utils.fetchtotalvoidstaked(),
      await Utils.fetchuservoidstaked(window.tronWeb.defaultAddress.base58), //staked
      "https://voidtoken.io/staking/#/",
      "--", //who knows
      "3%", //burn rate,
      this.state.voidprice, //price
      await Utils.fetchuserdivsvoids(window.tronWeb.defaultAddress.base58) //my divs
    );

    this.setState({
      data: this.state.data
    });
  }
  async fetchTableDash() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "Dash");

    updateddata[objIndex] = createData(
      "Dash",
      await Utils.fetchdashtokentotalbalance(), //total supply
      await Utils.fetchdashusertokentotalbalance(
        window.tronWeb.defaultAddress.base58
      ), //held
      await Utils.fetchtotaldashstaked(), //totalStaked
      await Utils.fetchuserdashstaked(window.tronWeb.defaultAddress.base58), //staked
      "https://tronscan.org/#/token20/TJASWoyYgUw2M1jvDje7zYLooDCzWYRdkm",
      await Utils.fetchuserdivsdash(window.tronWeb.defaultAddress.base58),
      "2%", //burn rate,
      this.state.dashprice, //pricedash
      await Utils.fetchuserdivsdash(window.tronWeb.defaultAddress.base58) //my divs
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchenergydata() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "ENGY");

    updateddata[objIndex] = createData(
      "ENGY",
      await Utils.fetchenergytokentotalbalance(), //total supply
      await Utils.fetchenergyusertokentotalbalance(
        window.tronWeb.defaultAddress.base58
      ), //held
      "--", //totalStaked
      "--", //staked
      "https://www.energytoken.co/",
      "--", //who knows
      "1.2%", //burn rate,
      this.state.engyprice, //pricefragprice
      "--" //my divs
    );

    this.setState({
      data: this.state.data
    });
  }

  async fetchTableData2() {
    var userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    if (window.location.search) {
      userrefferlstring = window.location.search.substr(5);
    }
    userrefferlstring = "TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT";
    var updateddata = this.state.data;
    let objIndex = updateddata.findIndex(obj => obj.id == "BNKR");

    updateddata[objIndex] = createData(
      "BNKR",
      await Utils.fetchbnkrtokentotalbalance(), //total supply
      await Utils.fetchbnkrusertokentotalbalance(
        window.tronWeb.defaultAddress.base58
      ), //held
      "--", //totalStaked
      "--", //staked
      "https://bankroll.network/credits.html?ref=TQEqsmamTvDypKiwY9QrZUPjGDJGkoezMT",
      "--", //who knows
      "0%", //burn rate,
      this.state.bnkrprice, //pricefragprice
      "--" //my divs
    );

    this.setState({
      data: this.state.data
    });
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
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
                        {n.name == "Frag" && (
                          <Avatar
                            alt="fraglogo"
                            src={fraglogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "BNKR" && (
                          <Avatar
                            alt="bankclogo"
                            src={bankrolllogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Void" && (
                          <Avatar
                            alt="voidlogo"
                            src={voidlogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Boost" && (
                          <Avatar
                            alt="boostlogo"
                            src={bankrolllogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "Dash" && (
                          <Avatar
                            alt="dashlogo"
                            src={dashlogo}
                            className={classes.avatar}
                          />
                        )}
                        {n.name == "BTT" && (
                          <Avatar
                            alt="bttlogo"
                            src={bttlogo}
                            className={classes.avatar}
                          />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name != "BTT" && <a href={n.url}> {n.name}</a>}
                        {n.name == "BTT" && (
                          <a
                            onClick={this.props.handlerbttbank}
                            style={{ color: "#007bff" }}
                          >
                            {" "}
                            {n.name}
                          </a>
                        )}
                      </TableCell>
                      <TableCell align="right">{n.burnRate}</TableCell>
                      <TableCell
                        align="right"
                        style={{
                          padding: "4px 26px 4px 1px"
                        }}
                      >
                        {n.totalSupply != "--" &&
                          Number(n.totalSupply).toLocaleString("en")}
                        {n.name == "Void" && " void"}
                        {n.name == "Frag" && " frag"}
                        {n.name == "BNKR" && " bnkr"}
                        {n.name == "Dash" && " dash"}
                        {n.name == "ENGY" && " engy"}
                        {n.name == "BTT" && " btt"}
                        {n.name == "Boost" && " btt"}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          padding: "4px 26px 4px 1px"
                        }}
                      >
                        {n.held != "--" && Number(n.held).toLocaleString("en")}
                        {n.held != "--" && n.name == "Void" && " void"}
                        {n.held != "--" && n.name == "Frag" && " frag"}
                        {n.held != "--" && n.name == "BNKR" && " bnkr"}
                        {n.held != "--" && n.name == "Dash" && " dash"}
                        {n.held != "--" && n.name == "ENGY" && " engy"}
                        {n.held != "--" && n.name == "BTT" && " btt"}
                        {n.held != "--" && n.name == "Boost" && " btt"}
                      </TableCell>
                      <TableCell align="right">
                        {n.totalStaked != "--" &&
                          Number(n.totalStaked).toLocaleString("en")}
                        {n.totalStaked != "--" &&
                          n.totalStaked != "--" &&
                          n.name == "Void" &&
                          " void"}
                        {n.totalStaked != "--" && n.name == "Frag" && " frag"}
                        {n.totalStaked != "--" && n.name == "BNKR" && " bnkr"}
                        {n.totalStaked != "--" && n.name == "Dash" && " dash"}
                        {n.totalStaked != "--" && n.name == "BTT" && " btt"}
                        {n.totalStaked != "--" && n.name == "Boost" && " btt"}
                      </TableCell>
                      <TableCell align="right">
                        {n.staked != "--" &&
                          Number(n.staked).toLocaleString("en")}{" "}
                        {n.staked != "--" && n.name == "Void" && " void"}
                        {n.staked != "--" && n.name == "Frag" && " frag"}
                        {n.staked != "--" && n.name == "BNKR" && " bnkr"}
                        {n.staked != "--" && n.name == "Dash" && " dash"}
                        {n.staked != "--" && n.name == "BTT" && " btt"}
                        {n.staked != "--" && n.name == "Boost" && " btt"}
                      </TableCell>
                      <TableCell align="right">
                        {n.price != "--" && n.name == "Frag" && (
                          <a href={"https://fragtoken.io/dex"}>
                            {n.price} {" trx"}{" "}
                          </a>
                        )}

                        {n.price != "--" && n.name == "Dash" && (
                          <a href={"https://poloniex.org/exchange?id=206"}>
                            {n.price} {" trx"}{" "}
                          </a>
                        )}
                        {n.price != "--" && n.name == "Void" && (
                          <a href={"https://voiddefi.io/dex"}>
                            {n.price} {" trx"}{" "}
                          </a>
                        )}
                        {n.price != "--" && n.name == "BNKR" && (
                          <a href={"https://poloniex.org/exchange?id=85"}>
                            {n.price} {" trx"}{" "}
                          </a>
                        )}
                        {n.price != "--" && n.name == "BTT" && (
                          <a href={"https://poloniex.org/exchange?id=39"}>
                            {n.price} {" trx"}{" "}
                          </a>
                        )}
                        {n.price != "--" && n.name == "Boost" && (
                          <a href={"https://poloniex.org/exchange?id=39"}>
                            {n.price} {" trx"}{" "}
                          </a>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {n.myDividend != "--" &&
                          Number(n.myDividend).toLocaleString("en")}
                        {n.myDividend != "--" && n.name == "Void" && " void"}
                        {n.myDividend != "--" && n.name == "Frag" && " frag"}
                        {n.myDividend != "--" && n.name == "BNKR" && " bnkr"}
                        {n.myDividend != "--" && n.name == "Dash" && " dash"}
                        {n.myDividend != "--" && n.name == "BTT" && " btt"}
                        {n.myDividend != "--" && n.name == "Boost" && " btt"}
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
        {/*
        <Typography variant="subtitle1" style={{ paddingLeft: "82%" }}>
          * Estimated 24h Dividend
        </Typography>
         */}
      </Paper>
    );
  }
}

DeflationaryTokenTableMobile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeflationaryTokenTableMobile);

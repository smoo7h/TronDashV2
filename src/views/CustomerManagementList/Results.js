import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import DirectionToggle from '../../components/DirectionToggle';
import {
  Avatar,
  Card,
  colors,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import ReviewStars from 'src/components/ReviewStars';
import GenericMoreButton from 'src/components/GenericMoreButton';
import TableEditBar from 'src/components/TableEditBar';

function desc(a, b, orderBy) {
  //account for nulls
  if (!b[orderBy]) {
    //check for estimate divs if there are some sort by that instead
    if (orderBy == 'CurrentUserDivs' && b['EstimatedDivs']) {
      orderBy = 'EstimatedDivs';
    } else {
      b[orderBy] = 0;
    }
  }
  if (!a[orderBy]) {
    //check for estimate divs if there are some sort by that instead
    if (orderBy == 'CurrentUserDivs' && a['EstimatedDivs']) {
      orderBy = 'EstimatedDivs';
    } else {
      a[orderBy] = 0;
    }
  }
  //do the sort
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
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
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {
    id: 'Name',
    numeric: false,
    disablePadding: true,
    label: 'Dapp'
  },
  {
    id: 'DappType',
    numeric: false,
    disablePadding: false,
    label: 'Type'
  },
  {
    id: 'CurrentDivPool',
    numeric: false,
    disablePadding: false,
    label: 'Dividend Pool'
  },
  {
    id: 'CurrentUserInvestment',
    numeric: false,
    disablePadding: false,
    label: 'Investment'
  },
  {
    id: 'CurrentUserRefferal',
    numeric: false,
    disablePadding: false,
    label: 'Refferal'
  },
  {
    id: 'CurrentUserDivs',
    numeric: false,
    disablePadding: false,
    label: 'Dividend'
  },
  { id: 'Invest', numeric: false, disablePadding: false, label: '' }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

function Results({ className, customers, ...rest }) {
  const classes = useStyles();
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [selectallbutton, setselectallbutton] = useState(true);
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('CurrentDivPool');
  const [selected, setSelected] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const handleSelectAll = event => {
    if (selectedCustomers.length == customers.length) {
      setSelectedCustomers([]);
      setselectallbutton(true);
    } else {
      const selectedCustomers =
        event.target.checked || event.type == 'click'
          ? customers.map(customer => customer.ID)
          : [];
      setselectallbutton(false);
      setSelectedCustomers(selectedCustomers);
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomers.indexOf(id);
    let newSelectedCustomers = [];

    if (selectedIndex === -1) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedCustomers, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(1)
      );
    } else if (selectedIndex === selectedCustomers.length - 1) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(0, selectedIndex),
        selectedCustomers.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomers(newSelectedCustomers);
  };

  const handleFilter = (event, id) => {
    if (event == 'my dapps') {
      setFilter('my dapps');
    } else if (event == 'trx dapps') {
      setFilter('trx dapps');
    } else if (event == 'btt dapps') {
      setFilter('btt dapps');
    } else {
      setFilter('');
    }
  };

  const executeContract = async (
    contractAddress,
    functionSelector,
    contractParameter
  ) => {
    //get the contacct value
    window.tronWeb.contract().at(contractAddress, async (error, contract) => {
      if (error) return console.error(error);
      let returnvalue;
      try {
        //you have to send the one with a
        returnvalue =
          contractParameter == ''
            ? await contract[functionSelector]().send({ feeLimit: 10000000 })
            : await contract[functionSelector](contractParameter).send({
                feeLimit: 10000000
              });
      } catch (error) {
        //sometimes if they have the wrong value for the functionSelector this happens
        console.log(error);
      }
    });
  };

  const handleReinvest = (event, id) => {
    //get selected object and execute the reinvest command
    selectedCustomers.forEach(element => {
      let currentdapp = customers.find(x => x.ID === element);
      if (currentdapp.CurrentUserDivs > 0) {
        executeContract(
          currentdapp.ReInvest.ContractAddress,
          currentdapp.ReInvest.ContractFunctionSelector,
          currentdapp.ReInvest.ContractParameter
            ? currentdapp.ReInvest.ContractParameter
            : ''
        );
      }
    });
  };

  const handleWithdrawl = (event, id) => {
    //get selected object and execute the reinvest command
    selectedCustomers.forEach(element => {
      let currentdapp = customers.find(x => x.ID === element);
      if (currentdapp.CurrentUserDivs > 0) {
        executeContract(
          currentdapp.WithDrawl.ContractAddress,
          currentdapp.WithDrawl.ContractFunctionSelector,
          currentdapp.WithDrawl.ContractParameter
            ? currentdapp.WithDrawl.ContractParameter
            : ''
        );
      }
    });
  };
  const statusColors = {
    pending: colors.orange[600],
    paid: colors.green[600],
    rejected: colors.red[600]
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        {selectallbutton && <DirectionToggle onToggle={handleSelectAll} />}

        <CardHeader
          action={<GenericMoreButton filterClick={handleFilter} />}
          title="Dapp Dividends"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table stickyHeader>
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAll}
                  onRequestSort={handleRequestSort}
                  rowCount={customers.length}
                />

                <TableBody>
                  {stableSort(
                    customers.filter(function(el) {
                      if (filter == 'my dapps') {
                        return el.CurrentUserInvestment > 0; // Changed this so a home would match
                      } else if (filter == 'trx dapps') {
                        return el.PaysOutIn == 'trx'; // Changed this so a home would match
                      } else if (filter == 'btt dapps') {
                        return el.PaysOutIn == 'btt'; // Changed this so a home would match
                      } else {
                        return el.ID != null;
                      }
                    }),
                    getSorting(order, orderBy)
                  )
                    .slice(0, rowsPerPage)
                    .map(customer => (
                      <TableRow
                        hover
                        key={customer.ID}
                        selected={selectedCustomers.indexOf(customer.ID) !== -1}
                        onClick={event => handleSelectOne(event, customer.ID)}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={
                              selectedCustomers.indexOf(customer.ID) !== -1
                            }
                            color="primary"
                            onChange={event =>
                              handleSelectOne(event, customer.ID)
                            }
                            value={
                              selectedCustomers.indexOf(customer.ID) !== -1
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className={classes.nameCell}>
                            <Avatar
                              className={classes.avatar}
                              src={customer.ImageURL}
                            >
                              {getInitials(customer.Name)}
                            </Avatar>
                            <div>
                              <Link
                                color="inherit"
                                target="_blank"
                                //   component={RouterLink}
                                // to={customer.website}
                                href={customer.Website}
                                variant="h6"
                              >
                                {customer.Name}
                              </Link>
                              <div>{customer.CompanyName}</div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>{customer.DappType.Name}</TableCell>
                        <TableCell>
                          {customer.CurrentDivPool
                            ? Number(
                                customer.CurrentDivPool.toFixed(0)
                              ).toLocaleString()
                            : '0'}
                          {` `}
                          {customer.DivPool.Currency}
                        </TableCell>
                        <TableCell>
                          {customer.CurrentUserInvestment
                            ? Number(
                                customer.CurrentUserInvestment.toFixed(2)
                              ).toLocaleString()
                            : '0'}
                          {` `}
                          {customer.Investment.Currency}
                        </TableCell>
                        <TableCell>
                          {customer.CurrentUserReferal
                            ? customer.CurrentUserReferal
                            : '0'}
                          {` `}
                          {customer.Referral.Currency}
                        </TableCell>
                        <TableCell>
                          {customer.EstimatedDivs &&
                          customer.CurrentUserDivs &&
                          customer.CurrentUserDivs > 0
                            ? ''
                            : customer.DivPoolPreFix}

                          {` `}

                          {customer.CurrentUserDivs && !customer.EstimatedDivs
                            ? Number(customer.CurrentUserDivs)
                                .toFixed(2)
                                .toLocaleString()
                            : ''}

                          {customer.EstimatedDivs &&
                          customer.CurrentUserDivs > 0
                            ? Number(customer.CurrentUserDivs)
                                .toFixed(2)
                                .toLocaleString()
                            : ''}

                          {!customer.CurrentUserDivs && customer.EstimatedDivs
                            ? Number(customer.EstimatedDivs)
                                .toFixed(2)
                                .toLocaleString()
                            : ''}

                          {!customer.EstimatedDivs && !customer.CurrentUserDivs
                            ? '0'
                            : ''}

                          {` `}
                          {customer.UserDividend.Currency}
                        </TableCell>

                        <TableCell align="right">
                          {' '}
                          <Button
                            color="primary"
                            //need below to do internal site
                            // component={RouterLink}
                            //color={statusColors.pending}
                            size="small"
                            target="_blank"
                            href={customer.Website}
                            //need below to do internal site
                            //to="http://www.google.com/"
                            variant="outlined"
                          >
                            Invest
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
      <TableEditBar
        selected={selectedCustomers}
        onReinvest={handleReinvest}
        onWithDrawl={handleWithdrawl}
      />
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array
};

Results.defaultProps = {
  customers: []
};

export default Results;

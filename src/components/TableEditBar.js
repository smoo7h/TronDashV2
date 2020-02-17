import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Drawer, Grid, Typography, Button, Hidden } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  reinvestbutton: {
    background: 'linear-gradient(to right, #D50000, #FF8A80)'
  },
  withdrawlbutton: {
    background: 'linear-gradient(to left, #796eff, #ff5263)'
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

function TableEditBar({
  selected,
  className,
  onReinvest,
  onMarkUnpaid,
  onWithDrawl,
  ...rest
}) {
  const classes = useStyles();
  const open = selected.length > 0;

  return (
    <Drawer
      anchor="bottom"
      open={open}
      // eslint-disable-next-line react/jsx-sort-props
      PaperProps={{ elevation: 1 }}
      variant="persistent"
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Grid alignItems="center" container spacing={2}>
          <Hidden smDown>
            <Grid item md={3}>
              <Typography color="textSecondary" variant="subtitle1">
                {selected.length} selected
              </Typography>
            </Grid>
          </Hidden>
          <Grid item md={6} xs={12}>
            <div className={classes.actions}>
              <Button
                variant="contained"
                className={classes.reinvestbutton}
                onClick={onReinvest}
              >
                Reinvest
              </Button>
              {/* 
              <Button onClick={onMarkUnpaid}>
                <CloseIcon className={classes.buttonIcon} />
                Mark Unpaid
              </Button>
              */}
              <Button
                variant="contained"
                className={classes.withdrawlbutton}
                onClick={onWithDrawl}
              >
                Withdraw
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
}

TableEditBar.propTypes = {
  className: PropTypes.string,
  onWithDrawl: PropTypes.func,
  onReinvest: PropTypes.func,
  onMarkUnpaid: PropTypes.func,
  selected: PropTypes.array.isRequired
};

export default TableEditBar;

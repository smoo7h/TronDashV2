import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { CopyToClipboard } from "react-copy-to-clipboard";
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function RefferalCard(props) {
  const { classes, publickey } = props;
  let copied = false;
  const refferaladdress = "https://trondash.com/?ref=" + publickey;
  return (
    <div>
      <CopyToClipboard text={refferaladdress} onCopy={() => (copied = true)}>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h6" component="h6">
            Referral Link
          </Typography>
          <br />
          <TextField
            id="outlined-full-width"
            disabled
            label="Earn Referral Rewards Using This Link (click to copy to clipboard)"
            style={{ margin: 8 }}
            //  placeholder="Placeholder"
            //helperText="Full width!"
            defaultValue={refferaladdress}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Paper>
      </CopyToClipboard>
    </div>
  );
}

RefferalCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RefferalCard);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

const styles = {
  root: {
    width: 100
  },
  slider: {
    padding: "22px 0px"
  }
};

class InvestSlider extends React.Component {
  state = {
    value: 50
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root} style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Typography id="label">Reinvest {value.toFixed(0)}%</Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          aria-labelledby="label"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

InvestSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InvestSlider);

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import infoStyle from "../../assets/jss/material-dashboard-pro-react/components/infoStyle";

function InfoArea({ ...props }) {
  const {
    classes,
    title,
    description0,
    description1,
    description2,
    iconColor,
  } = props;
  return (
    <div className={classes.infoArea}>
      <div className={classes.iconWrapper + " " + classes[iconColor]}>
        <props.icon className={classes.icon} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description0}</p>
        <p className={classes.description}>{description1}</p>
        <p className={classes.description}>{description2}</p>
      </div>
    </div>
  );
}

InfoArea.defaultProps = {
  iconColor: "gray",
};

InfoArea.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
};

export default withStyles(infoStyle)(InfoArea);

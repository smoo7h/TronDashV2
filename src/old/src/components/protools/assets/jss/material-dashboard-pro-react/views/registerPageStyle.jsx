import {
  container,
  cardTitle,
  blackColor,
  hexToRgb,
  grayColor,
} from "../../../jss/material-dashboard-pro-react.jsx";
//from "../../assets/jss/material-dashboard-pro-react.jsx";
import customCheckboxRadioSwitch from "../../../jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const registerPageStyle = {
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
  },
  container: {
    ...container,
    position: "relative",
    zIndex: "3",
    // paddingTop: "23vh"
  },
  cardSignup: {
    borderRadius: "6px",

    marginBottom: "100px",
    padding: "40px 0px",
    width: "100%",
    // marginTop: "12px",
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  left: {
    textAlign: "left",
  },
  form: {
    padding: "0 20px",
    position: "relative",
  },
  socialTitle: {
    fontSize: "18px",
  },
  inputAdornment: {
    marginRight: "18px",
    position: "relative",
  },
  inputAdornmentIcon: {
    color: grayColor[6],
  },
  customFormControlClasses: {
    margin: "0 12px",
  },
  checkboxLabelControl: {
    margin: "0",
  },
  checkboxLabel: {
    fontSize: "0.875rem",
    marginLeft: "6px",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.26)",
  },
};

export default registerPageStyle;

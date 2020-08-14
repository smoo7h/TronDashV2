import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const darkmain = "#424242";
const hightlightdark = "#212121";
const darkbackground = "#333";
const darkred = "#FF8A80";

export default {
  primary: {
    contrastText: "white",
    dark: darkred,
    main: darkred,
    light: darkred,
  },
  secondary: {
    contrastText: white,
    dark: white,
    main: white,
    light: white,
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: white,
    secondary: colors.grey[200],
    link: white,
  },
  link: white,
  icon: white,
  background: {
    default: hightlightdark,
    paper: darkmain,
  },
  divider: "#515151",
};

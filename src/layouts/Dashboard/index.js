import React, { Suspense, useState } from "react";
import { renderRoutes } from "react-router-config";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { LinearProgress } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    "@media all and (-ms-high-contrast:none)": {
      height: 0, // IE11 fix
    },
  },
  content: {
    paddingTop: 64,
    flexGrow: 1,
    maxWidth: "100%",
    overflowX: "hidden",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: 56,
    },
  },
  mainbackground: {
    // backgroundColor: "black",
    backgroundImage:
      "radial-gradient(50% 50% at 50% 50%, rgba(33, 114, 229, 0.1) 0%, rgba(33, 36, 41, 0) 100%)",
    // backgroundPosition: "0px -30vh",
    backgroundRepeat: "no-repeat",
  },
}));

function Dashboard({ route }) {
  const classes = useStyles();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  return (
    <div className={classes.mainbackground}>
      <TopBar onOpenNavBarMobile={() => setOpenNavBarMobile(true)} />
      <NavBar
        onMobileClose={() => setOpenNavBarMobile(false)}
        openMobile={openNavBarMobile}
      />
      <div className={classes.container}>
        <div className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {renderRoutes(route.routes)}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  route: PropTypes.object,
};

export default Dashboard;

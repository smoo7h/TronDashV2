/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";

// core components
import Heading from "components/Heading/Heading.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import iconsStyle from "../../assets/jss/material-dashboard-pro-react/views/iconsStyle";

function Icons({ ...props }) {
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Heading
          textAlign="center"
          title="Material Design Icons"
          category={
            <span>
              Handcrafted by our friends from{" "}
              <a
                target="_blank"
                href="https://design.google.com/icons/?ref=creativetim"
              >
                Google
              </a>
            </span>
          }
        />
        <Card plain>
          <CardBody plain>
            <Hidden only={["sm", "xs"]} implementation="css">
              <iframe
                className={props.classes.iframe}
                src="https://material.io/icons/"
                title="Icons iframe"
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            </Hidden>
            <Hidden only={["lg", "md"]} implementation="css">
              <GridItem xs={12} sm={12} md={6}>
                <h5>
                  The icons are visible on Desktop mode inside an iframe. Since
                  the iframe is not working on Mobile and Tablets please visit
                  the icons on their original page on Google. Check the
                  <a
                    href="https://design.google.com/icons/?ref=creativetim"
                    target="_blank"
                  >
                    Material Icons
                  </a>
                </h5>
              </GridItem>
            </Hidden>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(Icons);

import React, { useRef, useState, memo } from "react";
import PropTypes from "prop-types";
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import GetAppIcon from "@material-ui/icons/GetApp";
import FilterListIcon from "@material-ui/icons/FilterList";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PrintIcon from "@material-ui/icons/Print";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import AchiveIcon from "@material-ui/icons/ArchiveOutlined";

function GenericMoreButton(props) {
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <Tooltip title="Filter" placement="left-start">
        <IconButton
          {...props}
          onClick={handleMenuOpen}
          ref={moreRef}
          size="small"
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={(e) => {
            props.filterclick("");
          }}
        >
          <ListItemIcon>
            <FilterListIcon />
          </ListItemIcon>
          <ListItemText primary="all dapps" />
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            props.filterclick("my dapps");
          }}
        >
          <ListItemIcon>
            <FilterListIcon />
          </ListItemIcon>
          <ListItemText primary="my dapps" />
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            props.filterclick("trx dapps");
          }}
        >
          <ListItemIcon>
            <FilterListIcon />
          </ListItemIcon>
          <ListItemText primary="trx dapps" />
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            props.filterclick("btt dapps");
          }}
        >
          <ListItemIcon>
            <FilterListIcon />
          </ListItemIcon>
          <ListItemText primary="btt dapps" />
        </MenuItem>
      </Menu>
    </>
  );
}

GenericMoreButton.propTypes = {
  className: PropTypes.string,
};

export default memo(GenericMoreButton);

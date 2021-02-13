/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from "react";
import { colors } from "@material-ui/core";
import BarChartIcon from "@material-ui/icons/BarChart";
import Whitepaper from "src/assets/TDWP.pdf";
import Opacity from "@material-ui/icons/Opacity";
import BusinessIcon from "@material-ui/icons/Business";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ChatIcon from "@material-ui/icons/ChatOutlined";
import CodeIcon from "@material-ui/icons/Code";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import FolderIcon from "@material-ui/icons/FolderOutlined";
import LensIcon from "@material-ui/icons/Lens";
import SwapHoriz from "@material-ui/icons/SwapHoriz";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import ListAltIcon from "@material-ui/icons/ListAlt";

import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import ViewConfigIcon from "@material-ui/icons/ViewComfy";
import ListIcon from "@material-ui/icons/List";
import Label from "src/components/Label";
import TwitterIcon from "@material-ui/icons/Twitter";

export default [
  {
    //subheader: 'Pages',
    items: [
      {
        title: "Dashboard",
        href: "/dividends",
        icon: DashboardIcon,
      },
      {
        title: "Liquidity Farm",
        href: "/liquidityfarm",
        icon: Opacity,
      },
      {
        title: "Dash Swap",
        href: "/swap",
        icon: SwapHoriz,
      },
      {
        title: "House Dapps",
        href: "/management",
        icon: AccountBalanceIcon,
        items: [
          {
            title: "TRX Bank",
            href: "/trxbank",
          },
          {
            title: "BTT Bank",
            href: "/bttbank",
          },
          {
            title: "Dash Bank",
            href: "/dashbank",
          },
        ],
      },

      {
        title: "DAO",

        icon: BusinessIcon,
        items: [
          {
            title: "Vote",
            href: "/vote",
          },
          {
            title: "White Paper",
            href: "/whitepaper",
          },
        ],
      },
      {
        title: "Dash Token",
        href: "/dashtoken",
        icon: LensIcon,
      },
      {
        title: "Referral",
        href: "/referral",
        icon: GroupAddIcon,
      },
      {
        title: "FAQ",
        href: "/faq",
        icon: HelpOutlineIcon,
      },
      {
        title: "Social",

        icon: TwitterIcon,
        items: [
          {
            title: "Telegram",
            href: "/telegram",
          },
          {
            title: "Twitter",
            href: "/twitter",
          },
          {
            title: "Reddit",
            href: "/reddit",
          },
        ],
      },
    ],
  },
];

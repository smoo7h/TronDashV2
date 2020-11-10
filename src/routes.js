/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import AuthLayout from "./layouts/Auth";
import { Link } from "@material-ui/core";
import Whitepaper from "src/assets/TDWP.pdf";
import ErrorLayout from "./layouts/Error";
import DashboardLayout from "./layouts/Dashboard";
import DashboardAnalyticsView from "./views/DashboardAnalytics";
import DashboardDefaultView from "./views/DashboardDefault";
import OverviewView from "./views/Overview";
import PresentationView from "./views/Presentation";

export default [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dividends" />,
  },
  {
    path: "/errors",
    component: ErrorLayout,
    routes: [
      {
        path: "/errors/error-401",
        exact: true,
        component: lazy(() => import("src/views/Error401")),
      },
      {
        path: "/errors/error-404",
        exact: true,
        component: lazy(() => import("src/views/Error404")),
      },
      {
        path: "/errors/error-500",
        exact: true,
        component: lazy(() => import("src/views/Error500")),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    route: "*",
    component: DashboardLayout,
    routes: [
      {
        path: "/dashtoken",
        exact: true,
        component: lazy(() =>
          import("src/old/src/components/protools/views/Pages/RegisterPage.jsx")
        ),
      },
      {
        path: "/dashbank",
        exact: true,
        component: lazy(() =>
          import("src/old/src/components/protools/views/Widgets/Stake.jsx")
        ),
      },
      {
        path: "/trxbank",
        exact: true,
        component: lazy(() =>
          import("src/old/src/components/protools/views/Widgets/TRXBank.jsx")
        ),
      },
      {
        path: "/bttbank",
        exact: true,
        component: lazy(() =>
          import("src/old/src/components/protools/views/Widgets/BTTBank.jsx")
        ),
      },
      {
        path: "/dashlotto",
        exact: true,
        component: lazy(() =>
          import("src/old/src/components/protools/views/Widgets/DashLotto.jsx")
        ),
      },
      {
        path: "/faq",
        exact: true,
        component: lazy(() => import("src/views/Faq")),
      },
      {
        path: "/dao",
        exact: true,
        component: lazy(() => import("src/views/DashDao")),
      },
      {
        path: "/referral",
        exact: true,
        component: lazy(() => import("src/views/Referral")),
      },
      {
        path: "/vote",
        exact: true,
        component: lazy(() => import("src/views/Vote")),
      },
      {
        path: "/farm",
        exact: true,
        component: lazy(() => import("src/views/Farm")),
      },
      {
        path: "/old",
        exact: true,
        component: lazy(
          () => (window.location.href = "https://old.trondash.com")
        ),
      },
      {
        path: "/telegram",
        exact: true,
        component: lazy(
          () =>
            (window.location.href =
              "https://t.me/joinchat/KvdhdA90OAS1fAnp92HXug")
        ),
      },
      {
        path: "/twitter",
        exact: true,
        component: lazy(
          () => (window.location.href = "https://twitter.com/Tron_Dash")
        ),
      },
      {
        path: "/reddit",
        exact: true,
        component: lazy(
          () => (window.location.href = "https://www.reddit.com/r/TronDash/")
        ),
      },
      {
        path: "/whitepaper",
        exact: true,
        component: lazy(
          () =>
            (window.location.href = process.env.PUBLIC_URL + "images/TDWP.pdf")
        ),
      },
      {
        path: "/dashboards/default",
        exact: true,
        component: DashboardDefaultView,
      },
      {
        path: "/dashbank/:id/:tab",
        exact: true,
        component: lazy(() => import("src/views/DashBank")),
      },
      {
        path: "/dividends",
        exact: true,
        component: lazy(() => import("src/views/DividendList")),
      },
      {
        path: "/swap",
        exact: true,
        component: lazy(() => import("src/views/DashSwap")),
      },
      {
        path: "/liquidityfarm",
        exact: true,
        component: lazy(() => import("src/views/TDDLiquidityFarm")),
      },
      {
        path: "/management/customers/:id",
        exact: true,
        component: lazy(() => import("src/views/CustomerManagementDetails")),
      },
      {
        path: "/management/customers/:id/:tab",
        exact: true,
        component: lazy(() => import("src/views/CustomerManagementDetails")),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
];

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/bttbank" component={App} />
      <Route path="/dashbank" component={App} />
      <Route path="/dashlotto" component={App} />
      <Route path="/exchange" component={App} />
      <Route path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

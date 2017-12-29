import React from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import App from "./App";
import { Admin } from "./components/admin/Admin";
import { User } from "./components/user/User";
import registerServiceWorker from "./registerServiceWorker";
import "materialize-css/dist/css/materialize.min.css";
import "./css/style.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/user" component={User} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();

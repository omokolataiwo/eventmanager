import React, { Component } from "react";
import { Redirect, Switch, BrowserRouter, Route } from "react-router-dom";
import { Index } from "./Index";
import { Profile } from "./Profile";

export class User extends Component {
  render() {
    return (
      <div id="user-area">
        <h2>USER PAGE</h2>
        <hr />
        <BrowserRouter>
          <Switch>
            <Route path={`${this.props.match.path}`} exact component={Index} />
            <Route
              path={`${this.props.match.path}/profile`}
              component={Profile}
            />
            <Redirect to={`${this.props.match.path}`} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

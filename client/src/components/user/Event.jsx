import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import { Create } from "./event/Create";

export class Event extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.path}`} exact component={Create} />
        <Redirect to={`${this.props.match.path}`} />
      </Switch>
    );
  }
}

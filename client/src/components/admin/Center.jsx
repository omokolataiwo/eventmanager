import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Index from './center/Index';
import Create from './center/Create';
import Update from './center/Update';

/**
 * Base page for centers
 *
 * @param {object} props - React properties
 * @returns {object} JSX DOM
 */
export const Center = props => (
  <Switch>
    <Route path={`${props.match.path}`} exact component={Index} />
    <Route path={`${props.match.path}/create`} component={Create} />
    <Route path={`${props.match.path}/update/:index`} component={Update} />
    <Redirect to="/admin/center" />
  </Switch>
);

export default Center;

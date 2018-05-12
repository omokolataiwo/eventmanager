import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Index from './center/Index';
import Create from './center/Create';
import Update from './center/Update';
import Verification from './center/Verification';
import Events from './center/Events';

const propTypes = {
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired
};

/**
 * Base page for centers
 *
 * @param {object} props - React properties
 * @returns {object} JSX DOM
 */
const Center = props => (
  <Switch>
    <Route path={`${props.match.path}`} exact component={Index} />
    <Route path={`${props.match.path}/create`} component={Create} />
    <Route path={`${props.match.path}/completed`} component={Verification} />
    <Route path={`${props.match.path}/events/:id`} component={Events} />
    <Route path={`${props.match.path}/update/:index`} component={Update} />
    <Redirect to="/admin/center" />
  </Switch>
);

Center.propTypes = propTypes;
export default Center;

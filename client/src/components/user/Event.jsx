import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import Create from './event/Create';
import Update from './event/Update';

/**
 * Base page for event
 *
 * @param {object} props - React properties
 * @returns {object} JSX DOM
 */
const Event = props => (
  <Switch>
    <Route path={`${props.match.path}`} exact component={Create} />
    <Route
      path={`${props.match.path}/update/:index`}
      exact
      component={Update}
    />
    <Redirect to={`${props.match.path}`} />
  </Switch>
);

Event.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default Event;

import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import Create from './event/Create';

export const Event = props => (
  <Switch>
    <Route path={`${props.match.path}`} exact component={Create} />
    <Redirect to={`${props.match.path}`} />
  </Switch>
);

Event.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Event;

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Preloader from '../../containers/Preloader';
import AdminEventCard from '../../containers/AdminEventCard';
import fetchCenterRequest from '../../../actions/fetchCenterRequest';
import reset from '../../../actions/reset';

import { FETCHING_CENTER, FETCHING_CENTER_ERROR } from '../../../types';

const propTypes = {
  fetchCenterRequest: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired
  }).isRequired,
  count: PropTypes.string.isRequired,
  events: PropTypes.shape().isRequired,
  center: PropTypes.shape().isRequired,
  action: PropTypes.shape({
    getCenter: PropTypes.string.isRequired
  }).isRequired
};
/**
 * Center events page
 *
 * @class Events
 * @extends {React.Component}
 */
class Events extends React.Component {
  /**
   * Fetch center and events for center
   *
   * @returns {void}
   * @memberof Events
   */
  componentWillMount() {
    this.props.fetchCenterRequest(
      { id: this.props.match.params.id, events: true },
      true
    );
  }

  /**
   * Set new state to component state
   *
   * @param {any} props New properties
   * @returns{void}
   * @memberof Events
   */
  componentWillReceiveProps(props) {
    const { center, count, events } = props;
    this.setState({ center, count, events });
  }
  /**
   * Reset fetching state
   *
   * @returns {void}
   * @memberof Center
   */
  componentWillUnmount() {
    this.props.reset(FETCHING_CENTER);
  }

  /**
   * Renders the component
   *
   * @returns {object} JSX DOM
   * @memberof Events
   */
  render() {
    const { getCenter } = this.props.action;

    if (getCenter === FETCHING_CENTER) {
      return (
        <div className="preloader">
          <Preloader />
        </div>
      );
    }

    if (getCenter === FETCHING_CENTER_ERROR) {
      this.props.history.push('/404');
      return null;
    }

    return (
      <div className="container container-medium">
        <h3>{this.state.center.name}</h3>
        <div className="row">
          <AdminEventCard events={this.state.events} count={this.state.count} />
        </div>
      </div>
    );
  }
}

Events.propTypes = propTypes;

/**
 * Extract new properties from object
 *
 * @param {object} state Redux state
 * @returns {object} The new object
 */
const mapStateToProps = state => {
  const { center, action } = state.getCenter;
  const newCenter = center.center;
  let { events } = center;
  let { count } = center;

  return {
    center: newCenter,
    events,
    count,
    action
  };
};

export default connect(mapStateToProps, { fetchCenterRequest, reset })(Events);

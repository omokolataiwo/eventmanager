import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCenterEventRequest from '../../actions/fetchCenterEventRequest';
import AdminEventCard from '../containers/AdminEventCard';
import Preloader from '../containers/Preloader';
import {
  FETCHING_CENTERS_EVENTS,
  FETCHING_CENTERS_EVENTS_ERRORS
} from '../../types';

const propTypes = {
  fetchCenterEventRequest: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  action: PropTypes.shape({
    getEvents: PropTypes.string.isRequired
  }).isRequired
};

/**
 * Admin dashboard
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  /**
   * Fetch relevant data
   *
   * @returns {void}
   * @memberof Index
   */
  componentDidMount() {
    this.props.fetchCenterEventRequest();
  }

  /**
   * Render no events booked for centers
   *
   * @returns {object} JSX DOM
   * @memberof Bookings
   */
  renderNoEvents() {
    return (
      <div className="container container-medium card admin-index no-event-admin">
        <h3>Welcome!</h3>
        <div>There is no booking information for your centers.</div>
        <div>These are lists of things you may want to do:</div>
        <ul>
          <li>
            You can <a href="/admin/center/create">create center</a>
          </li>
          <li>
            You can <a href="/admin/center">edit existing center</a>
          </li>
        </ul>
      </div>
    );
  }
  /**
   * Renders the component
   *
   * @returns {object} - JSX DOM
   * @memberof Index
   */
  render() {
    const { getEvents } = this.props.action;

    if (getEvents === FETCHING_CENTERS_EVENTS) {
      return (
        <div className="preloader">
          <Preloader />
        </div>
      );
    }

    if (getEvents === FETCHING_CENTERS_EVENTS_ERRORS) {
      return this.renderNoEvents();
    }

    return (
      <div className="container container-medium card admin-index animated fadeIn">
        <h5 className="center">MOST RECENT EVENTS</h5>
        <hr />
        <div className="row">
          <div className="col s12 m12 l12">
            <AdminEventCard events={this.props.events} />
          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = propTypes;

/**
 * Extract state from store
 *
 * @param {object} state - Redux state
 * @return {object} extracted state
 */
const mapStateToProps = state => {
  let { centersEvents, action } = state.getCentersEvents;
  return { events: centersEvents, action };
};

export default connect(mapStateToProps, {
  fetchCenterEventRequest
})(Index);

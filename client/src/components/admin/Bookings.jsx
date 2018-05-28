import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookingTable from '../containers/BookingTable';
import Preloader from '../containers/Preloader';
import fetchCenterEventRequest from '../../actions/fetchCenterEventRequest';
import {
  FETCHING_CENTERS_EVENTS,
  FETCHING_CENTERS_EVENTS_ERRORS
} from '../../types';

const propTypes = {
  fetchCenterEventRequest: PropTypes.func.isRequired,
  centersEvents: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  action: PropTypes.shape().isRequired
};

/**
 * Center Booking Page
 *
 * @class Bookings
 * @extends {React.Component}
 */
export class Bookings extends React.Component {
  /**
   * Get all Eenters and Events
   *
   * @return {void}
   * @memberof Bookings
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
   * Renders the page
   *
   * @returns {object} - JSX DOM
   * @memberof Bookings
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
      <div className="container container-medium">
        <h5>Bookings</h5>
        <hr />
        <div className="row">
          <div className="col s12 m12 l12 animated fadeIn">
            <BookingTable events={this.props.centersEvents} />
          </div>
        </div>
      </div>
    );
  }
}

Bookings.propTypes = propTypes;

/**
 * Map the properties of redux to component properties
 *
 * @param {object} state - Redux state
 * @returns {object} - Extracted object
 */
const mapStateToProps = state => {
  let { centersEvents, action } = state.getCentersEvents;
  return { centersEvents, action };
};
export default connect(mapStateToProps, { fetchCenterEventRequest })(Bookings);

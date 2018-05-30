import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Preloader from '../../containers/Preloader';
import AdminEventCard from '../../containers/AdminEventCard';
import fetchCenterRequest from '../../../actions/fetchCenterRequest';
import adminCancelEventRequest from '../../../actions/adminCancelEventRequest';
import Pagination from '../../containers/Pagination';
import reset from '../../../actions/reset';

import { FETCHING_CENTER, FETCHING_CENTER_ERROR } from '../../../types';

const propTypes = {
  fetchCenterRequest: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired
  }).isRequired,
  count: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
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
export class Events extends React.Component {
  /**
   * Creates an instance of Events.
   *
   * @param {any} props React properties
   * @memberof Events
   */
  constructor(props) {
    super(props);
    this.state = {
      poppedEvent: 0
    };
    this.handleDeletePopEvent = this.handleDeletePopEvent.bind(this);
    this.handlePagingNav = this.handlePagingNav.bind(this);
  }
  /**
   * Fetch center and events for center
   *
   * @returns {void}
   * @memberof Events
   */
  componentDidMount() {
    this.props.fetchCenterRequest(
      { id: this.props.match.params.id, events: true },
      { page: 1 },
      true
    );
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
   * Set pop event and activate pop up
   *
   * @param {any} id Event id
   * @returns {void}
   * @memberof Index
   */
  handleDeletePopEvent(id) {
    this.setState({ poppedEvent: id });
    $('.modal').modal();
    $('#modalEvent').modal('open');
  }

  /**
   * Fetch paging
   *
   * @param {number} index page clicked
   * @returns {void}
   */
  handlePagingNav(index) {
    this.props.fetchCenterRequest(
      { id: this.props.match.params.id, events: true },
      { page: index },
      true
    );
  }

  /**
   * Deletes events
   *
   * @returns {void}
   * @memberof Index
   */
  cancelEvent() {
    this.props.adminCancelEventRequest(this.state.poppedEvent, true);
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
        <div id="modalEvent" className="modal">
          <div className="modal-content">
            <h5>Are you sure you want to cancel this event?</h5>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => this.cancelEvent()}
              className="modal-action modal-close waves-effect red btn"
              style={{ marginRight: '5px' }}
            >
              Cancel Event
            </button>
            <button className="modal-action modal-close waves-effect waves-green btn">
              Go Back
            </button>
          </div>
        </div>

        <h3>{this.props.center.name}</h3>
        <div className="row">
          <AdminEventCard
            events={this.props.events}
            count={this.props.count}
            handleDeletePopEvent={this.handleDeletePopEvent}
          />
        </div>
        <div className="row">
          <Pagination
            total={this.props.count}
            handlePagingNav={this.handlePagingNav}
          />
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
  const {
    center, action, events, count
  } = state.getCenter;

  return {
    center,
    events,
    count,
    action
  };
};

export default connect(mapStateToProps, {
  fetchCenterRequest,
  reset,
  adminCancelEventRequest
})(Events);

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
   * Creates an instance of Index.
   * @param {object} props - React properties
   * @memberof Index
   */
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }
  /**
   * Fetch relevant data
   *
   * @returns {void}
   * @memberof Index
   */
  componentWillMount() {
    this.props.fetchCenterEventRequest();
  }

  /**
   * Set component state
   *
   * @param {object} props - Redux state
   * @return {void}
   * @memberof Index
   */
  componentWillReceiveProps(props) {
    this.setState({ events: props.events });
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
      return 'No Booking information for your centers.';
    }

    return (
      <div className="container container-medium card index">
        <h5 className="center">MOST RECENT EVENTS</h5>
        <div className="row">
          <div className="col s12 m12 l12">
            <AdminEventCard events={this.state.events} />
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

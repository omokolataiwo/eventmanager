import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CenterReports from '../containers/CenterReports';
import BookingTable from '../containers/BookingTable';

const propTypes = {
  eventCenter: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  adminCenters: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

/**
 * Center Booking Page
 *
 * @class Bookings
 * @extends {React.Component}
 */
class Bookings extends React.Component {
  /**
   * Constructor for Center Booking Page
   *
   * @param {object} props - React properties
   */
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
      events: [],
      activeCenterDetails: 0
    };
  }
  /**
   * Get all Eenters and Events
   *
   * @return {void}
   * @memberof Bookings
   */
  componentWillMount() {
    const { eventCenter, adminCenters } = this.props;
    let active = 0;
    let concluded = 0;

    eventCenter.forEach(event => {
      if (event.concluded) {
        concluded += 1;
      } else {
        active += 1;
      }
    });

    this.setState({
      events: eventCenter,
      centers: adminCenters,
      concludedEvents: concluded,
      activeEvents: active
    });
  }

  /**
   * Renders the page
   *
   * @returns {object} - JSX DOM
   * @memberof Bookings
   */
  render() {
    return (
      <div className="container container-medium">
        <h5>Bookings</h5>
        <hr />
        <div>
          <div className="chip">{this.state.activeEvents} Active Events</div>
          <div className="chip">
            {this.state.concludedEvents} Concluded Events
          </div>{' '}
          <div className="chip">{this.state.centers.length} Centers</div>
        </div>
        <div className="row">
          <div className="col s12 m12 l12">
            <BookingTable events={this.state.events} />
          </div>
        </div>
        <CenterReports
          centers={this.state.centers}
          activeCenter={this.state.activeCenterDetails}
        />
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
  let { adminCenters, eventCenter } = state.center;
  adminCenters = adminCenters || [];
  eventCenter = eventCenter || [];

  return { adminCenters, eventCenter };
};
export default connect(mapStateToProps)(Bookings);

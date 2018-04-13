import React from 'react';
import { connect } from 'react-redux';
import { fetchAdminCentersRequest } from '../../actions/fetchAdminCentersRequest';
import { fetchCenterEventRequest } from '../../actions/fetchCenterEventRequest';
import CenterReports from '../containers/CenterReports';
import BookingTable from '../containers/BookingTable';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
      events: [],
      activeCenterDetails: 0
    };
  }
  componentWillMount() {
    this.props.getCenters();
    this.props.getEvents();
  }

  componentWillReceiveProps(props) {
    let active = 0;
    let concluded = 0;

    props.eventCenter.forEach(event => {
      if (event.concluded) {
        concluded += 1;
      } else {
        active += 1;
      }
    });

    this.setState({ events: props.eventCenter });
    this.setState({ centers: props.adminCenters });
    this.setState({ concludedEvents: concluded });
    this.setState({ activeEvents: active });
  }
  render() {
    return (
      <div className="container container-medium">
        <h5>Bookings</h5>
        <hr />
        <div>
          <div className="chip">{this.state.activeEvents} Active Events</div>{' '}
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

const mapDispatchToProps = dispatch => ({
  getCenters: () => dispatch(fetchAdminCentersRequest()),
  getEvents: () => dispatch(fetchCenterEventRequest())
});
const mapStateToProps = state => {
  const { eventCenter } = state.center;
  let { adminCenters } = state.center;
  adminCenters = adminCenters || [];

  return { adminCenters, eventCenter };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bookings);

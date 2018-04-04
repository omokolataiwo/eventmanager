import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Chart from 'chart.js';
import $ from 'jquery';
import { fetchAdminCentersRequest } from '../../store/actions/action_creators/fetchAdminCentersRequest';
import { fetchCenterEventRequest } from '../../store/actions/action_creators/fetchCenterEventRequest';
import CenterReports from '../ui/CenterReports';
import Map from '../ui/Map';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
      events: [],
      activeCenterDetails: 0,
    };
  }
  componentWillMount() {
    this.props.getCenters();
    this.props.getEvents();
  }

  componentWillReceiveProps(props) {
    let active = 0;
    let concluded = 0;

    props.eventCenter.forEach((event) => {
      event.concluded ? concluded++ : active++;
    });

    this.setState({ events: props.eventCenter });
    this.setState({ centers: props.centers });
    this.setState({ concludedEvents: concluded });
    this.setState({ activeEvents: active });
  }

  componentDidMount() {
    const ctx = $('#chart');
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [32, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
  render() {
    return (
      <div className="container container-medium">
        <h5>Bookings</h5>
        <hr />
        <div>
          <div className="chip">{this.state.activeEvents} Active Events</div>{' '}
          <div className="chip">{this.state.concludedEvents} Concluded Events</div>{' '}
          <div className="chip">{this.state.centers.length} Centers</div>
        </div>
        <div className="row">
          <div className="col s12 m12 l12">
            <table className="bordered responsive-table">
              <thead>
                <tr>
                  <th>Event Title</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>State</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.events.map((event) => {
                  const duration = moment(event.enddate).diff(moment(event.startdate), 'days') + 1;
                  return (
                    <tr key={event.eid}>
                      <td>{event.title}</td>
                      <td>{moment(event.startdate).format('DD-MM-YYYY')}</td>
                      <td>{event.name}</td>
                      <td>{event.state}</td>
                      <td>
                        {duration} {duration > 1 ? 'days' : 'day'}
                      </td>
                      <td>{event.concluded ? 'Concluded' : 'Active'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.events.length && (
          <CenterReports
            centers={this.state.centers}
            activeCenter={this.state.activeCenterDetails}
          />
        )}
        <canvas id="chart" width="400" height="400" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCenters: () => dispatch(fetchAdminCentersRequest()),
  getEvents: () => dispatch(fetchCenterEventRequest()),
});
const mapStateToProps = (state) => {
  const { centers, eventCenter } = state.center;
  console.log(centers);
  return { centers, eventCenter };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bookings);

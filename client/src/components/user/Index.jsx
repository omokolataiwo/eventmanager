import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { fetchAllCentersRequest } from '../../actions/fetchAllCentersRequest';
import { fetchUserEventsRequest } from '../../actions/fetchUserEventsRequest';
import HorizontalFeaturedCenters from '../containers/HorizontalFeaturedCenters';
import { STATES } from '../../consts';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentWillMount() {
    this.props.fetchUserEvents(this.props.accessToken);
  }

  componentWillReceiveProps(props) {
    console.log(props.events);
    this.setState({ events: props.events });
  }

  render() {
    return (
      <div className="container container-medium card">
        <div className="row center">
          <div className="col s12 m12 l12">
            <h4>BOOKED EVENTS</h4>
          </div>

          <div className="col s12 m12 l12">
            <div className="row">
              {this.state.events.map(event => (
                <div className="col s12 m4 l4" key={event.id}>
                  <div className="card-panel event-card-user">
                    <h4 className="white-text truncate">{event.title}</h4>
                    <p className="white-text">{STATES[event.center.state]}</p>
                    <p className="white-text">
                      {moment(this.startdate).format('Do MMMM YYYY')}
                    </p>
                    <h5 className="truncate white-text">{event.center.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <h5 className="center">AVAILABLE CENTERS</h5>
        <hr />
        <div className="row center event_center">
          <div className="col s12 m12 l12">
            {<HorizontalFeaturedCenters history={this.props.history} />}
          </div>

          <div className="col s12 m12 l12">
            <ul className="pagination">
              <li className="disabled">
                <a href="#!">
                  <i className="mdi-navigation-chevron-left" />
                </a>
              </li>
              <li className="active">
                <a href="#!">1</a>
              </li>
              <li className="waves-effect">
                <a href="#!">2</a>
              </li>
              <li className="waves-effect">
                <a href="#!">3</a>
              </li>
              <li className="waves-effect">
                <a href="#!">4</a>
              </li>
              <li className="waves-effect">
                <a href="#!">5</a>
              </li>
              <li className="waves-effect">
                <a href="#!">
                  <i className="mdi-navigation-chevron-right" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  fetchUserEvents: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { accessToken } = state.user;
  const { events } = state.event;
  return { accessToken, events };
};
const mapDispatchToProps = dispatch => ({
  fetchCenters: accessToken => dispatch(fetchAllCentersRequest(accessToken)),
  fetchUserEvents: accessToken => dispatch(fetchUserEventsRequest(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);

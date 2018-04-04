import React from 'react';
import { connect } from 'react-redux';
import { fetchCenterEventRequest } from '../../store/actions/action_creators/fetchCenterEventRequest';

import featuredCenterImg from '../../images/party-room.jpg';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }
  componentWillMount() {
    this.props.getEvents();
  }
  componentWillReceiveProps(props) {
    this.setState({ events: props.events });
  }
  render() {
    return (
      <div className="container container-medium card index">
        <h5 className="center">MOST RECENT EVENTS</h5>
        <div className="row">
          {this.state.events.length === 0 && (
            <div className="empty-resources">
              <i className="material-icons left">info_outline</i>No event created for your centers
              yet.
            </div>
          )}
          {this.state.events.map(event => (
            <div className="col s12 m5 l5 center event event-card card">
              <h4>{event.title}</h4>
              <div className="row center">
                <div className="col s12 m2 l2" />
                <div className="col s12 m8 l8">
                  <p className="date">12th December 2017 | 12:00 PM</p>
                </div>
                <div className="col s12 m12 l12">
                  <h5>09032130821</h5>
                </div>
              </div>
              <div className="col s12 m12 l12 card">
                <div className="event-center">
                  <img src={featuredCenterImg} alt="Event Center" />
                  <div className="over-img">
                    <h4>Royal Court</h4>
                    <p>Lagos</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch(fetchCenterEventRequest()),
});

const mapStateToProps = (state) => {
  const { eventCenter } = state.center;
  return { events: eventCenter };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

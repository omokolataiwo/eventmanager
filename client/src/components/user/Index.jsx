import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import fetchUserEventsRequest from '../../actions/fetchUserEventsRequest';
import HorizontalFeaturedCenters from '../containers/HorizontalFeaturedCenters';
import { STATES } from '../../consts';

const propTypes = {
  fetchUserEventsRequest: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.PropTypes.shape().isRequired
};

/**
 * Base component for User Component
 *
 * @class Index
 * @extends {Component}
 */
class Index extends Component {
  /**
   * Creates an instance of Index.
   *
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
   * Fetch all user events
   *
   * @returns {void}
   * @memberof Index
   */
  componentWillMount() {
    this.props.fetchUserEventsRequest();
  }

  /**
   * Set events to event component state
   *
   * @param {object} props - The new incoming properties
   * @returns {void}
   * @memberof Index
   */
  componentWillReceiveProps(props) {
    this.setState({ events: props.events });
  }

  /**
   * Redirect to update event
   *
   * @param {int} id
   * @returns {void}
   * @memberof Index
   */
  handleEditEvent(id) {
    this.props.history.push(`/user/event/update/${id}`);
  }

  /**
   * Renders the component DOM object
   *
   * @returns {object} - JSX DOM
   * @memberof Index
   */
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
                <div className="col s12 m6 l6" key={event.id}>
                  <div className="card-panel event-card-user">
                    <h4 className="truncate">{event.title}</h4>
                    <p>{moment(event.startDate).format('Do MMMM, YYYY')}</p>
                    <p>
                      {event.center.area} | {STATES[event.center.state]}
                    </p>
                    <h5 className="truncate">{event.center.name}</h5>
                    <div className="event-actions">
                      <span
                        onClick={() => this.handleEditEvent(event.id)}
                        tabIndex="-99999"
                        onKeyUp={() => this.handleEditEvent(event.id)}
                        role="button"
                      >
                        Edit
                      </span>
                    </div>
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
        </div>
      </div>
    );
  }
}

Index.propTypes = propTypes;

/**
 * Extract properties from redux state
 *
 * @param {object} state - Redux state
 * @returns {object} - Extracted properties
 */
const mapStateToProps = state => {
  const { accessToken } = state.user;
  const { events } = state.event;
  return { accessToken, events };
};

export default connect(mapStateToProps, { fetchUserEventsRequest })(Index);

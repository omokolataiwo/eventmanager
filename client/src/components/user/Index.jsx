import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import toastr from 'toastr';
import fetchUserEventsRequest from '../../actions/fetchUserEventsRequest';
import fetchUserRequest from '../../actions/fetchUserRequest';
import HorizontalFeaturedCenters from '../containers/HorizontalFeaturedCenters';
import { STATES } from '../../consts';
import { hasFlash, getFlash } from '../../utils/flash';
import { CREATED_EVENT } from '../../types';

const propTypes = {
  fetchUserEventsRequest: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired,
  fetchUserRequest: PropTypes.func.isRequired
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
    this.props.fetchUserRequest();

    if (hasFlash('saveRoute')) {
      return this.props.history.push(getFlash('saveRoute'));
    }

    if (hasFlash(CREATED_EVENT)) {
      toastr.options = {
        positionClass: 'toast-top-full-width',
        showDuration: '300',
        hideDuration: '2000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      };
      toastr.success(getFlash(CREATED_EVENT));
    }
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
   * @param {int} id - Event id
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
      <div className="container container-medium event">
        <div className="row center">
          <div className="col s12 m12 l12">
            <h4>Booked Events</h4>
            <hr />
          </div>

          <div className="col s12 m12 l12">
            <div className="row">
              {this.state.events.map(event => (
                <div className="col s12 m4 l4" key={event.id}>
                  <div className="card-panel event-card-user">
                    <h6 className="truncate">{event.title}
                      <i
                        onClick={() => this.handleEditEvent(event.id)}
                        tabIndex="-99999"
                        onKeyUp={() => this.handleEditEvent(event.id)}
                        role="button" className="material-icons right delete">
                        clear
                      </i>
                      <i
                        onClick={() => this.handleEditEvent(event.id)}
                        tabIndex="-99999"
                        onKeyUp={() => this.handleEditEvent(event.id)}
                        role="button" className="material-icons right edit">
                        edit
                      </i>
                    </h6>
                    <hr />
                    <div className="row venue">
                      <div className="col s12 m2 l2">
                        <i className="material-icons left">location_on</i>
                      </div>
                      <div className="col s12 m9 l9">
                        <h6 className="truncate">{event.center.name}</h6>
                        <p>
                          {event.center.area}, {STATES[event.center.state - 1]}
                        </p>
                      </div>
                    </div>
                    <div className="row timer">
                      <div className="col s12 m2 l2">
                        <i className="material-icons">access_time</i>
                      </div>
                      <div className="col s12 m9 l9">
                        <div className="col s12 m4 l4">
                          <p>{moment(event.startDate).format('Do')}</p>
                          <p>{moment(event.startDate).format('MMM')}.</p>

                        </div>
                        <div className="col s12 m8 l8">
                          <p>{moment(event.startDate).diff(moment(), 'days')} Days</p>
                          <p className="remaining">Remaining</p>
                        </div>
                      </div>
                    </div>
                    <div className="row date" />
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

export default connect(mapStateToProps, {
  fetchUserEventsRequest,
  fetchUserRequest
})(Index);

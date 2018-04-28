import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import $ from 'jquery';
import toastr from 'toastr';
import { updateEventRequest } from '../../../actions/updateEventRequest';
import { CenterDetailsSimple } from '../../admin/center/CenterDetailsSimple';
import InputField from '../../containers/forms/InputField';
import Error from '../../containers/Error';
import DatePicker from '../../containers/forms/DatePicker';
import { STATES } from '../../../consts';
import {
  UPDATE_EVENT_ERROR,
  UPDATED_EVENT,
  RESET_UPDATE_EVENT_STATE
} from '../../../types';

const propTypes = {
  updateEventRequest: PropTypes.func.isRequired,
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ index: PropTypes.string.isRequired }).isRequired
  }).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    centerId: PropTypes.number.isRequired
  })).isRequired,
  errors: PropTypes.shape().isRequired,
  actions: PropTypes.shape().isRequired,
  resetUpdateState: PropTypes.shape().isRequired
};

/**
 * Create event for center
 *
 * @class Create
 * @extends {React.Component}
 */
class Update extends React.Component {
  /**
   * Creates an instance of Create.
   *
   * @param {object} props - React properties
   * @memberof Create
   */
  constructor(props) {
    super(props);
    this.state = {
      event: {
        title: '',
        startDate: '',
        endDate: '',
        centerId: '',
        defaultValue: ''
      },
      centers: [],
      activeCenter: {},
      errors: {}
    };
    this.handleFormFieldChanged = this.handleFormFieldChanged.bind(this);
  }
  /**
   * Set center for event
   *
   * @returns {void}
   * @memberof Create
   */
  componentWillMount() {
    const { match, events, centers } = this.props;
    const eventID = match.params.index;

    const event = events.find(event => event.id === parseInt(eventID, 10));
    const activeCenter = centers.find(center => center.id === parseInt(event.centerId, 10));
    this.setState({ centers, event, activeCenter });
  }

  /**
   * Update component state when state events occur
   *
   * @param {object} props - New properties
   * @return {void}
   * @memberof Create
   */
  componentWillReceiveProps(props) {
    const { errors, actions, resetUpdateState } = props;

    if (actions.createUpdateEvents === UPDATE_EVENT_ERROR) {
      this.setState({ errors });
    }

    if (actions.updateEvent === UPDATED_EVENT) {
      resetUpdateState();
      toastr.options = {
        positionClass: 'toast-top-full-width',
        showDuration: '300',
        hideDuration: '2000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      };
      toastr.success('Event Updated.');
    }
  }

  /**
   * Method changes the property of center object in state
   *
   * @param {object} event - DOM object of changed element
   *
   * @returns {void}
   */
  handleFormFieldChanged(event) {
    let { value, id } = event.target;
    if (id === 'startDate' || id === 'endDate') {
      value = moment(value).format('YYYY-MM-D');
    }
    this.setState({
      event: {
        ...this.state.event,
        [id]: value
      }
    });
  }

  /**
   * Change selected center for event
   *
   * @param {int} centerid - Center ID
   * @returns {void}
   * @memberof Create
   */
  changeActiveCenter(centerid) {
    const activeCenter = this.state.centers.find(center => centerid === center.id);

    $('html, body').animate(
      {
        scrollTop: $('.event-center-detailed').offset().top
      },
      1000
    );

    this.setState({
      activeCenter
    });
  }
  /**
   * Create event for center
   *
   * @param {object} event - DOM event
   * @returns {void}
   */
  updateEvent(event) {
    event.preventDefault();
    this.setState(
      {
        event: {
          ...this.state.event,
          centerId: this.state.activeCenter.id
        }
      },
      () => this.props.updateEventRequest(this.state.event)
    );
  }

  /**
   * Render Create Event Component
   *
   * @returns {object} - JSX DOM
   */
  render() {
    return (
      <div className="container container-medium card">
        <h5>Edit Event</h5>
        <form>
          <h4>
            <Error messages={this.state.errors.global} />
          </h4>
          <div className="row">
            <InputField
              onChange={this.handleFormFieldChanged}
              defaultValue={this.state.event.title}
              id="title"
              type="text"
              title="Event Title"
              width="8"
              errorMessage={this.state.errors.title}
            />

            <div className="row">
              <DatePicker
                onChange={this.handleFormFieldChanged}
                id="startDate"
                type="text"
                title="Start Date"
                width="6"
                errorMessage={this.state.errors.startDate}
                defaultValue={this.state.event.startDate}
              />

              <DatePicker
                onChange={this.handleFormFieldChanged}
                id="endDate"
                type="text"
                title="End Date"
                width="6"
                errorMessage={this.state.errors.endDate}
                defaultValue={this.state.event.endDate}
              />
            </div>
          </div>

          <CenterDetailsSimple center={this.state.activeCenter} />
          <button className="btn" onClick={event => this.updateEvent(event)}>
            Update Event
          </button>
        </form>

        <hr />
        <div className="row">
          <div className="col s12 m12 l12">
            <h5>Related Centers</h5>
          </div>
        </div>
        <div className="row center event_center">
          <div className="col s12 m12 l12">
            <div className="row">
              {this.state.centers.map((center, index) => (
                <div
                  className="col s12 m4 l4 card"
                  key={center.id}
                  onClick={() => this.changeActiveCenter(center.id)}
                  role="button"
                  tabIndex="-20"
                  onKeyUp={() => this.changeActiveCenter(center.id)}
                >
                  <div className="event-center">
                    <img src={center.image} alt="Event Center" />
                    <div className="over-img">
                      <h4 className="truncate">{center.name}</h4>
                      <p>{STATES[center.state]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Update.propTypes = propTypes;

/**
 * Extract properties from redux and map it to component properties
 *
 * @param {object} state - Redux state
 *
 * @returns {object} - Extracted state
 */
const mapStateToProps = state => {
  const { centers } = state.center;
  const { errors, actions, events } = state.event;
  return {
    centers,
    errors,
    actions,
    events
  };
};

export default connect(mapStateToProps, {
  updateEventRequest,
  resetUpdateState: () => ({ type: RESET_UPDATE_EVENT_STATE })
})(Update);

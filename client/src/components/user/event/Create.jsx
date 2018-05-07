import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import $ from 'jquery';
import { createEventRequest } from '../../../actions/createEventRequest';
import { CenterDetailsSimple } from '../../admin/center/CenterDetailsSimple';
import InputField from '../../containers/forms/InputField';
import Error from '../../containers/Error';
import DatePicker from '../../containers/forms/DatePicker';

import { addFlash } from '../../../utils/flash';
import {
  CREATED_EVENT,
  CREATE_EVENT_ERROR,
  RESET_EVENT_STATE
} from '../../../types';
import PaginatedCentersCard from '../../containers/PaginatedCentersCard';

const propTypes = {
  createEventRequest: PropTypes.func.isRequired,
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.shape().isRequired,
  actions: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  count: PropTypes.string.isRequired,
  resetEventState: PropTypes.func.isRequired,
};

/**
 * Create event for center
 *
 * @class Create
 * @extends {React.Component}
 */
class Create extends React.Component {
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
        centerId: ''
      },
      centers: [],
      count: 0,
      activeCenter: {},
      errors: {}
    };
    this.handleFormFieldChanged = this.handleFormFieldChanged.bind(this);
    this.changeActiveCenter = this.changeActiveCenter.bind(this);
  }
  /**
   * Set center for event
   *
   * @returns {void}
   * @memberof Create
   */
  componentWillMount() {
    const { centers, count } = this.props;
    this.setState({ centers, count }, () => {
      const choiceCenter = localStorage.getItem('choice-center');
      const centerId = choiceCenter || this.state.centers[0].id;
      const activeCenter = this.state.centers
        .find(center => center.id === parseInt(centerId, 10));

      this.setState({
        event: { ...this.state.event },
        activeCenter
      });
    });
  }

  /**
   * Update component state when state events occur
   *
   * @param {object} props - New properties
   * @return {void}
   * @memberof Create
   */
  componentWillReceiveProps(props) {
    const {
      errors, actions, history, resetEventState
    } = props;

    if (actions.createEvents === CREATE_EVENT_ERROR) {
      this.setState({ errors });
    }

    if (actions.createEvents === CREATED_EVENT) {
      resetEventState();
      addFlash(CREATED_EVENT, 'Event Created.');
      history.push('/user');
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
   * @param {int} centerId - Center ID
   * @returns {void}
   * @memberof Create
   */
  changeActiveCenter(centerId) {
    const activeCenter = this.state.centers
      .find(center => centerId === center.id);
    this.setState({
      activeCenter
    });

    $('html, body').animate(
      {
        scrollTop: $('.event-center-detailed').offset().top
      },
      1000
    );
  }
  /**
   * Create event for center
   *
   * @param {object} event - DOM event
   * @returns {void}
   */
  createEvent(event) {
    event.preventDefault();
    this.setState(
      {
        event: {
          ...this.state.event,
          centerId: this.state.activeCenter.id
        }
      },
      () => this.props.createEventRequest(this.state.event)
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
        <h5>Create Event</h5>
        <form>
          <h4>
            <Error messages={this.state.errors.global} />
          </h4>
          <div className="row">
            <InputField
              onChange={this.handleFormFieldChanged}
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
              />

              <DatePicker
                onChange={this.handleFormFieldChanged}
                id="endDate"
                type="text"
                title="End Date"
                width="6"
                errorMessage={this.state.errors.endDate}
              />
            </div>
          </div>

          <CenterDetailsSimple center={this.state.activeCenter} />
          <button className="btn" onClick={event => this.createEvent(event)}>
            Book Center
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
            <PaginatedCentersCard
              centers={this.state.centers}
              count={this.state.count}
              click={this.changeActiveCenter}
            />
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = propTypes;

/**
 * Extract properties from redux and map it to component properties
 *
 * @param {object} state - Redux state
 * @returns {object} - Extracted state
 */
const mapStateToProps = state => {
  const { centers, count } = state.center;
  const { errors, actions } = state.event;
  return {
    centers,
    count,
    errors,
    actions
  };
};

export default connect(mapStateToProps, {
  createEventRequest,
  resetEventState: () => ({ type: RESET_EVENT_STATE })
})(Create);

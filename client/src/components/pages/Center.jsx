import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import formatNumber from 'format-num';
import fetchCenterRequest from '../../actions/fetchCenterRequest';
import { addFlash } from '../../utils/flash';
import Preloader from '../containers/Preloader';
import { STATES } from '../../consts';

import reset from '../../actions/reset';
import { FETCHING_CENTER, FETCHING_CENTER_ERROR } from '../../types';

const propTypes = {
  fetchCenterRequest: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  reset: PropTypes.func.isRequired,
  action: PropTypes.shape().isRequired
};

/**
 * View center details
 *
 * @class Center
 * @extends {React.Component}
 */
export class Center extends React.Component {
  /**
   * Fetch center details
   *
   * @returns {void}
   * @memberof Center
   */
  componentDidMount() {
    this.props.fetchCenterRequest(this.props.match.params.id);
  }

  /**
   * Checks if center can not be fetched
   *
   * @param {any} props state object
   * @returns {void}
   * @memberof Center
   */
  componentWillReceiveProps(props) {
    if (props.action.getCenter === FETCHING_CENTER_ERROR) {
      return this.props.history.push('/404');
    }
  }

  /**
   * Reset fetching state
   *
   * @returns {void}
   * @memberof Center
   */
  componentWillUnmount() {
    this.props.reset(FETCHING_CENTER);
  }

  /**
   * Book event center
   *
   * @param {object} event DOM event
   * @returns {void}
   * @memberof Center
   */
  handleBookEvent(event) {
    addFlash('choice-center', this.props.match.params.id);
    this.props.history.replace('/user/event/create');
  }

  /**
   * Render the contact details of a center
   *
   * @returns {*} JSX DOM or null
   * @memberof Center
   */
  renderContactDetails() {
    const { center } = this.props;
    if (!center || !center.contacts) {
      return null;
    }

    return (
      <div>
        <p className="label">Contact</p>
        <p className="value contact-person">
          <span className="contact-name">
          {this.props.center.contacts.firstName} {this.props.center.contacts.lastName}
          </span>
          <span className="contact-number">
            <i className="material-icons left">phone</i>
            {this.props.center.contacts.phoneNumber}
          </span>
        </p>
      </div>
    );
  }

  /**
   * Layout for rendered page
   *
   * @param {object} Content JSX DOM
   * @returns {object} JSX DOM
   * @memberof Center
   */
  renderWithLayout(Content) {
    return (
      <div className="container small-container center-page">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="row">
              <div className="col s12 m10 l10 offset-m1 offset-l1">
                {Content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  /**
   * Render the page
   *
   * @returns {object} JSX DOM
   * @memberof Center
   */
  render() {
    if (this.props.action.getCenter === FETCHING_CENTER) {
      return this.renderWithLayout(<Preloader />);
    }

    return this.renderWithLayout(<div className="row">
      <div className="col s12 m8 l8">
        <div className="row">
          <div className="col s12 m8 l8">
            <h3 className="center-name">{this.props.center.name}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m12 l12">
            <img
              className="thumbnail-large"
              src={this.props.center.image}
              alt="center"
            />
          </div>
          <div className="row">
            <div className="col s12 m12 l12 details">
              <h3>{this.props.center.name}</h3>
              <hr />
              <p>{this.props.center.details}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col s12 m4 l4 center-details">
        <p className="label">Amount</p>
        <p className="value amount">
            &#8358;{formatNumber(this.props.center.amount)}
        </p>

        <p className="label">Address</p>
        <p className="value address">
          {this.props.center.address}, {this.props.center.area}{' '}
          {STATES[this.props.center.state - 1]}.
        </p>
        <p className="label">Capacity</p>
        <p className="value capacity">
          {formatNumber(this.props.center.capacity)}
        </p>
        <p className="label">Facilities</p>
        <p className="value facilities">{this.props.center.facilities}</p>
        {this.renderContactDetails()}
        <button
          className="btn blue"
          onClick={event => this.handleBookEvent(event)}
        >
            Book Center
        </button>
      </div>
    </div>);
  }
}

Center.propTypes = propTypes;

/**
 * Map dispatch to property of component
 *
 * @param {func} dispatch Redux dispatch function
 * @returns {object} Object of functions
 */

/**
 * Map redux state to properties of component
 *
 * @param {object} state Redux state
 * @returns {object} Object of states
 */
const mapStateToProps = state => {
  const { center, action } = state.getCenter;
  return { center, action };
};
export default connect(mapStateToProps, {
  fetchCenterRequest,
  reset
})(Center);

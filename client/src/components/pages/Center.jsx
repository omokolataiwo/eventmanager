import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import formatNumber from 'format-num';
import fetchCenterRequest from '../../actions/fetchCenterRequest';
import { addFlash } from '../../utils/flash';
import SuggestedCenters from '../containers/SuggestedCenters';
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
class Center extends React.Component {
  /**
   * Creates an instance of Center.
   *
   * @param {object} props React properties
   * @memberof Center
   */
  constructor(props) {
    super(props);
    this.state = {
      center: {}
    };
    this.handleRedirect = this.handleRedirect.bind(this);
  }
  /**
   * Fetch center details
   *
   * @returns {void}
   * @memberof Center
   */
  componentWillMount() {
    this.props.fetchCenterRequest(this.props.match.params.id);
  }
  /**
   * Set component state
   *
   * @param {object} newProps New properties
   * @returns {void}
   * @memberof Center
   */
  componentWillReceiveProps(newProps) {
    const { center, action } = newProps;

    if (
      parseInt(newProps.match.params.id, 10) !== center.id &&
      action.getCenter !== FETCHING_CENTER &&
      action.getCenter !== FETCHING_CENTER_ERROR
    ) {
      this.props.fetchCenterRequest(this.props.match.params.id);
    }
    this.setState({ center });
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
    this.props.history.push('/user/event/create');
  }

  /**
   * Redirect to center page with new center
   *
   * @param {int} id - ID of the new center
   * @returns {void}
   * @memberof Center
   */
  handleRedirect(id) {
    this.props.history.replace(`/centers/${id}`);
  }

  /**
   * Render the contact details of a center
   *
   * @returns {*} JSX DOM or null
   * @memberof Center
   */
  renderContactDetails() {
    const { center } = this.state;
    if (!center || !center.contacts) {
      return null;
    }

    return (
      <div>
        <p className="label">Contact</p>
        <p className="value">
          {this.state.center.contacts.firstName} &nbsp;
          {this.state.center.contacts.lastName}
          <span className="contact-number">
            <i className="material-icons left">phone</i>
            {this.state.center.contacts.phoneNumber}
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
    if (Object.keys(this.state.center).length === 0) {
      return this.renderWithLayout(<div>Center Does not Exist</div>);
    }
    return this.renderWithLayout(<div className="row">
      <div className="col s12 m8 l8">
        <div className="row">
          <div className="col s12 m8 l8">
            <h3 className="center-name">{this.state.center.name}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m12 l12">
            <img
              className="thumbnail-large"
              src={this.state.center.image}
              alt="center"
            />
          </div>
          <div className="row">
            <div className="col s12 m12 l12">
              <h3>{this.state.center.name}</h3>
              <hr />
              <p>{this.state.center.details}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col s12 m4 l4 center-details">
        <p className="label">Amount</p>
        <p className="value">
          &#8358;{formatNumber(this.state.center.amount)}
        </p>

        <p className="label">Address</p>
        <p className="value">
          {this.state.center.address}, {this.state.center.area}{' '}
          {STATES[this.state.center.state]}.
        </p>
        <p className="label">Capacity</p>
        <p>{formatNumber(this.state.center.capacity)}</p>
        <p className="label">Facilities</p>
        <p>{this.state.center.facilities}</p>
        {this.renderContactDetails()}
        <button className="btn blue" onClick={event => this.handleBookEvent(event)}>
          Book Center
        </button>
      </div>
                                 </div >);
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

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import formatNumber from 'format-num';
import fetchCenterRequest from '../../actions/fetchCenterRequest';
import searchCenterRequest from '../../actions/searchCenterRequest';
import { addFlash } from '../../utils/flash';
import SuggestedCenters from '../containers/SuggestedCenters';
import { RECEIVED_CENTER, RESET_FETCHING_CENTER } from '../../types';
import { STATES } from '../../consts';
import Map from '../containers/Map';

const propTypes = {
  fetchCenterRequest: PropTypes.func.isRequired,
  resetFetchingCenter: PropTypes.func.isRequired,
  searchCenterRequest: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  center: PropTypes.shape().isRequired,
  searched: PropTypes.shape().isRequired,
  events: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
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
      center: {
        contacts: {}
      },
      relatedCenters: []
    };
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
   * @param {object} props New properties
   * @returns {void}
   * @memberof Center
   */
  componentWillReceiveProps(props) {
    this.setState({ center: props.center });
    this.setState({ relatedCenters: props.searched });

    if (props.events.getCenter === RECEIVED_CENTER) {
      props.resetFetchingCenter();
      props.searchCenterRequest({ state: props.center.state });
    }
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
      </div >
    );
  }
  /**
   * Render the page
   *
   * @returns {object} JSX DOM
   * @memberof Center
   */
  render() {
    return (
      <div className="container small-container center-page">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="row">
              <div className="col s12 m10 l10 offset-m1 offset-l1">
                <div className="row">
                  <div className="col s12 m8 l8">
                    <div className="row">
                      <div className="col s12 m8 l8">
                        <h3 className="center-name">{this.state.center.name}</h3>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12 m12 l12">
                        <img className="thumbnail-large" src={this.state.center.image} alt="center" />
                      </div>
                      <div className="row">
                        <div className="col s12 m12 l12">
                          <SuggestedCenters
                            centers={this.state.relatedCenters}
                          />
                        </div>
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
                    <p className="value">&#8358;{formatNumber(this.state.center.amount)}</p>

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
                    <button onClick={event => this.handleBookEvent(event)}>
                      Book Center
                    </button>
                    {this.state.center.address && (
                      <Map
                        address={this.state.center.address}
                        area={this.state.center.area}
                        state={this.state.center.state}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
  const { center, events } = state.center;
  let { searched } = state.center;
  if (searched.length && Object.keys(center).length) {
    searched = searched.filter(searchCenter => searchCenter.id !== center.id);
  }

  return { center, searched, events };
};
export default connect(mapStateToProps, {
  fetchCenterRequest,
  searchCenterRequest,
  resetFetchingCenter: () => ({ type: RESET_FETCHING_CENTER })
})(Center);

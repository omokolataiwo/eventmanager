import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchAllCentersRequest from '../../actions/fetchAllCentersRequest';
import reset from '../../actions/reset';
import CentersCard from './CentersCard';
import Preloader from './Preloader';
import { FETCHING_CENTERS, RECEIVED_CENTERS } from '../../types';

const propTypes = {
  count: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  centers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchAllCentersRequest: PropTypes.func.isRequired
};

/**
 * FeaturedCenter
 *
 * @class FeaturedCenter
 * @extends {React.Component}
 */
class FeaturedCenter extends React.Component {
  /**
   * Creates an instance of FeaturedCenter.
   *
   * @param {object} props React properties
   *
   * @memberof FeaturedCenter
   */
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
      count: 0
    };
    this.handlePagingNav = this.handlePagingNav.bind(this);
  }

  /**
   * Fetch all centers when component mounts
   *
   * @return {void}
   */
  componentWillMount() {
    const { centers, action, count } = this.props;

    if (action.getCenters === RECEIVED_CENTERS) {
      return this.setState({ centers, count });
    }
    this.props.fetchAllCentersRequest();
  }
  /**
   * Update centers when property received
   *
   * @param {props} props - The properties received
   * @return {void}
   */
  componentWillReceiveProps(props) {
    const { centers, count } = props;
    this.setState({ centers, count });
  }

  componentWillUnmount() {
    this.props.reset(FETCHING_CENTERS);
  }

  /**
   * Fetch paging
   *
   * @param {number} index page clicked
   * @returns {void}
   */
  handlePagingNav(index) {
    this.props.fetchAllCentersRequest({ page: index });
  }
  /**
   * Render page
   *
   * @returns {object} JSX DOM
   * @memberof FeaturedCenter
   */
  render() {
    const { getCenters } = this.props.action;

    if (getCenters === FETCHING_CENTERS) {
      return (
        <div className="preloader">
          <Preloader />
        </div>
      );
    }

    if (getCenters === RECEIVED_CENTERS && !this.state.centers.length) {
      return 'No center record yet!';
    }

    return (
      <CentersCard
        centers={this.state.centers}
        count={this.state.count}
        handlePagingNav={this.handlePagingNav}
      />
    );
  }
}

FeaturedCenter.propTypes = propTypes;

/**
 * Map redux state to component property
 *
 * @param {state} state - state to map to property
 * @return {object} - extracted properties from state
 */
const mapStateToProps = state => {
  const { centers, count, action } = state.getAvailableCenters;
  return { centers, count, action };
};
export default connect(mapStateToProps, {
  fetchAllCentersRequest,
  reset
})(FeaturedCenter);

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
  action: PropTypes.shape().isRequired,
  centers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchAllCentersRequest: PropTypes.func.isRequired
};

/**
 * FeaturedCenter
 *
 * @class FeaturedCenter
 * @extends {React.Component}
 */
export class RecentCenters extends React.Component {
  /**
   * Creates an instance of FeaturedCenter.
   *
   * @param {object} props React properties
   *
   * @memberof FeaturedCenter
   */
  constructor(props) {
    super(props);
    this.handlePagingNav = this.handlePagingNav.bind(this);
  }

  /**
   * Fetch all centers when component mounts
   *
   * @return {void}
   */
  componentDidMount() {
    this.props.fetchAllCentersRequest();
  }

  /**
   * Reset fetching state when component unmount
   *
   * @returns {void}
   * @memberof RecentCenters
   */
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

    if (getCenters === RECEIVED_CENTERS && !this.props.centers.length) {
      return (<span>No center record yet!</span>);
    }

    return (
      <CentersCard
        centers={this.props.centers}
        count={this.props.count}
        handlePagingNav={this.handlePagingNav}
      />
    );
  }
}

RecentCenters.propTypes = propTypes;

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
})(RecentCenters);

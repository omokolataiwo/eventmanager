import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import formatNumber from 'format-num';
import fetchAllCentersRequest from '../../actions/fetchAllCentersRequest';
import Pagination from './Pagination';
import { STATES } from '../../consts';
import CentersCard from './CentersCard';

const propTypes = {
  count: PropTypes.number.isRequired,
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

  /**
   * Fetch paging
   *
   * @param {number} index page cliced
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
  const { centers, count } = state.center;
  return { centers, count };
};
export default connect(mapStateToProps, {
  fetchAllCentersRequest
})(FeaturedCenter);

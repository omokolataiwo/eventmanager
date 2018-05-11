import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import { CenterDetailsEdit } from './CenterDetailsEdit';
import fetchAdminCentersRequest from '../../../actions/fetchAdminCentersRequest';

import PaginatedCentersCard from '../../containers/PaginatedCentersCard';

const propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  fetchAdminCentersRequest: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
};

/**
 * Index Component for all centers
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  /**
   * Constructor for Index Component
   *
   * @param {object} props - React properties
   */
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
      count: 0,
      activeCenter: {}
    };
    this.handleEditCenter = this.handleEditCenter.bind(this);
    this.changeActiveCenter = this.changeActiveCenter.bind(this);
    this.handlePagingNav = this.handlePagingNav.bind(this);
  }
  /**
   * Set component state to admin centers
   *
   * @returns {void}
   * @memberof Index
   */
  componentWillMount() {
    this.props.fetchAdminCentersRequest();
  }

  /**
   * update state
   *
   * @param {object} props - New properties
   * @returns {void}
   * @memberof Index
   */
  componentWillReceiveProps(props) {
    const { centers, count } = props;
    this.setState({ centers, count, activeCenter: centers[0] });
  }

  /**
   * Toggle active center
   *
   * @param {int} centerId - The index of the center
   * @returns {void}
   * @memberof Index
   */
  changeActiveCenter(centerId) {
    $('html, body').animate(
      {
        scrollTop: $('.event-center-detailed').offset().top
      },
      1000
    );
    const { centers } = this.state;
    const activeCenter = centers.find(center => centerId === center.id);
    this.setState({
      activeCenter
    });

    return this.setState({ activeCenter });
  }

  /**
   * Fetch paging
   *
   * @param {number} index page cliced
   * @returns {void}
   */
  handlePagingNav(index) {
    this.props.fetchAdminCentersRequest({ page: index });
  }

  /**
   * Redirects to edit center page
   *
   * @param {int} id - Center ID
   * @returns {void}
   * @memberof Index
   */
  handleEditCenter(id) {
    return this.props.history.push(`/admin/center/update/${id}`);
  }

  /**
   * Render the component
   *
   * @returns {object} - JSX DOM
   * @memberof Index
   */
  render() {
    return (
      <div className="container container-medium">
        {this.state.centers.length > 0 && (
          <CenterDetailsEdit
            center={this.state.activeCenter}
            click={this.handleEditCenter}
          />
        )}
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="row">
              <h5>Admin Centers</h5>
              <hr />
              <PaginatedCentersCard
                centers={this.state.centers}
                count={this.state.count}
                click={this.changeActiveCenter}
                handlePagingNav={this.handlePagingNav}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Index.propTypes = propTypes;

/**
 * Extract relevant state properties for component
 *
 * @param {object} state - Redux state
 * @return {object} extracted states
 */
const mapStateToProps = state => {
  const { centers, count } = state.getAvailableCenters;
  return { centers, count };
};
export default connect(mapStateToProps, {
  fetchAdminCentersRequest
})(Index);

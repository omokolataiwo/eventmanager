import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import fetchAllCentersRequest from '../../actions/fetchAllProtectedCentersRequest';
import approveCenterRequest from '../../actions/approveCenterRequest';
import Lever from '../containers/forms/Lever';
import Pagination from '../containers/Pagination';

const propTypes = {
  fetchAllCentersRequest: PropTypes.func.isRequired,
  approveCenterRequest: PropTypes.func.isRequired,
  centers: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

/**
 * Index
 *
 * @class Index
 * @extends {React.Component}
 */
export class Index extends React.Component {
  /**
   * Creates an instance of Index.
   *
   * @param {any} props - React properties
   * @memberof Index
   */
  constructor(props) {
    super(props);
    this.state = {
      centers: []
    };
    this.handleApproveToggle = this.handleApproveToggle.bind(this);
    this.handlePagingNav = this.handlePagingNav.bind(this);
  }
  /**
   * Fetches centers
   *
   * @returns {void}
   * @memberof Index
   */
  componentWillMount() {
    this.props.fetchAllCentersRequest();
  }

  /**
   * Update component state
   *
   * @param {any} props - New state properties
   * @return {void}
   * @memberof Index
   */
  componentWillReceiveProps(props) {
    this.setState({ centers: props.centers });
  }

  /**
   * Handles the center approving toggle
   *
   * @param {string} id - The center's ID
   * @returns {void}
   * @memberof Index
   */
  handleApproveToggle(id) {
    this.props.approveCenterRequest(id);

    let { centers } = this.state;
    centers = centers.map(center => {
      if (center.id === id) {
        center.approve = !center.approve;
      }
      return center;
    });

    this.setState({ centers });
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
   * Renders centers
   *
   * @returns {object} JSX DOM
   * @memberof Index
   */
  renderCenters() {
    if (!Array.isArray(this.state.centers) || !this.state.centers.length) {
      return null;
    }

    return (
      <table className="bordered responsive-table">
        <thead>
          <tr>
            <th>Center Name</th>
            <th>Center Address</th>
            <th>Contact Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Approve Center</th>
          </tr>
        </thead>
        <tbody>
          {this.state.centers.map(center => (
            <tr key={center.id}>
              <td>{center.name}</td>
              <td>{center.address}</td>
              <td>
                {`${center.contacts.firstName} ${center.contacts.lastName}`}
              </td>
              <td>{center.contacts.phoneNumber}</td>
              <td>{center.contacts.email}</td>
              <td>
                <Lever
                  boolValue={center.approve}
                  handleToggle={this.handleApproveToggle}
                  id={center.id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  /**
   * Renders the component page
   *
   * @returns {object} JSX DOM object
   * @memberof Index
   */
  render() {
    return (
      <div className="container container-medium">
        <h4>Registered Centers</h4>
        <hr />
        {this.renderCenters()}
        <Pagination
          total={this.props.count}
          handlePagingNav={this.handlePagingNav}
        />
      </div>
    );
  }
}

Index.propTypes = propTypes;

/**
 * Map redux state to component state
 *
 * @param {object} state - Redux state
 * @returns {object} - Extracted states properties
 */
const mapStateToProps = state => {
  const { centers, count } = state.getAvailableCenters;
  return { centers, count };
};
export default connect(
  mapStateToProps,
  {
    fetchAllCentersRequest,
    approveCenterRequest
  }
)(Index);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fetchAllCentersRequest from '../../actions/fetchAllCentersRequest';

const propTypes = {
  fetchAllCentersRequest: PropTypes.func.isRequired,
  centers: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

/**
 * Index
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
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
          </tr>
        </thead>
        <tbody>
          {this.state.centers.map(center => (
            <tr key={center.id}>
              <td>{center.name}</td>
              <td>{center.address}</td>
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
const mapStateToProps = (state) => {
  const { centers } = state.center;
  return { centers };
};
export default connect(mapStateToProps, { fetchAllCentersRequest })(Index);

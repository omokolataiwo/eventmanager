import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { STATES } from '../../../consts';
import { CenterDetailsEdit } from './CenterDetailsEdit';

import getContactPersonRequest from '../../../actions/fetchContactPersonRequest';
import PaginatedCentersCard from '../../containers/PaginatedCentersCard';

const propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getContactPersonRequest: PropTypes.func.isRequired
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
      activeCenter: 0
    };
    this.handleEditCenter = this.handleEditCenter.bind(this);
    this.changeActiveCenter = this.changeActiveCenter.bind(this);
  }
  /**
   * Set component state to admin centers
   *
   * @returns {void}
   * @memberof Index
   */
  componentWillMount() {
    const { centers } = this.props;
    this.props.getContactPersonRequest();
    return this.setState({ centers });
  }

  /**
   * Toggle active center
   *
   * @param {int} centerIndex - The index of the center
   * @returns {void}
   * @memberof Index
   */
  changeActiveCenter(centerIndex) {
    return this.setState({ activeCenter: centerIndex });
  }
  /**
   * Redirects to edit center page
   *
   * @returns {void}
   * @memberof Index
   */
  handleEditCenter() {
    const { id } = this.state.centers[this.state.activeCenter];
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
            center={this.state.centers[this.state.activeCenter]}
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
                count="0"
                click={this.changeActiveCenter}
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
  const { adminCenters } = state.center;
  return { centers: adminCenters };
};
export default connect(mapStateToProps, { getContactPersonRequest })(Index);

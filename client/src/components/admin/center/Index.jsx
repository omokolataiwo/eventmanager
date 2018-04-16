import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { STATES } from '../../../consts';
import { CenterDetailsEdit } from './CenterDetailsEdit';

const propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
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
  }
  /**
   * Fetch all centers
   *
   * @returns {void}
   * @memberof Index
   */
  componentWillMount() {
    const { centers } = this.props;
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
              <h5>My Centers</h5>
              <hr />
              {this.state.centers.map((center, index) => (
                <div className="col s12 m4 l4 card" key={center.id}>
                  <div
                    className="event-center"
                    onClick={() => this.changeActiveCenter(index)}
                    role="button"
                    tabIndex={index}
                    onKeyPress={() => this.changeActiveCenter(index)}
                  >
                    <img src={center.image} alt="Event Center" />
                    <div className="over-img">
                      <h4 className="truncate">{center.name}</h4>
                      <p className="truncate">{STATES[center.state]}</p>
                    </div>
                  </div>
                </div>
              ))}
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
export default connect(mapStateToProps)(Index);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCenterRequest from '../../actions/fetchCenterRequest';

const propTypes = {
  getCenter: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  center: PropTypes.shape().isRequired
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
  }
  /**
   * Fetch center details
   *
   * @returns {void}
   * @memberof Center
   */
  componentWillMount() {
    this.props.getCenter(this.props.match.params.id);
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
  }
  /**
   * Render the page
   *
   * @returns {object} JSX DOM
   * @memberof Center
   */
  render() {
    return (
      <div className="container small-container">
        <div className="row card">
          <div className="col s12 m12 l12">
            <h5>{this.state.center.name}</h5>

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
const mapDispatchToProps = dispatch => ({
  getCenter: id => dispatch(fetchCenterRequest(id))
});
/**
 * Map redux state to properties of component
 *
 * @param {object} state Redux state
 * @returns {object} Object of states
 */
const mapStateToProps = state => {
  const { center } = state.center;
  return { center };
};
export default connect(mapStateToProps, mapDispatchToProps)(Center);

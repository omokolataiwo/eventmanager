import React from 'react';
import { connect } from 'react-redux';
import formatNumber from 'format-num';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchCentersRequest from '../../actions/searchCenterRequest';

/**
 * Displays related centers
 *
 * @param {object} centers - Suggested Centers
 * @returns {object} - JSX DOM
 */
class SuggestedCenters extends React.Component {
  /**
   * Creates an instance of SuggestedCenters.
   * @param {object} props React Properties
   * @memberof SuggestedCenters
   */
  constructor(props) {
    super(props);
    this.state = {
      centers: []
    };
  }
  /**
   * Search for centers based on parameters.
   *
   * @returns {void}
   * @memberof SuggestedCenters
   */
  componentWillMount() {
    this.props.searchCentersRequest({ state: this.props.state });
  }

  /**
   * Set suggested center to state
   *
   * @param {object} props - New properties
   * @returns {void}
   * @memberof SuggestedCenters
   */
  componentWillReceiveProps(props) {
    let { centers } = props;
    if (centers.length) {
      centers = centers.filter(searchCenter => searchCenter.id !== this.props.centerId);
      this.setState({ centers: centers.slice(0, 3) });
    }
  }

  /**
   * Render the component
   *
   * @returns {object} JSX DOM
   * @memberof SuggestedCenters
   */
  render() {
    if (!this.props.centers.length) return null;

    return (
      <div className="related-centers">
        <h5>You May Also Like These Venues</h5>
        <hr />
        <div className="row">
          {this.state.centers.map(center => (
            <Link to={`/center/${center.id}`} key={center.id}>
              <div className="col s12 m4 l4 thumb-center" key={center.id}>
                <img
                  className="thumbnail-small"
                  src={center.image}
                  alt="center"
                />
                <h5 className="truncate">{center.name}</h5>
                <p>{center.area}</p>
                <p>&#8358;{formatNumber(center.amount)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

/**
 * Map redux state to component
 *
 * @param {object} state Redux state
 * @returns {object} extracted properties
 */
const mapStateToProps = state => {
  const { searched } = state.searchCenters;
  return {
    centers: searched
  };
};

export default connect(mapStateToProps, {
  searchCentersRequest
})(SuggestedCenters);

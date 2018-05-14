import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hasFlash } from '../../utils/flash';
import searchCenterRequest from '../../actions/searchCenterRequest';
import CentersCard from '../containers/CentersCard';

const propTypes = {
  searchCenterRequest: PropTypes.func.isRequired,
  searched: PropTypes.arrayOf(PropTypes.shape()).isRequired
};
/**
 * Search center page
 *
 * @class Search
 * @extends {Search}
 */
class Search extends React.Component {
  /**
   * Creates an instance of Search.
   *
   * @param {object} props - React properties
   * @memberof Search
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
   * Redirect to search page
   *
   * @param {object} props - Search state
   * @returns {void}
   * @memberof OverlaySearch
   */
  componentWillMount() {
    if (hasFlash('SEARCH_PARAMS')) {
      const searchTerm = JSON.parse(localStorage.getItem('SEARCH_PARAMS'));
      return this.props.searchCenterRequest(searchTerm);
    }
  }
  /**
   * Sets searched result to component's state
   *
   * @param {any} props searched result
   * @returns {void}
   * @memberof Search
   */
  componentWillReceiveProps(props) {
    if (props.searched.length) {
      this.setState({
        centers: props.searched,
        count: props.searched[0].count
      });
    }
  }

  /**
   * Fetch paging
   *
   * @param {number} index page cliced
   * @returns {void}
   */
  handlePagingNav(index) {
    const searchTerm = JSON.parse(localStorage.getItem('SEARCH_PARAMS'));
    return this.props.searchCenterRequest({ ...searchTerm, page: index });
  }

  /**
   * Renders search result
   *
   * @returns {object} JSX DOM
   * @memberof Search
   */
  renderSearchResult() {
    if (this.state.centers.length) {
      return (
        <CentersCard
          centers={this.state.centers}
          count={this.state.count}
          handlePagingNav={this.handlePagingNav}
        />
      );
    }
    return <div>No Center Found.</div>;
  }
  /**
   * Render page
   *
   * @returns {object} JSX DOM
   * @memberof Search
   */
  render() {
    return (
      <div className="container small-container">
        <div className="row card">
          <div className="col s12 m12 l12">
            <h5>Search Result</h5>
            <hr />
            {this.renderSearchResult()}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = propTypes;

/**
 * Attach redux states to component state
 *
 * @param {object} state Redux state
 * @returns {object} Extracted object
 */
const mapStateToProps = (state) => {
  const { searched, count } = state.searchCenters;
  return { searched, count };
};
export default connect(mapStateToProps, { searchCenterRequest })(Search);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import fetchAllCentersRequest from '../../actions/fetchAllCentersRequest';
import Pagination from './Pagination';

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
      <div>
        <div className="row">
          {this.state.centers.map((center, index) => (
            <Link to={`/center/${center.id}`} key={center.id}>
              <div className="col s12 m4 l4 card">
                <div className="event-center">
                  <img src={center.image} alt="Featured Center" />
                  <div className="over-img">
                    <h4 className="truncate">{center.name}</h4>
                    <p>{center.area}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Pagination
          total={this.state.count}
          handlePagingNav={this.handlePagingNav}
        />
      </div>
    );
  }
}
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

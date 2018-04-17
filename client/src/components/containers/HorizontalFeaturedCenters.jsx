import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import featuredCenterImg from '../../images/party-room.jpg';
import fetchAllCentersRequest from '../../actions/fetchAllCentersRequest';
import { STATES } from '../../consts';

const propTypes = {
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAllCentersRequest: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired
};
/**
 * Featured centers component
 *
 * @class HorizontalFeaturedCenters
 * @extends {React.Component}
 */
class HorizontalFeaturedCenters extends React.Component {
  /**
   * Creates an instance of HorizontalFeaturedCenters.
   *
   * @param {object} props - React properties
   * @memberof HorizontalFeaturedCenters
   */
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
      poppedCenter: {}
    };
  }
  /**
   * Fetch all centers
   *
   * @returns {void}
   * @memberof HorizontalFeaturedCenters
   */
  componentWillMount() {
    this.props.fetchAllCentersRequest();
    this.setState({ centers: this.props.centers });
  }
  /**
   * Initialize materialize modal
   *
   * @returns {void}
   * @memberof HorizontalFeaturedCenters
   */
  componentDidMount() {
    $('.modal').modal();
  }
  /**
   * Handle pop up and populate modal with center data
   *
   * @param {int} id - Center id
   * @returns {void}
   * @memberof HorizontalFeaturedCenters
   */
  handleModal(id) {
    this.setState({
      poppedCenter: this.state.centers.find(center => center.id === id)
    });
    $('#modal1').modal('open');
  }
  /**
   * Redirect to create event page
   *
   * @returns{void}
   * @memberof HorizontalFeaturedCenters
   */
  bookCenter() {
    const { history } = this.props;
    localStorage.setItem('choice-center', this.state.poppedCenter.id);
    history.push('/user/event');
  }

  /**
   * Renders the component DOM
   *
   * @returns {object} - JSX DOM
   * @memberof HorizontalFeaturedCenters
   */
  render() {
    return (
      <div className="row">
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>{this.state.poppedCenter.name}</h4>
            <p>{this.state.poppedCenter.address}</p>
            <p>{STATES[this.state.poppedCenter.state]}</p>
            <p>{this.state.poppedCenter.capacity}</p>
            <p>N{this.state.poppedCenter.amount}</p>
            <p>{this.state.poppedCenter.facilities}</p>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => this.bookCenter()}
              className="modal-action modal-close waves-effect waves-green btn-flat"
            >
              Book Center
            </button>
          </div>
        </div>

        {this.state.centers.map(center => (
          <div className="col s12 m4 l4 card" key={center.id}>
            <div
              className="event-center"
              onClick={() => this.handleModal(center.id)}
              tabIndex="-99999"
              onKeyUp={() => this.handleModal(center.id)}
              role="button"
            >
              <img src={center.image} alt="Event Center" />
              <div className="over-img">
                <h4 className="truncate">{center.name}</h4>
                <p>
                  <span className="truncate">{center.address}</span> |{' '}
                  {STATES[center.state]}
                </p>
                <h4>N70,000</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

HorizontalFeaturedCenters.propTypes = propTypes;

/**
 * Extract redux state to component
 *
 * @param {object} state - Redux state
 * @return {object} - Extracted properties
 */
const mapStateToProps = state => {
  const { centers } = state.center;
  return { centers };
};

export default connect(mapStateToProps, { fetchAllCentersRequest })(HorizontalFeaturedCenters);

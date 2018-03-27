import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import featuredCenterImg from '../../images/party-room.jpg';
import { fetchAllCentersRequest } from '../../store/actions/action_creators/fetchAllCentersRequest';
import { STATES } from '../ui/consts';
import * as route from '../../libs/route';

class HorizontalFeaturedCenters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
      poppedCenter: {},
    };
  }
  componentWillMount() {
    this.props.fetchCenters(this.props.accessToken);
    this.setState({ centers: this.props.centers });
  }
  componentDidMount() {
    $('.modal').modal();
  }
  handleModal(id) {
    this.setState({ poppedCenter: this.state.centers.find(center => center.id === id) });
    $('#modal1').modal('open');
    return this;
  }
  bookCenter() {
    const { history } = this.props;
    localStorage.setItem('choice-center', this.state.poppedCenter.id);
    route.push('/user/event', history.push);
  }
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
              <img src={featuredCenterImg} alt="Event Center" />
              <div className="over-img">
                <h4 className="truncate">{center.name}</h4>
                <p>
                  <span className="truncate">{center.address}</span> | {STATES[center.state]}
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

HorizontalFeaturedCenters.propTypes = {
  accessToken: PropTypes.string.isRequired,
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchCenters: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchCenters: accessToken => dispatch(fetchAllCentersRequest(accessToken)),
});
const mapStateToProps = (state) => {
  const { accessToken } = state.user;
  const { centers } = state.center;
  return { centers, accessToken };
};
export default connect(mapStateToProps, mapDispatchToProps)(HorizontalFeaturedCenters);

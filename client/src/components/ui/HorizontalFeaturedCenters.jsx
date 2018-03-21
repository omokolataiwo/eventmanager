import React from 'react';
import { connect } from 'react-redux';
import featuredCenterImg from '../../images/party-room.jpg';
import { fetchAllCentersRequest } from '../../store/actions/action_creators/fetchAllCentersRequest';

class HorizontalFeaturedCenters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
    };
  }
  componentWillMount() {
    this.props.fetchCenters(this.props.userToken);
    this.setState({ centers: this.props.centers });
  }
  render() {
    return (
      <div className="row">
        <div className="col s12 m4 l4 card">
          <div className="event-center">
            <img src={featuredCenterImg} alt="Event Center" />
            <div className="over-img">
              <h4>Royal Court</h4>
              <p>Amuwo Odofin | Lagos</p>
              <h4>N70,000</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchCenters: accessToken => dispatch(fetchAllCentersRequest(accessToken)),
});
const mapStateToProps = (state) => {
  const { accessToken } = state.user;
  const { centers } = state.center;
  console.log(accessToken);
  return { centers, accessToken };
};
export default connect(mapStateToProps, mapDispatchToProps)(HorizontalFeaturedCenters);

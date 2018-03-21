import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as route from '../../../libs/route';
import { fetchAllCentersRequest } from '../../../store/actions/action_creators/fetchAllCentersRequest';
import { STATES } from '../../ui/consts';
import { CenterDetailsEdit } from './CenterDetailsEdit';

import CenterImg from '../../../images/party-room.jpg';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
      activeCenter: 0,
    };
    this.handleEditCenter = this.handleEditCenter.bind(this);
  }
  componentWillMount() {
    this.props.fetchAllCenters(this.props.accessToken);
    this.setState({ centers: this.props.centers });
  }
  changeActiveCenter(centerIndex) {
    return this.setState({ activeCenter: centerIndex });
  }
  handleEditCenter() {
    return route.push(`/admin/center/update/${this.state.activeCenter}`, this.props.history.push);
  }
  render() {
    return (
      <div className="container container-medium">
        <CenterDetailsEdit
          center={this.state.centers[this.state.activeCenter]}
          click={this.handleEditCenter}
        />
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="filters right">
              <span>Gear</span>
              <span>State</span>
            </div>
          </div>

          <div className="col s12 m12 l12">
            <div className="row">
              {this.state.centers.map((center, index) => (
                <div className="col s12 m4 l4 card" key={center.id}>
                  <div
                    className="event-center"
                    onClick={() => this.changeActiveCenter(index)}
                    role="button"
                    tabIndex={index}
                    onKeyPress={() => this.changeActiveCenter(index)}
                  >
                    <img src={CenterImg} alt="Event Center" />
                    <div className="over-img">
                      <h4 className="truncate">{this.state.centers[index].name}</h4>
                      <p className="truncate">{STATES[this.state.centers[index].state]}</p>
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
Index.propTypes = {
  fetchAllCenters: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  centers: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
const mapDispatchToProps = dispatch => ({
  fetchAllCenters: accessToken => dispatch(fetchAllCentersRequest(accessToken)),
});

const mapStateToProps = (state) => {
  const { user: { accessToken }, center: { centers } } = state;
  return { accessToken, centers };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);

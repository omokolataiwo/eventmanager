import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { fetchAdminCentersRequest } from '../../../actions/fetchAdminCentersRequest';
import { STATES } from '../../../consts';
import { RESET_CREATE_NEW_CENTER } from '../../../types';
import { CenterDetailsEdit } from './CenterDetailsEdit';

import CenterImg from '../../../images/party-room.jpg';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      centers: [],
      activeCenter: 0
    };
    this.handleEditCenter = this.handleEditCenter.bind(this);
  }
  componentWillMount() {
    this.props.fetchAllCenters();

    if (localStorage.getItem('newCenterCreated')) {
      this.props.clearCreatedState();
      localStorage.removeItem('newCenterCreated');
      toastr.success('New Center Created.');
    }
  }
  componentWillReceiveProps(props) {
    this.setState({ centers: props.centers });
  }
  changeActiveCenter(centerIndex) {
    return this.setState({ activeCenter: centerIndex });
  }
  handleEditCenter() {
    return this.props.history.push(`/admin/center/update/${this.state.centers[this.state.activeCenter].id}`);
  }
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
            <div className="filters right">
              <i className="material-icons left">settings</i>
            </div>
          </div>

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
                    <img src={CenterImg} alt="Event Center" />
                    <div className="over-img">
                      <h4 className="truncate">
                        {this.state.centers[index].name}
                      </h4>
                      <p className="truncate">
                        {STATES[this.state.centers[index].state]}
                      </p>
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
    push: PropTypes.func.isRequired
  }).isRequired
};
const mapDispatchToProps = dispatch => ({
  fetchAllCenters: () => dispatch(fetchAdminCentersRequest()),
  clearCreatedState: () => dispatch({ type: RESET_CREATE_NEW_CENTER })
});

const mapStateToProps = state => {
  const { adminCenters } = state.center;
  return { centers: adminCenters };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);

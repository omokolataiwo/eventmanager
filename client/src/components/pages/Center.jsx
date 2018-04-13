import React from 'react';
import { connect } from 'react-redux';
import { fetchCenterRequest } from '../../actions/fetchCenterRequest';

class Center extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {}
    };
  }
  componentWillMount() {
    this.props.getCenter(this.props.match.params.id);
  }
  componentWillReceiveProps(props) {
    this.setState({ center: props.center });
  }
  render() {
    return (
      <div className="container small-container">
        <div className="row card">
          <div className="col s12 m12 l12">
            <h5>REGISTER</h5>
            <p>{this.state.center.name}</p>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getCenter: id => dispatch(fetchCenterRequest(id))
});
const mapStateToProps = state => {
  const { center } = state.center;
  return { center };
};
export default connect(mapStateToProps, mapDispatchToProps)(Center);

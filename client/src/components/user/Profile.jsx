import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserRequest } from '../../actions/updateUserRequest';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentWillMount() {
    this.setState({ user: this.props.user }, () =>
      console.log(this.state.user));
  }
  render() {
    return (
      <div id="profile">
        <h5>Profile Page</h5>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUserRequest(user))
});
const mapStateToProps = state => {
  const { userdata } = state.user;
  return { user: userdata };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

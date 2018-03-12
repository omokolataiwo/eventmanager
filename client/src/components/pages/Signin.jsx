import React, { Component } from 'react';
import { PropTypes } from 'props-type';
import { connect } from 'react-redux';
import { signinRequest } from '../../store/actions/action_creators/signinRequest';
import * as route from '../../libs/route';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: 'omokolataiwo',
        password: '123',
      },
      errors: {
        global: null,
      },
    };
  }

  componentWillMount() {
    const { authenticated, userdata, history } = this.props;
    if (authenticated) {
      return route.push(route.getPath(userdata.role), history.push);
    }
  }

  signin() {
    const username = this.state.user.username || '';
    const password = this.state.user.password || '';

    if (username.trim() === '' || password.trim() === '') {
      this.setState({
        errors: { ...this.state.errors, global: 'Invalid username or password' },
      });
      return;
    }
    return this.props.signinUserRequest(this.state.user);
  }
  componentWillReceiveProps(props) {
    const {
      userdata, access_token, events, errors, history,
    } = props;

    if (events.isSignedin && access_token) {
      return route.push(route.getPath(userdata.role), history.push);
    }
    this.setState({ errors });
    this.setState({ events });
  }

  render() {
    return (
      <div className="container container-small">
        <div className="row card signin">
          <div className="col s12 m12 l12">
            <h5>SIGN IN</h5>
            <p>{this.state.errors.global}</p>
            <form>
              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <input
                    onChange={e =>
                      this.setState({
                        user: { ...this.state.user, username: e.target.value },
                      })
                    }
                    value={this.state.user.username}
                    id="username"
                    type="text"
                    className="validate"
                  />
                  <label className="username">username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col m12 s12 l12">
                  <input
                    onChange={e =>
                      this.setState({
                        user: { ...this.state.user, password: e.target.value },
                      })
                    }
                    value={this.state.user.password}
                    id="password"
                    type="password"
                    className="validate"
                  />
                  <label className="password">Password</label>
                </div>
              </div>
              <div className="row" />
              <input
                type="submit"
                className="btn btn-large blue right"
                value="Sign In"
                onClick={(e) => {
                  e.preventDefault();
                  this.signin();
                }}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
	signinRequest: PropTypes.func.isRequired,
	userdata: PropTypes.object.isRequired,
	access_token: PropTypes.required.isRequired,
	events: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
}

const mapDispatchToProps = dispatch => ({
	signinRequest: user => dispatch(signinRequest(user)),
})

function mapStateToProps(state) {
  const { user } = state;
  return {
    userdata: user.userdata,
    access_token: user.access_token,
    events: user.events,
    errors: user.errors,
    authenticated: user.authenticated,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

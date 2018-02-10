import React, { Component } from "react";
import { connect } from 'react-redux';
import { signinUser } from '../../store/action-creators';
import { log } from '../ui/log';
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
			}
		}
	}

	signin() {
		const username = this.state.user.username || '';
		const password = this.state.user.password || '';
		
		if (username.trim() === '' || password.trim() === '') {
			this.setState({ errors: { ...this.state.errors, global: 'Invalid username or password'}});
			return;
		}
		return this.props.dispatch(signinUser(this.state.user));
	}
	componentWillReceiveProps(props) {
		const { userdata, events, errors, history } = props;

		if (events.isSignedin) {
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
											onChange={e => this.setState({ user: { ...this.state.user, username: e.target.value } })}
											value={this.state.user.username}
											id="username" type="text" className="validate" />
                    <label className="username">username</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col m12 s12 l12">
                    <input
											onChange={e => this.setState({ user: { ...this.state.user, password: e.target.value } })}
											value={this.state.user.password}
											id="password" type="password" className="validate" />
                    <label className="password">Password</label>
                  </div>
                </div>
                <div className="row" />
                <input
                  type="submit"
                  className="btn btn-large blue right"
                  value="Sign In"
									onClick={e => {
										e.preventDefault();
										this.signin()
									}}
                />
              </form>
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
	const { user } = state;
	return {
		userdata: user.userdata,
		events: user.events,
		errors: user.errors,
	}
}

export default connect(mapStateToProps)(Signin);

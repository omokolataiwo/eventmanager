import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NigerianStateComponent } from '../ui/NigerianStateComponent';
import { SignupGuestUser } from './../../store/actions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      address: '',
      state: '',
      email: '',
      username: '',
      password: '',
      repassword: '',
    };
    this.handleSelectState = this.handleSelectState.bind(this);
  }
  handleSelectState(value) {
    this.setState({ state: value });
  }
  handleUnique(field, value) {
    console.log(this.state.first_name);
  }
  render() {
    return (
      <div className="main-wrapper">
        <div className="container small-container">
          <div className="row card register">
            <div className="col s12 m12 l12">
              <h5>REGISTER</h5>
              <form>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="first_name"
                      type="text"
                      className="validate"
                      value={this.state.first_name}
                      onChange={e => this.setState({ first_name: e.target.value })}
                    />
                    <label htmlFor="first_name">First Name</label>
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="last_name"
                      type="text"
                      className="validate"
                      value={this.state.last_name}
                      onChange={e => this.setState({ last_name: e.target.value })}
                    />
                    <label htmlFor="last_name">Last Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="address"
                      type="text"
                      className="validate"
                      value={this.state.address}
                    />
                    <label htmlFor="address">Address</label>
                  </div>
                  <NigerianStateComponent change={this.handleSelectState} />
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="email_address"
                      type="text"
                      className="validate"
                      value={this.state.email}
                    />
                    <label htmlFor="email_address">Email Address</label>
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="username"
                      type="text"
                      className="validate"
                      value={this.state.username}
                      onBlur={e => this.handleUnique(e.target.value)}
                    />
                    <label htmlFor="username">username</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="password"
                      type="password"
                      className="validate"
                      value={this.state.password}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="repassword"
                      type="password"
                      className="validate"
                      value={this.state.repassword}
                    />
                    <label htmlFor="repassword">Retype Password</label>
                  </div>
                </div>
                <div className="row" />
                <input type="submit" className="btn btn-large blue" value="Register" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Signup);

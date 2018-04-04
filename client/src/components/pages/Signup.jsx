import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validate } from 'validate.js';
import { NigerianStateComponent } from '../ui/NigerianStateComponent';
import { SelectComponent } from '../ui/SelectComponent';
import { Error } from '../ui/Error';
import createUserRequest from '../../store/actions/action_creators/createUserRequest';
import { ACCOUNT_TYPE_MEMBER, ACCOUNT_TYPE_ADMIN } from '../../store/consts';
import { SIGNUP_USER } from '../../store/actions/types';
import { SIGNUP_VALIDATION_RULES } from '../ui/consts';
import fakeUser from '../ui/faker/user';

import * as route from '../../libs/route';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null,
      address: null,
      state: null,
      phonenumber: null,
      email: null,
      username: null,
      password: null,
      repassword: null,
      role: ACCOUNT_TYPE_MEMBER,
      errors: {
        firstname: null,
        lastname: null,
        address: null,
        state: null,
        phonenumber: null,
        email: null,
        username: null,
        password: null,
        repassword: null,
      },
      events: {},
    };
    this.handleSelectState = this.handleSelectState.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
  }
  resetErrors(callback) {
    const err = {};

    for (const error in this.state.errors) {
      err[error] = null;
    }
    const errors = Object.assign({}, { ...this.state.errors }, err);
    this.setState({ errors }, callback);
  }

  registerUser(e) {
    e.preventDefault();

    this.resetErrors(() => {
      const errorMsg = validate(this.state, SIGNUP_VALIDATION_RULES);
      if (errorMsg !== undefined) {
        const errors = Object.assign({}, { ...this.state.errors }, errorMsg);
        this.setState({ errors });
        return;
      }
      this.props.createUser(this.state);
    });
  }
  handleSelectState(value) {
    this.setState({ state: value });
  }
  handleChangeRole(value) {
    this.setState({ role: value });
  }
  componentWillMount() {
    this.setState({ ...fakeUser() });

    const { authenticated, history } = this.props;
    if (authenticated) {
      route.push('/signout', history.push);
    }
  }
  componentWillReceiveProps(props) {
    const { errors, history } = props;
    let { events } = props;

    if (events.signup === SIGNUP_USER) {
      localStorage.setItem('newSignup', true);
      return route.push('/signin', history.push);
    }

    events = Object.assign({}, this.state.events, { ...events });
    this.setState({ events });
    return this.setState({ errors });
  }
  validate(field, value, objectMode) {
    const errors = { ...this.state.errors };
    let errorMsg = validate(value, { [field]: SIGNUP_VALIDATION_RULES[field] });

    errorMsg = !errorMsg || errorMsg[field];
    errors[field] = Array.isArray(errorMsg) ? errorMsg[0] : errorMsg;
    this.setState({ errors });
  }
  render() {
    return (
      <div className="container small-container">
        <div className="row card">
          <div className="col s12 m12 l12">
            <h5>CREATE ACCOUNT</h5>
            <form>
              <Error message={this.state.errors.global}/>
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <input
                    id="firstname"
                    type="text"
                    className="validate"
                    value={this.state.firstname}
                    onChange={e => this.setState({ firstname: e.target.value })}
                    onBlur={e => this.validate('firstname', { firstname: e.target.value })}
                  />
                  <label htmlFor="firstname">First Name</label>
                  <Error message={this.state.errors.firstname} />
                </div>
                <div className="input-field col s12 m6 l6">
                  <input
                    id="lastname"
                    type="text"
                    className="validate"
                    value={this.state.lastname}
                    onBlur={e => this.validate('lastname', { lastname: e.target.value })}
                    onChange={e => this.setState({ lastname: e.target.value })}
                  />
                  <label htmlFor="lastname">Last Name</label>
                  <Error message={this.state.errors.lastname} />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <input
                    id="address"
                    type="text"
                    className="validate"
                    value={this.state.address}
                    onChange={e => this.setState({ address: e.target.value })}
                    onBlur={e => this.validate('address', { address: e.target.value })}
                  />
                  <label htmlFor="address">Address</label>
                  <Error message={this.state.errors.address} />
                </div>
                <NigerianStateComponent
                  errorMessage={this.state.errors.state}
                  change={this.handleSelectState}
                />
              </div>
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <input
                    id="phonenumber"
                    type="text"
                    className="validate"
                    value={this.state.phonenumber}
                    onChange={e => this.setState({ phonenumber: e.target.value })}
                    onBlur={e =>
                      this.validate('phonenumber', {
                        phonenumber: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="phonenumber">Phone Number</label>
                  <Error message={this.state.errors.phonenumber} />
                </div>
                <div className="input-field col s12 m6 l6">
                  <input
                    id="email_address"
                    type="text"
                    className="validate"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    onBlur={e => this.validate('email', { email: e.target.value })}
                  />
                  <label htmlFor="email_address">Email Address</label>
                  <Error message={this.state.errors.email} />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <input
                    id="username"
                    type="text"
                    className="validate"
                    value={this.state.username}
                    onChange={e => this.setState({ username: e.target.value })}
                    onBlur={e => this.validate('username', { username: e.target.value })}
                  />
                  <label htmlFor="username">username</label>
                  <Error message={this.state.errors.username} />
                </div>
                <div className="input-field col s12 m6 l6">
                  <SelectComponent
                    default={ACCOUNT_TYPE_MEMBER}
                    id="role"
                    change={this.handleChangeRole}
                    options={
                      new Map([
                        [ACCOUNT_TYPE_MEMBER, 'Regular'],
                        [ACCOUNT_TYPE_ADMIN, 'Center Owner'],
                      ])
                    }
                    label="Account Type"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    onBlur={(e) => {
                      this.validate('password', { password: e.target.value });
                      /*
											if (this.state.repassword !== '') {
											  this.validate('repassword', { password:this.state.password, repassword: this.state.repassword });
												} */
                    }}
                  />
                  <label htmlFor="password">Password</label>
                  <Error message={this.state.errors.password} />
                </div>
                <div className="input-field col s12 m6 l6">
                  <input
                    id="repassword"
                    type="password"
                    className="validate"
                    value={this.state.repassword}
                    onChange={e => this.setState({ repassword: e.target.value })}
                    onBlur={e =>
                      this.validate('repassword', {
                        password: this.state.password,
                        repassword: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="repassword">Retype Password</label>
                  <Error message={this.state.errors.repassword} />
                </div>
              </div>
              <div className="row" />
              <button onClick={e => this.registerUser(e)} className="btn btn-large blue">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired,
  userdata: PropTypes.shape({}).isRequired,
  events: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    userdata: user.userdata,
    events: user.events,
    errors: user.errors,
    authenticated: user.authenticated,
  };
};

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(createUserRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

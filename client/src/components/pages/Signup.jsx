import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { validate } from 'validate.js';

import { ACCOUNT_TYPE_MEMBER, ACCOUNT_TYPE_ADMIN } from '../../consts';
import SIGNUP_VALIDATION_RULES from '../../validators/signup';
import { SIGNUP_USER } from '../../types';

import createUserRequest from '../../actions/createUserRequest';
import Error from '../containers/Error';
import InputField from '../containers/forms/InputField';
import SelectComponent from '../containers/forms/SelectComponent';

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape().isRequired,
  errors: PropTypes.shape().isRequired,
  events: PropTypes.shape().isRequired,
  createUserRequest: PropTypes.func.isRequired
};
/**
 * Sign up component
 *
 * @class Signup
 * @extends {React.Component}
 */
export class Signup extends React.Component {
  /**
   * Sign up component
   *
   * @param {object} props - React/Redux props
   * @class Signup
   * @extends {React.Component}
   */
  constructor(props) {
    super(props);
    this.state = {
      userdata: {
        firstName: null,
        lastName: null,
        phoneNumber: null,
        email: null,
        username: null,
        password: null,
        matchPassword: null,
        role: ACCOUNT_TYPE_MEMBER
      },
      errors: {
        firstName: [],
        lastName: [],
        role: [],
        phoneNumber: [],
        email: [],
        username: [],
        password: [],
        matchPassword: [],
        signup: []
      },
      events: {}
    };

    this.handleFormFieldChanged = this.handleFormFieldChanged.bind(this);
  }

  /**
   * Check if user has already signed in
   *
   * @return {void}
   */
  componentWillMount() {
    const { authenticated, history } = this.props;
    if (authenticated) {
      history.push('/signout');
    }
  }
  /**
   * Update application state
   *
   * @param {object} props - Redux state
   * @returns {void}
   */
  componentWillReceiveProps(props) {
    const { errors, history } = props;
    let { events } = props;

    if (events.signup === SIGNUP_USER) {
      localStorage.setItem('newSignup', true);
      return history.push('/signin');
    }

    this.setState({ events: { ...this.state.events, ...events }, errors });
  }

  /**
   * Clear form fields error message before making request to backend
   *
   * @param {object} callback - action to be taken when form error is cleared
   * @return {void}
   */
  resetErrors(callback) {
    const err = {};

    Object.keys(this.state.errors).map(field => {
      err[field] = [];
      return field;
    });

    const errors = Object.assign({}, { ...this.state.errors }, err);
    this.setState({ errors }, callback);
  }

  /**
   * Signup new user
   *
   * @param {object} event -form event
   * @return {void}
   */
  registerUser(event) {
    event.preventDefault();

    // Clear error in case a field had error before and it is corrected
    this.resetErrors(() => {
      const errorMsg = validate(this.state.userdata, SIGNUP_VALIDATION_RULES);
      if (errorMsg !== undefined) {
        const errors = Object.assign({}, { ...this.state.errors }, errorMsg);
        this.setState({ errors });
        return;
      }
      this.props.createUserRequest(this.state.userdata);
    });
  }

  /**
   * Method changes the property of user object in state
   *
   * @param {object} event - DOM object of changed element
   *
   * @returns {void}
   */
  handleFormFieldChanged(event) {
    const { value, id } = event.target;
    this.setState({ userdata: { ...this.state.userdata, [id]: value } });

    // match password and password, it is a special case validation
    // it requires to fields
    if (id === 'matchPassword') {
      return this.validate(id, {
        password: this.state.userdata.password,
        [id]: value
      });
    }

    this.validate(id, { [id]: value });
  }
  /**
   * Validate form input
   *
   * @param {string} field - field name in state
   * @param {string} value - input value
   * @return {void}
   */
  validate(field, value) {
    let errorMsg = validate(value, { [field]: SIGNUP_VALIDATION_RULES[field] });
    let error = [];
    if (errorMsg !== undefined) error = errorMsg[field];

    this.setState({
      errors: { ...this.state.errors, [field]: error }
    });
  }

  /**
   * Renders signup page
   * @return {object} - JSX object
   */
  render() {
    return (
      <div className="container container-medium signup">
        <div className="row card">
          <div className="col s12 m12 l12">
            <h5>
              <i className="material-icons left">person</i>
              CREATE ACCOUNT
            </h5>
            <form>
              <Error messages={this.state.errors.signup} />
              <div className="row">
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="firstName"
                  type="text"
                  title="First Name"
                  width="6"
                  errorMessage={this.state.errors.firstName}
                />
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="lastName"
                  type="text"
                  title="Last Name"
                  width="6"
                  errorMessage={this.state.errors.lastName}
                />
              </div>

              <div className="row">
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="phoneNumber"
                  type="text"
                  title="Phone Number"
                  width="6"
                  errorMessage={this.state.errors.phoneNumber}
                />

                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="email"
                  type="text"
                  title="Email Address"
                  width="6"
                  errorMessage={this.state.errors.email}
                />
              </div>

              <div className="row">
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="username"
                  type="text"
                  title="Username"
                  width="6"
                  errorMessage={this.state.errors.username}
                />

                <SelectComponent
                  default={this.state.userdata.role}
                  id="role"
                  change={this.handleFormFieldChanged}
                  options={[
                    [ACCOUNT_TYPE_MEMBER, 'Regular'],
                    [ACCOUNT_TYPE_ADMIN, 'Center Owner']
                  ]}
                  label="Membership Type"
                  width="6"
                />
                <Error messages={this.state.errors.role} />
              </div>

              <div className="row">
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="password"
                  type="password"
                  title="Password"
                  width="6"
                  errorMessage={this.state.errors.password}
                />

                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="matchPassword"
                  type="password"
                  title="Retype Password"
                  width="6"
                  errorMessage={this.state.errors.matchPassword}
                />
              </div>
              <button
                onClick={e => this.registerUser(e)}
                className="btn btn-large blue"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = propTypes;

/**
 * Map to properties of component
 *
 * @param {object} state - The redux state
 * @returns {object} - Extracted properties
 */
const mapStateToProps = state => {
  const { events, errors, authenticated } = state.user;
  return { events, errors, authenticated };
};

export default connect(mapStateToProps, { createUserRequest })(Signup);

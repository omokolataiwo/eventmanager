import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { validate } from 'validate.js';
import toastr from 'toastr';
import SIGNUP_VALIDATION_RULES from '../../validators/signup';

import updateUserRequest from '../../actions/updateUserRequest';
import Error from '../containers/Error';
import InputField from '../containers/forms/InputField';
import { UPDATED_USER, RESET_UPDATE_STATE } from '../../types';

const propTypes = {
  errors: PropTypes.shape().isRequired,
  events: PropTypes.shape().isRequired,
  userdata: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  updateUserRequest: PropTypes.func.isRequired,
  resetUpdateState: PropTypes.func.isRequired
};
/**
 * User profile component
 *
 * @class Profile
 * @extends {React.Component}
 */
class Profile extends React.Component {
  /**
   * Profile component
   *
   * @param {object} props - React/Redux props
   * @class Profile
   * @extends {React.Component}
   */
  constructor(props) {
    super(props);
    this.state = {
      userdata: {
        firstName: null,
        lastName: null,
        phoneNumber: null,
        email: null
      },
      errors: {
        firstName: [],
        lastName: [],
        role: [],
        phoneNumber: [],
        email: [],
        update: []
      },
      events: {}
    };

    this.handleFormFieldChanged = this.handleFormFieldChanged.bind(this);
  }
  /**
   * Set status with userdata
   *
   * @returns {void}
   * @memberof Profile
   */
  componentWillMount() {
    const { userdata } = this.props;

    this.setState({ userdata });
  }

  /**
   * Update application state
   *
   * @param {object} props - Redux state
   * @returns {void}
   */
  componentWillReceiveProps(props) {
    const { errors, events, resetUpdateState } = props;

    if (events.updateUser === UPDATED_USER) {
      resetUpdateState();
      toastr.options = {
        positionClass: 'toast-top-full-width',
        showDuration: '300',
        hideDuration: '2000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      };
      toastr.success('Profile Updated!');
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

    Object.keys(this.state.errors).map((field) => {
      err[field] = [];
      return field;
    });

    const errors = Object.assign({}, { ...this.state.errors }, err);
    this.setState({ errors }, callback);
  }

  /**
   * Update user's record
   *
   * @param {object} event -form event
   * @return {void}
   */
  updateUser(event) {
    event.preventDefault();

    // Clear error in case a field had error before and it is corrected
    this.resetErrors(() => {
      const errorMsg = validate(this.state.userdata, SIGNUP_VALIDATION_RULES);
      if (errorMsg !== undefined) {
        const errors = Object.assign({}, { ...this.state.errors }, errorMsg);
        this.setState({ errors });
        return;
      }
      this.props.updateUserRequest(this.state.userdata);
    });
  }

  /**
   * Method changes the property of user object in state
   *
   * @param {object} e - DOM object of changed element
   *
   * @returns {void}
   */
  handleFormFieldChanged(e) {
    const { value, id } = e.target;
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
    const errorMsg = validate(value, {
      [field]: SIGNUP_VALIDATION_RULES[field]
    });
    let error = [];
    if (errorMsg !== undefined) error = errorMsg[field];

    this.setState({
      errors: { ...this.state.errors, [field]: error }
    });
  }

  /**
   * Renders page
   * @return {object} - JSX object
   */
  render() {
    return (
      <div className="container small-container">
        <div className="row card">
          <div className="col s12 m12 l12">
            <h5>UPDATE PROFILE</h5>
            <form>
              <Error messages={this.state.errors.update} />
              <div className="row">
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="firstName"
                  type="text"
                  title="First Name"
                  width="6"
                  errorMessage={this.state.errors.firstName}
                  defaultValue={this.state.userdata.firstName}
                />
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="lastName"
                  type="text"
                  title="Last Name"
                  width="6"
                  errorMessage={this.state.errors.lastName}
                  defaultValue={this.state.userdata.lastName}
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
                  defaultValue={this.state.userdata.phoneNumber}
                />

                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="email"
                  type="text"
                  title="Email Address"
                  width="6"
                  errorMessage={this.state.errors.email}
                  defaultValue={this.state.userdata.email}
                />
              </div>
              <button
                onClick={e => this.updateUser(e)}
                className="btn btn-large blue"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = propTypes;

/**
 * Map to properties of component
 *
 * @param {object} state - The redux state
 * @returns {object} - Extracted properties
 */
const mapStateToProps = (state) => {
  const { userdata, events, errors } = state.user;

  return {
    userdata,
    events,
    errors
  };
};

export default connect(mapStateToProps, {
  updateUserRequest,
  resetUpdateState: () => ({ type: RESET_UPDATE_STATE })
})(Profile);

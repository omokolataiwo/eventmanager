import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Error from '../containers/Error';
import InputField from '../containers/forms/InputField';
import getPath from '../../utils/getPath';
import { SIGNIN_USER } from '../../types';
import signinRequest from '../../actions/signinRequest';

const propTypes = {
  userdata: PropTypes.shape().isRequired,
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  events: PropTypes.shape().isRequired,
  errors: PropTypes.shape().isRequired,
  signinRequest: PropTypes.func.isRequired
};

/**
 * Sign in component
 *
 * @class Signin
 * @extends {React.Component}
 */
class Signin extends React.Component {
  /**
   * Sign in constructor
   * @param {string} props -The application state
   * @extends {React.Component}
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: ''
      },
      errors: {
        signin: []
      }
    };
    this.handleFormFieldChanged = this.handleFormFieldChanged.bind(this);
  }

  /**
   * Check if user is authenticated and redirect appropriately
   *
   * @returns {void}
   */
  componentWillMount() {
    const { userdata, authenticated, history } = this.props;
    if (authenticated) {
      return history.push(getPath(userdata.role));
    }
  }

  /**
   * Display toaster when user just signed up
   *
   * @returns {void}
   */
  componentDidMount() {
    if (localStorage.getItem('newSignup')) {
      toastr.options = {
        positionClass: 'toast-top-full-width',
        showDuration: '300',
        hideDuration: '2000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      };
      toastr.success('Account Created Successfully.');
      localStorage.removeItem('newSignup');
    }
  }

  /**
   * Prevent signed in user
   *
   * @param {object} props - state of the object
   * @returns {void}
   */
  componentWillReceiveProps(props) {
    const {
      userdata, events, errors, history
    } = props;

    if (events.signin === SIGNIN_USER) {
      return history.push(getPath(userdata.role));
    }
    this.setState({ errors });
  }
  /**
   * Sign in user
   *@param {object} event - DOM event
   * @returns {void}
   */
  signin(event) {
    const username = this.state.user.username || '';
    const password = this.state.user.password || '';

    if (username.trim() === '' || password.trim() === '') {
      this.setState({
        errors: {
          ...this.state.errors,
          signin: ['Invalid username or password']
        }
      });
      return;
    }
    this.props.signinRequest(this.state.user);
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
    this.setState({ user: { ...this.state.user, [id]: value } });
  }
  /**
   * Rendered the Sign in form
   *
   * @returns {object} - JSX object
   *
   * @memberof Signin
   */
  render() {
    return (
      <div className="container container-small">
        <div className="row card signin-container">
          <div className="col s12 m12 l12">
            <h5>
              <i className="material-icons">person_pin</i> SIGN IN
              <Error id="signin" messages={this.state.errors.signin} />
            </h5>
            <form>
              <div className="row">
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="username"
                  type="text"
                  title="Username"
                  width="12"
                />
              </div>
              <div className="row">
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="password"
                  type="password"
                  title="Password"
                  width="12"
                />
              </div>
              <div className="row" />
              <input
                type="submit"
                className="btn btn-large blue right signinBtn"
                value="Sign In"
                onClick={e => {
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

Signin.propTypes = propTypes;
/**
 * Map state to properties of component
 *
 * @param {object} state - The redux state
 * @returns {object} - Extracted properties
 */
const mapStateToProps = state => {
  const {
    userdata, events, errors, authenticated
  } = state.user;

  return {
    userdata,
    events,
    errors,
    authenticated
  };
};
export default connect(mapStateToProps, { signinRequest })(Signin);

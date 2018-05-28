import React from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Index from './Index';
import Profile from './Profile';
import Event from './Event';
import { addFlash } from '../../utils/flash';
import logo from '../../images/logo.png';
import { ACCOUNT_TYPE_MEMBER } from '../../consts';

const propTypes = {
  userdata: PropTypes.shape().isRequired,
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  accessToken: PropTypes.string.isRequired
};

/**
 * User Component
 *
 * @class User
 * @extends {React.Component}
 */
export class User extends React.Component {
  /**
   * Creates an instance of User.
   *
   * @param {object} props React properties
   * @memberof User
   */
  constructor(props) {
    super(props);
    this.state = { authorized: true };
  }
  /**
   * Check if the user is auuthorised
   *
   * @returns {void}
   * @memberof User
   */
  componentWillMount() {
    const {
      userdata, accessToken, authenticated, history
    } = this.props;

    if (
      !authenticated ||
      userdata.role !== ACCOUNT_TYPE_MEMBER ||
      !accessToken
    ) {
      toastr.options = {
        positionClass: 'toast-top-full-width',
        showDuration: '300',
        hideDuration: '2000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      };
      toastr.error('Please sign in as a user.');

      this.setState({ authorized: false });
      addFlash('saveRoute', this.props.location.pathname);
      history.push('/signin');
    }
  }

  /**
   * Renders the appropriate component
   *
   * @returns {object} - JSX DOM
   * @memberof User
   */
  render() {
    if (!this.state.authorized) return null;
    return (
      <div className="page-wrap">
        <header className="gradient-blue">
          <div className="top-head">
            <div className="container">
              <div className="acc-wrap">
                <div className="login-container dashboard">
                  <Link to="/user">
                    <span className="material-icons left">dashboard</span>DASH
                    BOARD
                  </Link>
                </div>
                <div className="login-container create">
                  <Link to="/user/event/create">
                    <span className="material-icons left">add</span>CREATE
                  </Link>
                </div>
                <div className="login-container profile">
                  <Link to="/user/profile">
                    <span className="material-icons left">face</span>PROFILE
                  </Link>
                </div>

                <div className="login-container">
                  <Link to="/signout">LOG OUT</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-section">
            <div className="container">
              <div className="row margin_0">
                <div className="col s12 m4 l4">
                  <h3>
                    <Link to="/">
                      <img src={logo} alt="Logo" />
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="main-wrapper">
          <Switch>
            <Route path={`${this.props.match.path}`} exact component={Index} />
            <Route path={`${this.props.match.path}/event`} component={Event} />
            <Route
              path={`${this.props.match.path}/profile`}
              component={Profile}
            />
            <Redirect to={`${this.props.match.path}`} />
          </Switch>
        </main>

        <footer className="page-footer blue">
          <div className="footer-copyright">
            <div className="container">&copy; 2018 Copyright</div>
          </div>
        </footer>
      </div>
    );
  }
}

User.propTypes = propTypes;

export default connect(state => {
  const { authenticated, userdata, accessToken } = state.user;
  return {
    authenticated,
    userdata,
    accessToken
  };
})(User);

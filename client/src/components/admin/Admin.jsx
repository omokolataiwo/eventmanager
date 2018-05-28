import React from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Index from './Index';
import Center from './Center';
import Bookings from './Bookings';
import { ACCOUNT_TYPE_ADMIN } from '../../consts';

import logo from '../../images/logo.png';

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  userdata: PropTypes.shape({ role: PropTypes.number.isRequired }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired
};

/**
 * Admin Component - Base component for all admin rout
 *
 * @class Admin
 * @extends {React.Component}
 */
export class Admin extends React.Component {
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
   * Checks if user is authenticated
   *
   * @returns {void}
   * @memberof Admin
   */
  componentWillMount() {
    const { authenticated, userdata, history } = this.props;

    if (!authenticated || userdata.role !== ACCOUNT_TYPE_ADMIN) {
      toastr.options = {
        positionClass: 'toast-top-full-width',
        showDuration: '300',
        hideDuration: '2000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      };
      toastr.error('Please sign in.');
      this.setState({ authorized: false });
      history.push('/signin');
    }
  }
  /**
   * Renders component
   *
   *
   * @returns {object} JSX DOM object
   * @memberof Admin
   */
  render() {
    if (!this.state.authorized) return null;
    return (
      <div className="page-wrap">
        <header className="gradient-blue">
          <div className="top-head">
            <div className="container">
              <div className="acc-wrap">
                <div className="login-container">
                  <Link to="/admin">
                    <span className="material-icons left">dashboard</span>DASH
                    BOARD
                  </Link>
                </div>
                <div className="login-container">
                  <Link to="/admin/center/create">
                    <span className="material-icons left create">add</span>CREATE
                  </Link>
                </div>
                <div className="login-container">
                  <Link to="/admin/bookings">
                    <span className="material-icons left">event</span>BOOKINGS
                  </Link>
                </div>
                <div className="login-container centers">
                  <Link to="/admin/center">
                    <span className="material-icons left">explore</span>CENTERS
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
        <main className="main-wrapper admin">
          <Switch>
            <Route path={`${this.props.match.path}`} exact component={Index} />
            <Route
              path={`${this.props.match.path}/center`}
              component={Center}
            />
            <Route
              path={`${this.props.match.path}/bookings`}
              component={Bookings}
            />
            <Redirect to={`${this.props.match.path}`} />
          </Switch>
        </main>

        <footer className="page-footer blue">
          <div className="footer-copyright">
            <div className="container">© 2018 Copyright</div>
          </div>
        </footer>
      </div>
    );
  }
}
Admin.propTypes = propTypes;

export default connect(state => {
  const { authenticated, userdata } = state.user;
  return {
    authenticated,
    userdata
  };
})(Admin);

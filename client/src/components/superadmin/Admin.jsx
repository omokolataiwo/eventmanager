import React from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Index from './Index';

import logo from '../../images/logo.png';

const propTypes = {
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired
};

/**
 * Admin Component - Base component for all admin rout
 *
 * @class Admin
 * @extends {React.Component}
 */
class Admin extends React.Component {
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
  componentWillMount() {}
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

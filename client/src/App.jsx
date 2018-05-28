import React from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Signin from './components/pages/Signin';
import Signout from './components/pages/Signout';
import Center from './components/pages/Center';
import Search from './components/pages/Search';
import Error404 from './components/pages/Error404';
import logo from './images/logo.png';
import getPath from './utils/getPath';
/**
 * Base component for non priviledged pages
 *
 * @returns {object} - JSX DOM
 */
export function App(props) {
  let isSignedInBtn = <Link to="/signin">Sign in</Link>;
  let isSignupBtn = <Link to="/signup">Sign up</Link>;
  if (
    props.user.authenticated &&
    props.user.accessToken &&
    props.user.userdata.role
  ) {
    isSignedInBtn = (
      <Link to={getPath(props.user.userdata.role)}>Dashboard</Link>
    );
    isSignupBtn = <Link to="/signout">Signout</Link>;
  }
  return (
    <div className="page-wrap">
      <header className="gradient-blue">
        <div className="top-head">
          <div className="container">
            <div className="acc-wrap">
              <div className="login-container signin">{isSignedInBtn}</div>
              <div className="login-container signup">{isSignupBtn}</div>
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
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/center/:id" component={Center} />
          <Route path="/search" component={Search} />
          <Route path="/404" component={Error404} />
          <Redirect to="/404" />
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

export default connect(state => {
  const { user } = state;
  return { user };
})(App);

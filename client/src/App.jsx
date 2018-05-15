import React from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Signin from './components/pages/Signin';
import Signout from './components/pages/Signout';
import Center from './components/pages/Center';
import Search from './components/pages/Search';
import Error404 from './components/pages/Error404';
import logo from './images/logo.png';
/**
 * Base component for non priviledged pages
 *
 * @returns {object} - JSX DOM
 */
function App() {
  return (
    <div className="page-wrap">
      <header className="gradient-blue">
        <div className="top-head">
          <div className="container">
            <div className="acc-wrap">
              <div className="login-container signin">
                <Link to="/signin">Sign in</Link>
              </div>
              <div className="login-container signup">
                <Link to="/signup">Sign up</Link>
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

export default App;

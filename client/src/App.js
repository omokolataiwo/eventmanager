import React from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/pages/Home';
import Signup from './components/pages/Signup';
import Signin from './components/pages/Signin';

import logo from './images/logo.png';

function App() {
  return (
    <div className="page-wrap">
      <header className="gradient-blue">
        <div className="top-head">
          <div className="container">
            <div className="acc-wrap">
              <div className="login-container">
                <Link to="/signin">Sign in</Link>
              </div>
              <div className="login-container">
                <Link to="/signup">Register</Link>
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
              <div className="col s12 m8 l8">
                <div className="main_menu_continer">
                  <nav>
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/">About</Link>
                      </li>
                      <li>
                        <Link to="/">How it works</Link>
                      </li>
                      <li>
                        <Link to="/">Contact</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Redirect to="/" />
      </Switch>
      <footer className="page-footer blue">
        <div className="footer-copyright">
          <div className="container">&nbsp; 2017 Copyright</div>
        </div>
      </footer>
    </div>
  );
}

export default App;

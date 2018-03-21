import React from 'react';
import { Redirect, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Index from './Index';
import { Profile } from './Profile';
import { Event } from './Event';

import logo from '../../images/logo.png';
import { ACCOUNT_TYPE_MEMBER } from './../../store/consts';
import * as route from './../../libs/route';

class User extends React.Component {
  componentWillMount() {
    const { userdata, authenticated, history } = this.props;

    if (!authenticated || userdata.role !== ACCOUNT_TYPE_MEMBER) {
      route.push('/signin', history.push);
    }
  }

  render() {
    return (
      <div className="page-wrap">
        <header className="gradient-blue">
          <div className="top-head">
            <div className="container">
              <div className="acc-wrap">
                <div className="login-container">
                  <Link to="/user">
                    <span className="material-icons left">dashboard</span>DASH BOARD
                  </Link>
                </div>
                <div className="login-container">
                  <Link to="/user/event/create">
                    <span className="material-icons left">add</span>CREATE
                  </Link>
                </div>
                <div className="login-container">
                  <Link to="/user/profile">
                    <span className="material-icons left">face</span>PROFILE
                  </Link>
                </div>

                <div className="login-container">
                  <Link to="/logout">LOG OUT</Link>
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
            <Route path={`${this.props.match.path}/center`} component={Profile} />
            <Route path={`${this.props.match.path}/event`} component={Event} />
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

export default connect((state) => {
  const { authenticated, userdata } = state.user;
  return {
    authenticated,
    userdata,
  };
})(User);

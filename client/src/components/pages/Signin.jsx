import React, { Component } from "react";

export class Signin extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <div className="container small-container">
          <div className="row card login">
            <div className="col s12 m12 l12">
              <h5>LOGIN</h5>
              <form>
                <div className="row">
                  <div className="input-field col s12 m12 l12">
                    <input id="username" type="text" className="validate" />
                    <label className="username">username</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col m12 s12 l12">
                    <input id="password" type="password" className="validate" />
                    <label className="password">Password</label>
                  </div>
                </div>
                <div className="row" />
                <input
                  type="submit"
                  className="btn btn-large blue right"
                  value="Sign In"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

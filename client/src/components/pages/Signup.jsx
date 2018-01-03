import React, { Component } from 'react';
import { connect } from 'react-redux';
import { validate } from 'validate.js';
import { NigerianStateComponent } from '../ui/NigerianStateComponent';
import { Error } from '../ui/Error';
import { SignupGuestUser } from './../../store/actions';
import { SIGNUP_VALIDATION_RULES } from '../ui/consts';
import { log } from '../ui/log';


class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      address: '',
      state: '',
      email: '',
      username: '',
      password: '',
      repassword: '',
			errors: {
				first_name: null,
				last_name: null,
				address: null,
				state: null,
				email: null,
				username: null,
				password: null,
				repassword: null,
			}
	
    };
    this.handleSelectState = this.handleSelectState.bind(this);
  }
	resetErrors(callback) {
		let err = {};
		
		for(const error in this.state.errors) {
			err[error] = null;
		}
		let errors = Object.assign({}, {...this.state.errors}, err);
		this.setState({ errors }, callback);
	}
	
	registerUser(e) {
		e.preventDefault();
		this.resetErrors(() => {
			let errorMsg = validate(this.state, SIGNUP_VALIDATION_RULES);

			if (errorMsg !== undefined) {
				let errors = Object.assign({}, {...this.state.errors}, errorMsg);
				this.setState({errors});
				return;
			}
			alert('Move on');
		});
	}
  handleSelectState(value) {
    this.setState({ state: value });
  }
  handleUnique(field, value) {
    console.log(this.state.first_name);
  }
  componentDidMount() {
   //alert(log(this.props.user, 'user'));
  }
	validate(field, value, objectMode) {
		let errors = { ...this.state.errors };
		let errorMsg = validate(value, {[field]: SIGNUP_VALIDATION_RULES[field]});
		
		errorMsg = !errorMsg || errorMsg[field];
		errors[field] = Array.isArray(errorMsg) ? errorMsg[0] : errorMsg;
		this.setState({ errors });
	}
  render() {
    return (
      <div className="main-wrapper">
				<div>{log(this.state)}</div>
        <div className="container small-container">
          <div className="row card register">
            <div className="col s12 m12 l12">
              <h5>REGISTER</h5>
              
	      <form>
                <div className="row">
            <div className="input-field col s6">
                    <input
                      id="first_name"
                      type="text"
                      className="validate"
                      value={this.state.first_name}
        onChange={e => this.setState({ first_name: e.target.value })}
											onBlur={e => this.validate('first_name', { first_name: e.target.value })}
                    />
											<label htmlFor="first_name">First Name</label>
											<Error message={this.state.errors.first_name} />
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="last_name"
                      type="text"
                      className="validate"
                      value={this.state.last_name}
											onBlur={e => this.validate('last_name', { last_name: e.target.value })}
                      onChange={e => this.setState({ last_name: e.target.value })}
                    />
											<label htmlFor="last_name">Last Name</label>
											<Error message={this.state.errors.last_name} />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="address"
                      type="text"
                      className="validate"
											value={this.state.address} onChange={e => this.setState({ address: e.target.value })}
											onBlur={e => this.validate('address', { address: e.target.value })}
                    />
											<label htmlFor="address">Address</label>
											<Error message={this.state.errors.address} />
            </div>
                  <NigerianStateComponent errorMessage={this.state.errors.state} change={this.handleSelectState} />
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="email_address"
                      type="text"
                      className="validate"
        value={this.state.email}
											onChange={e => this.setState({ email: e.target.value })}	onBlur={e => this.validate('email', { email: e.target.value })}
                    />
											<label htmlFor="email_address">Email Address</label>
											<Error message={this.state.errors.email} />
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="username"
                      type="text"
                      className="validate"
        value={this.state.username}
	onChange={e => this.setState({ username: e.target.value })}
                      onBlur={e => this.validate('username', { username: e.target.value })}
                    />
											<label htmlFor="username">username</label>
											<Error message={this.state.errors.username} />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="password"
                      type="password"
                      className="validate"
        value={this.state.password}
											onChange={e => this.setState({ password: e.target.value })} onBlur={e => this.validate('password', { password: e.target.value })}
                    />
											<label htmlFor="password">Password</label>
											<Error message={this.state.errors.password} />
                  </div>
                  <div className="input-field col s6">
                    <input
                      id="repassword"
                      type="password"
                      className="validate"
        value={this.state.repassword}
											onChange={e => this.setState({ repassword: e.target.value })} onBlur={e => this.validate('repassword', { password:this.state.password, repassword: e.target.value })}
                    />
											<label htmlFor="repassword">Retype Password</label>
											<Error message={this.state.errors.repassword} />
                  </div>
                </div>
                <div className="row" />
                <button onClick={(e) => this.registerUser(e)} className="btn btn-large blue">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user,
  };
}


export default connect(mapStateToProps)(Signup);

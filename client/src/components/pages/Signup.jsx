import React, { Component } from "react";
import {NigerianStateComponent} from "../ui/NigerianStateComponent"; 

export class Signup extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    register: {
		state: null,
	    }
	}
	this.handleSelectState = this.handleSelectState.bind(this);
    }
    
    handleSelectState(value) {
	this.setState({register:{state:value}});
    }
  render() {
    return (
     <div className="main-wrapper">
                <div className="container small-container">
                    <div className="row card register">
                        <div className="col s12 m12 l12"> 
                            <h5>REGISTER</h5>
                            <form> 
                                <div className="row"> 
                                    <div className="input-field col s6"> 
                                        <input id="first_name" type="text" className="validate" /> 
                                        <label htmlFor="first_name">First Name</label>                                         
                                    </div>
                                    <div className="input-field col s6"> 
                                        <input id="last_name" type="text" className="validate" /> 
                                        <label htmlFor="last_name">Last Name</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s6"> 
                                        <input id="address" type="text" className="validate" /> 
                                        <label htmlFor="address">Address</label>                                         
                                    </div>
            <NigerianStateComponent change={this.handleSelectState} />
                                      
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s6"> 
            <input id="email_address" type="text" className="validate" /> 
                                        <label htmlFor="email_address">Email Address</label>                                         
                                    </div>
                                    <div className="input-field col s6"> 
                                        <input id="username" type="text" className="validate" /> 
                                        <label htmlFor="username">username</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s6"> 
                                        <input id="password" type="password" className="validate" /> 
                                        <label htmlFor="password">Password</label>                                         
                                    </div>
                                    <div className="input-field col s6"> 
                                        <input id="repassword" type="password" className="validate" /> 
                                        <label htmlFor="repassword">Retype Password</label>                                         
                                    </div>                                     
                                </div>                                 
                                <div className="row"> 
</div>                                 
                                <input type="submit" className="btn btn-large blue" value="Register" /> 
                            </form>                             
                        </div>
                    </div>
                </div>
            </div>             
);
  }
}

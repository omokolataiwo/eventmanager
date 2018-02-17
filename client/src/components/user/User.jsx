import React from 'react';
import { Redirect, Switch, BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Index } from './Index';
import { Profile } from './Profile';
import { Event } from './Event';

import logo from '../../images/logo.png';

class User extends React.Component {
	render(){
		return(
		<div class="page-wrap"> 
            <header class="gradient-blue"> 
                <div class="top-head"> 
                    <div class="container"> 
                        <div class="acc-wrap"> 
                            <div class="login-container"> 
                                <Link to="/user"><span class="material-icons left">dashboard</span>DASH BOARD</Link> 
                            </div>
                            <div class="login-container"> 
                                <Link to="/user/event/create"><span class="material-icons left">add</span>CREATE</Link> 
                            </div>
                            <div class="login-container"> 
                                <Link to="/user/profile"><span class="material-icons left">face</span>PROFILE</Link> 
                            </div>
                              
                            <div class="login-container"> 
                                <Link to="/logout">LOG OUT</Link> 
                            </div>                             
                        </div>                         
                    </div>                     
                </div>
                <div class="menu-section"> 
                    <div class="container"> 
                        <div class="row margin_0"> 
                            <div class="col s12 m4 l4"> 
                                <h3><Link to="/"> 
                                        <img src={logo} alt="Logo" /> 
                                    </Link></h3> 
                            </div>                             
                        </div>                         
                    </div>                     
                </div>                 
            </header>
						<main class="main-wrapper">
						
				<Switch>
					<Route path={`${this.props.match.path}`} exact component={Index} />
					<Route path={`${this.props.match.path}/center`} component={Profile} />
					<Route path={`${this.props.match.path}/event`} component={Event} />
					<Redirect to={`${this.props.match.path}`} />
				</Switch>
			
            </main>
						
            <footer class="page-footer blue"> 
                <div class="footer-copyright"> 
                    <div class="container">© 2018 Copyright
</div>                     
                </div>                 
            </footer>             
        </div>
		)
	}
}

export default connect((state) => {
	const { authenticated, userdata } = state;
	return {
		authenticated: authenticated,
		userdata: userdata,
	}
})(User);

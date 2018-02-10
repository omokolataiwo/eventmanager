import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Index } from './center/Index';
import { Create } from './center/Create';
import { Update } from './center/Update'

export class Center extends React.Component {
	render() {
		return(
				<Switch>
					<Route path={`${this.props.match.path}`} exact component={Index} />
					<Route path={`${this.props.match.path}/create`} component={Create} />
					<Route path={`${this.props.match.path}/update`} component={Update} />
					{/*<Route path={`${this.props.match.path}/centerid/events`} component={Events} /> */}
					<Redirect to='/admin/center' />
				</Switch>
		);
	}
}

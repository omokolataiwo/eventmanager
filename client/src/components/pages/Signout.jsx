import React from 'react';
import { connect } from 'react-redux';
import { signout } from '../../store/action-creators';

class Signout extends React.Component {
	componentWillMount() {
		this.props.dispatch(signout());
	}
	
	render() {
		return (
			<div className="container container-small">
			<div className="row card">
				<h3>Logout, Successfully.</h3>
				</div>
			</div>
		)
	}
}


export default connect((state) => {
	return {};
})(Signout);

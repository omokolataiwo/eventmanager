import React from 'react';

export function Error(props) {
	let errorMessage = null,
			message = props.message;
	
	if (props.all && Array.isArray(message)) {
		message.forEach((m) => { errorMessage += '<span>`{m}`</span>'} )
	}else{
		errorMessage = Array.isArray(message) ? message[0] : message;
	}

	return(
		<div className="error">{errorMessage}</div>
	);
}


import React from 'react'

export class Create extends React.Component {
	render() {
		return (
			<div className="container container-medium card">
                    <div className="row">
                        <div className="col s12 m10 l9">
                            <h5 className="left">REGISTER CENTER</h5> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m11 l11">
                            <form> 
                                <div className="row"> 
                                    <div className="input-field col s6"> 
                                        <input id="center_name" type="text" className="validate"> 
                                        <label for="center_name">Center Name</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s6"> 
                                        <input id="capacity" type="text" className="validate"> 
                                        <label for="capacity">Capacity</label>                                         
                                    </div>
                                    <div className="input-field col s6"> 
                                        <select id="center_category">
                                            <option value="" disabled selected>Select Center Type</option>
                                        </select>
                                        <label>Center Category</label>
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s6"> 
                                        <input id="address" type="text" className="validate"> 
                                        <label for="address">Address</label>                                         
                                    </div>
                                    <div className="input-field col s6"> 
                                        <select id="state">
                                            <option value="" disabled selected>Select State</option>
                                        </select>
                                        <label>Event State</label>
                                    </div>                                     
                                </div>
                                <div className="row">
                                    <div className="input-field col s6 m12 l12"> 
                                        <input id="facilities" type="text" className="validate"> 
                                        <label for="facilities">Center Facilities</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s6"> 
                                        <input id="center_amount" type="text" className="validate"> 
                                        <label for="center_amount">Amount Center (N)</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s12"> 
                                        <textarea id="summary" className="materialize-textarea"></textarea>                                         
                                        <label for="event_summary">Summary</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <h5>Contact Person</h5>
                                    <div className="input-field col s6"> 
                                        <input id="first_name" type="text" className="validate"> 
                                        <label for="first_name">First Name</label>                                         
                                    </div>
                                    <div className="input-field col s6"> 
                                        <input id="last_name" type="text" className="validate"> 
                                        <label for="last_name">Last Name</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s6"> 
                                        <input id="address" type="text" className="validate"> 
                                        <label for="address">Address</label>                                         
                                    </div>
                                    <div className="input-field col s6"> 
                                        <select id="state">
                                            <option value="" disabled selected>Select State</option>
                                        </select>
                                        <label>State</label>
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s6"> 
                                        <input id="phone_number" type="text" className="validate"> 
                                        <label for="phone_number">Phone Number</label>                                         
                                    </div>
                                    <div className="input-field col s6"> 
                                        <input id="email" type="text" className="validate"> 
                                        <label for="email">Email Address</label>                                         
                                    </div>                                     
                                </div>                                 
                                <input type="submit" className="btn btn-large blue right" value="REGISTER CENTER"> 
                            </form>                             
                        </div>
                    </div>
                </div>
		);
	}
}

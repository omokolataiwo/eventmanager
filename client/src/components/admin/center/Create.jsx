import React from 'react';

export class Create extends React.Component {
	render() {
		return (
		 <div className="container container-medium card">
                    <div className="row">
                        <div className="col s12 m10 l9">
                            <h5 className="left">CREATE NEW CENTER</h5> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m11 l11">
                            <form> 
                                <div className="row"> 
                                    <div className="input-field col s12 m6 l6"> 
                                        <input id="center_name" type="text" className="validate" /> 
                                        <label htmlFor="center_name">Center Name</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col  s12 m6 l6"> 
                                        <input id="capacity" type="text" className="validate" /> 
                                        <label htmlFor="capacity">Capacity</label>                                         
                                    </div>
                                    <div className="input-field col  s12 m6 l6"> 
                                        <select id="center_category">
                                            <option value="" disabled selected>Select Center Type</option>
                                        </select>
                                        <label>Center Category</label>
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col  s12 m6 l6"> 
                                        <input id="address" type="text" className="validate" /> 
                                        <label htmlFor="address">Address</label>                                         
                                    </div>
																		<div className="input-field col s12 m6 l6">
																			<select>
																				<option>
																					Select State
																				</option>
																			</select>
																			<label htmlFor="state">State</label>
													</div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12"> 
                                        <input id="facilities" type="text" className="validate" /> 
                                        <label htmlFor="facilities">Center Facilities</label>  
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s12 m6 l6"> 
                                        <input id="center_amount" type="text" className="validate" /> 
                                        <label htmlFor="center_amount">Amount Center (N)</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
        <div className="input-field col s12 m12 l12"> 
                                        <textarea id="details" className="materialize-textarea"></textarea>                                         
                                        <label htmlFor="event_summary">Additional Details</label>                                  
                                    </div>

																		  <div className="input-field col s12 m6 l6">
																			<input type="file" className="validate" id="eventpic" />
                                    </div>                         
                                </div>
                                <div className="row"> 
                                    <h5>Contact Person</h5>
																		<div className="input-field col s12 m12 l12">
																			<input type="checkbox" value="1" name="contact-person" id="contact-person" />
																			<label htmlFor="contact-person">Use my details</label>
																		</div>
																		<div className="input-field col s12 m6 l6"> 
                                        <input id="first_name" type="text" className="validate" /> 
                                        <label htmlFor="first_name">First Name</label>                                         
                                    </div>
                                    <div className="input-field col s12 m6 l6"> 
                                        <input id="last_name" type="text" className="validate" /> 
                                        <label htmlFor="last_name">Last Name</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s12 m6 l6"> 
                                        <input id="phone_number" type="text" className="validate" /> 
                                        <label htmlFor="phone_number">Phone Number</label>                                         
                                    </div>
                                    <div className="input-field col s12 m6 l6"> 
                                        <input id="email" type="text" className="validate" /> 
                                        <label htmlFor="email">Email Address</label>                                         
                                    </div>                                     
                                </div>                                 
                                <input type="submit" className="btn btn-large blue right" value="REGISTER CENTER" /> 
                            </form>                             
                        </div>
                    </div>
                </div>
		);
	}
}

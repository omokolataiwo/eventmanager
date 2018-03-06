import React from 'react';
import $ from 'jquery'

import {SelectComponent} from '../../ui/SelectComponent';
import { STATES, CENTER_TYPE } from '../../ui/consts';

import {log} from '../../ui/log';

export class Create extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: {
				name: 'Heaven Garden',
				capacity: 7000,
				address: 'Taiwo road, Lekki, Lagos',
				amount: 50000,
				facilities: '',
				state: null,
				type: null,
				additionalDetails: 'This for additional',
				useDefaultContact: true,
				contact: {
					first_name: 'Joe',
					last_name: 'Mask',
					phone_number: 803232322323,
					email: 'joemask@mail.com'
				}				
			}
		}
		this.handleStateChanged = this.handleStateChanged.bind(this);
		this.handleCenterTypeChanged = this.handleCenterTypeChanged.bind(this);
	}
	
	handleStateChanged(state) {
				this.setState({	center: Object.assign({}, this.state.center, { state }) });
	}
	handleCenterTypeChanged(type) {
		this.setState({	center: Object.assign({}, this.state.center, { type }) });
	}
		
	componentDidMount() {
		let facilitiesDOM = $('.facilities');
		facilitiesDOM.material_chip({
			placeholder: 'Center Facilities'
		});

		const chipChanged = (e, chip) => {
			let chipFacilities = facilitiesDOM.material_chip('data');
			chipFacilities = Object.keys(chipFacilities).map( (key) => chipFacilities[key]['tag'] ).join(';');
			this.setState({ facilities: chipFacilities });		
		}

		facilitiesDOM.on('chip.add', chipChanged);
		facilitiesDOM.on('chip.delete', chipChanged);
		
	}
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
                                      <input id="center_name" type="text" className="validate" defaultValue={this.state.center.name}  onChange={e => this.setState({center: {...this.state.center, name: e.target.value}})} /> 
                                        <label htmlFor="center_name">Center Name</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col  s12 m6 l6"> 
                                      <input id="capacity" type="text" className="validate" defaultValue={this.state.center.capacity} onChange={e => this.setState({center: {...this.state.center, capacity: e.target.value}})} /> 
                                        <label  htmlFor="capacity">Capacity</label>                                         
                                    </div>
                                    <div className="input-field col  s12 m6 l6"> 
                                        <SelectComponent default={this.state.center.type} id="type" change={this.handleCenterTypeChanged} options={new Map([ ...CENTER_TYPE.map((ctype, i) => [i, ctype]) ])} label="Center Type" />
                                    </div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col  s12 m6 l6"> 
                                        <input id="address" type="text" className="validate" defaultValue={this.state.center.address} onChange={e => this.setState({center: {...this.state.center, address: e.target.value}})} /> 
                                        <label htmlFor="address">Address</label>                                         
                                    </div>
																		<div className="input-field col s12 m6 l6">
																			<SelectComponent default={this.state.center.state} id="state" change={this.handleStateChanged} options={new Map([ ...STATES.map((state, i) => [i, state]) ])} label="State" />
													</div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m12 l12"> 
																			<div className="chips facilities"></div>
																				</div>                                     
                                </div>
                                <div className="row"> 
                                    <div className="input-field col s12 m6 l6"> 
                                        <input id="center_amount" type="text" className="validate" defaultValue={this.state.center.amount} onChange={e => this.setState({center: {...this.state.center, amount: e.target.value}})} /> 
                                        <label htmlFor="center_amount">Amount Center (N)</label>                                         
                                    </div>                                     
                                </div>
                                <div className="row"> 
        <div className="input-field col s12 m12 l12"> 
          <textarea id="details" className="materialize-textarea" onChange={e => this.setState({center: {...this.state.center, additionalDetails: e.target.value}})} >{this.state.center.additionalDetails}</textarea>                                         
                                        <label htmlFor="event_summary">Additional Details</label>                                  
                                    </div>

																		  <div className="input-field col s12 m6 l6">
																			<input type="file" className="validate" id="eventpic" />
                                    </div>                         
                                </div>
                                <div className="row"> 
                                  <h5>Contact Person</h5>
																		<div className="col s12 m12 l12">
	<div class="switch">
    <label>
      <input type="checkbox" checked={this.state.center.useDefaultContact} onChange={e => {this.setState({center: {...this.state.center, useDefaultContact: !this.state.center.useDefaultContact}})}} />
      <span class="lever"></span>
      USE MY DETAILS
    </label>
  </div>
																		</div>
																</div>
		{ !this.state.center.useDefaultContact && 
	<span>																	<div className="row">
																		<div className="input-field col s12 m6 l6"> 
                                        <input id="first_name" type="text" className="validate" defaultValue={this.state.center.contact.first_name} /> 
                                        <label htmlFor="first_name">First Name</label>                                         
                                    </div>
                                    <div className="input-field col s12 m6 l6"> 
                                        <input id="last_name" type="text" className="validate" defaultValue={this.state.center.contact.last_name} /> 
                                        <label htmlFor="last_name">Last Name</label>                                         
                                    </div>                                     
																		</div> 
                                <div className="row"> 
                                    <div className="input-field col s12 m6 l6"> 
                                        <input id="phone_number" type="text" className="validate" defaultValue={this.state.center.contact.phone_number} onChange={e => this.setState({ center: {...this.state.center, contact: {...this.state.center.contact, phone_number: e.target.value}} })} /> 
                                        <label htmlFor="phone_number">Phone Number</label>                                         
                                    </div>
                                    <div className="input-field col s12 m6 l6"> 
                                        <input id="email" type="text" className="validate" defaultValue={this.state.center.contact.email} /> 
                                        <label htmlFor="email">Email Address</label>                                         
                                  </div>                             															</div>
	</span> }
																
                                <input type="submit" className="btn btn-large blue right" value="REGISTER CENTER" />

																				</form>
                        </div>
                    </div>
     </div>

		);
	}
}

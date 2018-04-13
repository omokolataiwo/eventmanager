import React from 'react';

export const ContactPersonForm = props => (
  <span>
    <div className="row">
      <div className="input-field col s12 m6 l6">
        <input
          id="first_name"
          type="text"
          className="validate"
          onChange={e => props.onFieldChange(e.target.value, 'first_name')}
        />
        <label htmlFor="first_name">First Name</label>
      </div>
      <div className="input-field col s12 m6 l6">
        <input
          id="last_name"
          type="text"
          className="validate"
          onChange={e => props.onFieldChange(e.target.value, 'last_name')}
        />
        <label htmlFor="last_name">Last Name</label>
      </div>
    </div>
    <div className="row">
      <div className="input-field col s12 m6 l6">
        <input
          id="phone_number"
          type="text"
          className="validate"
          onChange={e => props.onFieldChange(e.target.value, 'phone_number')}
        />
        <label htmlFor="phone_number">Phone Number</label>
      </div>
      <div className="input-field col s12 m6 l6">
        <input
          id="email"
          type="text"
          className="validate"
          onChange={e => props.onFieldChange(e.target.value, 'email')}
        />
        <label htmlFor="email">Email Address</label>
      </div>
    </div>
  </span>
);
export default ContactPersonForm;

import React from 'react';
import PropTypes from 'prop-types';
import InputField from './forms/InputField';

const propTypes = {
  onFieldChange: PropTypes.func.isRequired
};
/**
 * Create contact form component
 *
 * @param {object} props - React properties
 * @returns {object} - JSX DOM
 */
const ContactPersonForm = ({ onFieldChange, errors }) => (
  <span>
    <div className="row new-contact-form">
      <InputField
        onChange={onFieldChange}
        id="firstName"
        type="text"
        title="First Name"
        width="6"
        errorMessage={errors && errors.firstName}
      />
      <InputField
        onChange={onFieldChange}
        id="lastName"
        type="text"
        title="Last Name"
        width="6"
        errorMessage={errors && errors.lastName}
      />
    </div>
    <div className="row">
      <InputField
        onChange={onFieldChange}
        id="phoneNumber"
        type="text"
        title="Phone Number"
        width="6"
        errorMessage={errors && errors.phoneNumber}
      />
      <InputField
        onChange={onFieldChange}
        id="email"
        type="text"
        title="Email Address"
        width="6"
        errorMessage={errors && errors.email}
      />
    </div>
  </span>
);

ContactPersonForm.propTypes = propTypes;
export default ContactPersonForm;

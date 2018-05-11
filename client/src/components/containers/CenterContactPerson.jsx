import React from 'react';
import PropTypes from 'prop-types';
import SelectComponent from '../containers/forms/SelectComponent';
import ContactPersonForm from '../containers/ContactPersonForm';

const propTypes = {
  newContact: PropTypes.bool.isRequired,
  onNewContactChanged: PropTypes.func.isRequired,
  existingContacts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSelectContactChanged: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  defaultContact: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};
/**
 * Renders contact form base on existing contact details
 *
 * @param {object} props - The properties of the compoent
 * @returns {object} - JSX DOM
 */
const CenterContactPerson = ({
  existingContacts,
  newContact,
  onNewContactChanged,
  onFieldChange,
  onSelectContactChanged,
  defaultContact,
  errors
}) => {
  let contactFormHeader = <span />;
  let contactPersonForm = (
    <SelectComponent
      default={defaultContact}
      id="contactId"
      change={e => onSelectContactChanged(e)}
      options={[
        ...existingContacts.map(existingContact => [
          existingContact.id,
          `${existingContact.firstName} ${existingContact.lastName}`
        ])
      ]}
      label="Select Contact Person"
      width="6"
    />
  );

  // We dont need the switch if there are no existing contacts
  if (existingContacts.length !== 0) {
    contactFormHeader = (
      <div className="col s12 m12 l12">
        <div className="switch">
          <label htmlFor="new-contact">
            <input
              id="new-contact"
              type="checkbox"
              checked={newContact}
              onChange={() => {
                onNewContactChanged();
              }}
            />
            <span className="lever" />
            CREATE NEW CONTACT
          </label>
        </div>
      </div>
    );
  }

  if (existingContacts.length === 0 || newContact) {
    contactPersonForm = (
      <ContactPersonForm onFieldChange={onFieldChange} errors={errors} />
    );
  }

  return (
    <div>
      <div className="row">
        <h5>Contact Person</h5>
        {contactFormHeader}
      </div>
      <div className="row">
        <div className="col s12 l12 m12" />
        {contactPersonForm}
      </div>
    </div>
  );
};

CenterContactPerson.propTypes = propTypes;
export default CenterContactPerson;

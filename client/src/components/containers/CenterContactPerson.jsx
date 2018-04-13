import React from 'react';
import { SelectComponent } from '../containers/forms/SelectComponent';
import { ContactPersonForm } from '../containers/ContactPersonForm';

export const CenterContactPerson = props => {
  let contactFormHeader = <span />;

  if (props.existingContacts.length !== 0) {
    contactFormHeader = (
      <div className="col s12 m12 l12">
        <div className="switch">
          <label htmlFor="new-contact">
            <input
              id="new-contact"
              type="checkbox"
              checked={props.newContact}
              onChange={() => {
                props.onNewContactChanged();
              }}
            />
            <span className="lever" />
            CREATE NEW CONTACT
          </label>
        </div>
      </div>
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
        {!props.existingContacts.length ? (
          <ContactPersonForm onFieldChange={props.onFieldChange} />
        ) : props.newContact ? (
          <ContactPersonForm onFieldChange={props.onFieldChange} />
        ) : (
          <SelectComponent
            default={props.defaultContact}
            id="existing-contact"
            change={e => props.onSelectContactChanged(e)}
            options={
              new Map([
                ...props.existingContacts.map(excontact => [
                  excontact.id,
                  `${excontact.first_name} ${excontact.last_name}`
                ])
              ])
            }
          />
        )}
      </div>
    </div>
  );
};

export default CenterContactPerson;

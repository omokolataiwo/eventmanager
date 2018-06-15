import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import { validate } from 'validate.js';

import {
  createCenterRules,
  contactRules
} from '../../../validators/createCenterRules';

import createCenterRequest from '../../../actions/createCenterRequest';
import getContactPersonRequest from '../../../actions/fetchContactPersonRequest';
import SelectComponent from '../../containers/forms/SelectComponent';
import CenterContactPerson from '../../containers/CenterContactPerson';
import InputField from '../../containers/forms/InputField';
import TextArea from '../../containers/forms/TextArea';
import FileField from '../../containers/forms/FileField';
import Error from '../../containers/Error';
import { STATES, CENTER_TYPE } from '../../../consts';
import { addFlash } from '../../../utils/flash';
import {
  RECEIVED_CENTER_CONTACTS,
  CREATED_NEW_CENTER,
  CREATING_NEW_CENTER_ERROR
} from '../../../types';

const propTypes = {
  createCenterRequest: PropTypes.func.isRequired,
  getContactPersonRequest: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  createErrors: PropTypes.shape().isRequired
};
/**
 * Create center component
 *
 * @class Create
 * @extends {React.Component}
 */
export class Create extends React.Component {
  /**
   * Creates an instance of Create.
   *
   * @param {object} props - React properties
   * @memberof Create
   */
  constructor(props) {
    super(props);
    this.state = {
      center: {
        name: '',
        capacity: null,
        address: '',
        amount: null,
        area: null,
        facilities: '',
        state: 1,
        type: 1,
        image: '',
        contactId: 0,
        newContact: false,
        details: '',
        contact: {
          newContact: {
            firstName: '',
            lastName: '',
            phoneNumber: null,
            email: ''
          },
          existingContacts: []
        }
      },
      errors: {}
    };
    this.handleFormFieldChanged = this.handleFormFieldChanged.bind(this);
    this.handleNewContactChanged = this.handleNewContactChanged.bind(this);
    this.handleContactPersonsFieldChange = this.handleContactPersonsFieldChange.bind(this);
    this.handleImageFieldChanged = this.handleImageFieldChanged.bind(this);
  }

  /**
   * Get all the contacts the center owner has created.
   *
   * @return {void}
   * @memberof Create
   */
  componentWillMount() {
    this.props.getContactPersonRequest();
  }

  /**
   * Initialize materialize components
   *
   * @return {void}
   * @memberof Create
   */
  componentDidMount() {
    const facilitiesDOM = $('.facilities');
    facilitiesDOM.material_chip({
      placeholder: 'Facilities'
    });

    /**
     * Initialize materialize chip component
     *
     * @return {void}
     */
    const chipChanged = () => {
      let facilities = facilitiesDOM.material_chip('data');
      facilities = Object.keys(facilities)
        .map(key => facilities[key].tag)
        .join(',');
      this.setState({ center: { ...this.state.center, facilities } });
    };

    facilitiesDOM.on('chip.add', chipChanged);
    facilitiesDOM.on('chip.delete', chipChanged);
  }
  /**
   * Set state when component receive properties
   *
   * @param {any} props - redux store properties
   * @returns {void}
   * @memberof Create
   */
  componentWillReceiveProps(props) {
    const {
      contactAction,
      createAction,
      createErrors,
      history,
      contacts
    } = props;

    if (contactAction.getCenterContact === RECEIVED_CENTER_CONTACTS) {
      if (contacts.length === 0) {
        this.setState({ center: { ...this.state.center, newContact: true } });
      } else {
        this.setState({
          center: {
            ...this.state.center,
            newContact: false,
            contact: {
              ...this.state.center.contact,
              existingContacts: contacts
            }
          }
        });
      }
    }

    if (createAction.createCenter === CREATED_NEW_CENTER) {
      addFlash('NEW_CENTER_CREATED', true);
      return history.push('/admin/center/completed');
    }

    if (createAction.createCenter === CREATING_NEW_CENTER_ERROR) {
      this.setState({ errors: createErrors });
    }
  }

  /**
   * Toggle the newContact state of the conponent
   *
   * @returns {void}
   * @memberof Create
   */
  handleNewContactChanged() {
    this.setState({
      center: {
        ...this.state.center,
        newContact: !this.state.center.newContact
      }
    });
  }

  /**
   * Change contact person form fields details, works for each element in form contact person form field
   *
   * @param {string} event - title of the field
   * @return {void}
   * @memberof Create
   */
  handleContactPersonsFieldChange(event) {
    const { value, id } = event.target;
    this.setState({
      center: {
        ...this.state.center,
        contact: {
          ...this.state.center.contact,
          newContact: {
            ...this.state.center.contact.newContact,
            [id]: value
          }
        }
      }
    });
    this.validate(id, { [id]: value });
  }

  /**
   * Method changes the property of center object in state
   *
   * @param {object} event - DOM object of changed element
   *
   * @returns {void}
   */
  handleFormFieldChanged(event) {
    const { value, id } = event.target;
    this.setState({ center: { ...this.state.center, [id]: value } });
    this.validate(id, { [id]: value });
  }

  /**
   * Validate form input
   *
   * @param {string} field - field name in state
   * @param {string} value - input value
   * @return {void}
   */
  validate(field, value) {
    const rules = { ...createCenterRules, ...contactRules };

    let errorMsg = validate(value, { [field]: rules[field] });
    let error = [];
    if (errorMsg !== undefined) {
      error = errorMsg[field];
    }
    this.setState({
      errors: { ...this.state.errors, [field]: error }
    });
  }

  /**
   * Method changes the property of center image in state
   *
   * @param {object} event - DOM object of changed element
   *
   * @returns {void}
   */
  handleImageFieldChanged(event) {
    const { files, id } = event.target;
    this.setState({ center: { ...this.state.center, [id]: files[0] } });
  }
  /**
   * Create center, make request to api endpoint
   *
   * @param {any} event - DOM event
   * @returns {void}
   * @memberof Create
   */
  createCenter(event) {
    event.preventDefault();
    const { image } = this.state.center;
    if (!image || (image.type !== 'image/jpeg' && image.type !== 'image/png')) {
      return this.setState({
        errors: {
          ...this.state.errors,
          image: ['Please upload a jpeg/png format image.']
        }
      });
    }

    return this.props.createCenterRequest(this.state.center);
  }

  /**
   * Renders the components DOM
   *
   * @returns {object} - JSX DOM
   * @memberof Create
   */
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
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="name"
                  type="text"
                  title="Center Name"
                  width="6"
                  errorMessage={this.state.errors.name}
                />

                <SelectComponent
                  default={1}
                  id="type"
                  change={this.handleFormFieldChanged}
                  options={[...CENTER_TYPE.map((ctype, i) => [i + 1, ctype])]}
                  label="Center Type"
                  width="6"
                />
              </div>
              <div className="row">
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="address"
                  type="text"
                  title="Address"
                  width="6"
                  errorMessage={this.state.errors.address}
                />
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="area"
                  type="text"
                  title="Area"
                  width="6"
                  errorMessage={this.state.errors.area}
                />
              </div>
              <div className="row">
                <SelectComponent
                  default={1}
                  id="state"
                  change={this.handleFormFieldChanged}
                  options={[...STATES.map((ctype, i) => [i + 1, ctype])]}
                  label="Select State"
                  width="6"
                />
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="capacity"
                  type="text"
                  title="Center Capacity"
                  width="6"
                  errorMessage={this.state.errors.capacity}
                />
              </div>

              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <div className="chips facilities" />
                  <Error messages={this.state.errors.facilities} />
                </div>
              </div>
              <div className="row">
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="amount"
                  type="text"
                  title="Amount"
                  width="6"
                  errorMessage={this.state.errors.amount}
                />
              </div>

              <div className="row">
                <TextArea
                  id="details"
                  width="12"
                  title="Center Description"
                  onChange={this.handleFormFieldChanged}
                />
                <Error messages={this.state.errors.details} />

                <FileField
                  width="12"
                  accept="image/*"
                  id="image"
                  onChange={this.handleImageFieldChanged}
                  errorMessage={this.state.errors.image}
                />
              </div>

              <CenterContactPerson
                newContact={this.state.center.newContact}
                onNewContactChanged={this.handleNewContactChanged}
                existingContacts={this.state.center.contact.existingContacts}
                onSelectContactChanged={this.handleFormFieldChanged}
                onFieldChange={this.handleContactPersonsFieldChange}
                defaultContact={this.state.center.contactid}
                errors={this.state.errors}
              />
              <input
                type="submit"
                className="btn btn-large blue right"
                value="REGISTER CENTER"
                onClick={e => this.createCenter(e)}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = propTypes;

/**
 * Map state to properties of component
 *
 * @param {object} state - The redux state
 * @returns {object} - Extracted properties
 */
const mapStateToProps = state => {
  const { getCenterContact, center } = state;
  return {
    contacts: getCenterContact.contacts,
    contactAction: getCenterContact.action,
    createAction: center.action,
    createErrors: center.errors
  };
};

export default connect(
  mapStateToProps,
  {
    createCenterRequest,
    getContactPersonRequest
  }
)(Create);

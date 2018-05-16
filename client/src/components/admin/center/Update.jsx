import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { validate } from 'validate.js';
import {
  createCenterRules,
  contactRules
} from '../../../validators/createCenterRules';

import updateCenterRequest from '../../../actions/updateCenterRequest';
import getContactPersonRequest from '../../../actions/fetchContactPersonRequest';
import fetchCenterRequest from '../../../actions/fetchCenterRequest';
import reset from '../../../actions/reset';
import SelectComponent from '../../containers/forms/SelectComponent';
import CenterContactPerson from '../../containers/CenterContactPerson';
import InputField from '../../containers/forms/InputField';
import TextArea from '../../containers/forms/TextArea';
import FileField from '../../containers/forms/FileField';
import Error from '../../containers/Error';
import Lever from '../../containers/forms/Lever';
import Preloader from '../../containers/Preloader';
import DynamicChips from '../../containers/forms/DynamicChips';
import { STATES, CENTER_TYPE } from '../../../consts';
import {
  RECEIVED_CENTER_CONTACTS,
  UPDATED_CENTER,
  UPDATING_CENTER_ERROR,
  RESET_FETCHING_CENTER_CONTACTS,
  RECEIVED_CENTER,
  RESET_FETCHING_CENTER,
  RESET_UPDATING_CENTER_STATE,
  FETCHING_CENTER_ERROR,
  FETCHING_CENTER
} from '../../../types';

const propTypes = {
  updateCenterRequest: PropTypes.func.isRequired,
  getContactPersonRequest: PropTypes.func.isRequired,
  fetchCenterRequest: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape().isRequired,
  center: PropTypes.shape().isRequired,
  getCenterAction: PropTypes.shape().isRequired,
  getContactAction: PropTypes.shape().isRequired,
  updateAction: PropTypes.shape().isRequired,
  updateErrors: PropTypes.shape().isRequired,
};
/**
 * Update center component
 *
 * @class Update
 * @extends {React.Component}
 */
class Update extends React.Component {
  /**
   * Updates an instance of Update.
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
        state: 0,
        type: 0,
        image: 'default_center_image.jpeg',
        contactid: 0,
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
    this.handleAvailToggle = this.handleAvailToggle.bind(this);
  }

  /**
   * Get all the contacts the center owner has created.
   *
   * @return {void}
   * @memberof Update
   */
  componentWillMount() {
    this.props.getContactPersonRequest();
    this.props.fetchCenterRequest({ id: this.props.match.params.index }, true);
  }

  /**
   * Update component state
   *
   * @param {object} props New properties
   * @returns {void}
   * @memberof Update
   */
  componentWillReceiveProps(props) {
    const {
      center,
      getCenterAction,
      getContactAction,
      updateAction,
      updateErrors,
      contacts
    } = props;

    if (getContactAction.getCenterContact === RECEIVED_CENTER_CONTACTS) {
      if (contacts.length === 0) {
        this.setState({
          center: {
            ...this.state.center,
            newContact: true
          }
        });
      } else {
        this.setState({
          center: {
            ...this.state.center,
            contact: {
              ...this.state.center.contact,
              existingContacts: contacts
            }
          }
        });
      }
      props.reset(RESET_FETCHING_CENTER_CONTACTS);
    }

    if (getCenterAction.getCenter === RECEIVED_CENTER) {
      props.reset(RESET_FETCHING_CENTER);
      this.setState({ center: { ...this.state.center, ...center.center } });
    }

    if (updateAction.updateCenter === UPDATED_CENTER) {
      toastr.options = {
        positionClass: 'toast-top-full-width',
        showDuration: '300',
        hideDuration: '2000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      };
      toastr.success('Center updated.');

      props.reset(RESET_UPDATING_CENTER_STATE);
    }

    if (updateAction.updateCenter === UPDATING_CENTER_ERROR) {
      this.setState({ errors: updateErrors });
    }
  }

  /**
   * Reset redux state
   *
   * @returns {void}
   * @memberof Update
   */
  componentWillUnmount() {
    this.props.reset(FETCHING_CENTER);
  }

  /**
   * Toggle the newContact state of the conponent
   *
   * @returns {void}
   * @memberof Update
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
   * @memberof Update
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
   * Toggle the availability of a center
   *
   * @returns {void}
   * @memberof Update
   */
  handleAvailToggle() {
    this.setState({
      center: {
        ...this.state.center,
        active: this.state.center.active ? 0 : 1
      }
    });
  }
  /**
   * Update center, make request to api endpoint
   *
   * @param {object} event - DOM event
   * @returns {void}
   * @memberof Create
   */
  updateCenter(event) {
    if (event) event.preventDefault();
    this.props.updateCenterRequest(this.state.center);
  }

  /**
   * Renders the components DOM
   *
   * @returns {object} - JSX DOM
   * @memberof Create
   */
  render() {
    const { getCenter } = this.props.getCenterAction;

    if (getCenter === FETCHING_CENTER) {
      return (
        <div className="preloader">
          <Preloader />
        </div>
      );
    }

    if (getCenter === FETCHING_CENTER_ERROR) {
      this.props.history.push('/404');
      return null;
    }
    return (
      <div className="container container-medium card">
        <div className="row">
          <div className="col s12 m10 l8">
            <h5 className="left">UPDATE CENTER</h5>
          </div>
          <div className="col s12 m4 l4">
            <Lever
              id="center-availability"
              boolValue={this.state.center.active}
              handleToggle={this.handleAvailToggle}
            />
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
                  defaultValue={this.state.center.name}
                />

                <SelectComponent
                  default={this.state.center.type}
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
                  defaultValue={this.state.center.address}
                />
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="area"
                  type="text"
                  title="Area"
                  width="6"
                  errorMessage={this.state.errors.area}
                  defaultValue={this.state.center.area}
                />
              </div>
              <div className="row">
                <SelectComponent
                  default={this.state.center.state}
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
                  defaultValue={this.state.center.capacity}
                />
              </div>

              <DynamicChips
                value={this.state.center.facilities}
                onChange={this.handleFormFieldChanged}
              />
              <div className="row">
                <InputField
                  onChange={this.handleFormFieldChanged}
                  id="amount"
                  type="text"
                  title="Amount"
                  width="6"
                  errorMessage={this.state.errors.amount}
                  defaultValue={this.state.center.amount}
                />
              </div>

              <div className="row">
                <TextArea
                  id="details"
                  width="12"
                  title="Center Description"
                  onChange={this.handleFormFieldChanged}
                  defaultValue={this.state.center.details}
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
                defaultContact={this.state.center.contactId}
                errors={this.state.errors}
              />
              <input
                type="submit"
                className="btn btn-large blue right"
                value="UPDATE NOW"
                onClick={event => this.updateCenter(event)}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Update.propTypes = propTypes;

/**
 * Map state to properties of component
 *
 * @param {object} state - The redux state
 * @returns {object} - Extracted properties
 */
const mapStateToProps = state => {
  const { getCenter, getCenterContact, center } = state;
  return {
    center: getCenter.center,
    getCenterAction: getCenter.action,
    contacts: getCenterContact.contacts,
    getContactAction: getCenterContact.action,
    updateAction: center.action,
    updateErrors: center.errors
  };
};

export default connect(mapStateToProps, {
  updateCenterRequest,
  getContactPersonRequest,
  fetchCenterRequest,
  reset
})(Update);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import fetchAdminCentersRequest from '../../../actions/fetchAdminCentersRequest';
import createCenterRequest from '../../../actions/createCenterRequest';
import getContactPersonRequest from '../../../actions/fetchContactPersonRequest'; // eslint-disable-line
import SelectComponent from '../../containers/forms/SelectComponent';
import CenterContactPerson from '../../containers/CenterContactPerson';
import InputField from '../../containers/forms/InputField';
import TextArea from '../../containers/forms/TextArea';
import FileField from '../../containers/forms/FileField';
import { STATES, CENTER_TYPE } from '../../../consts';
import {
  RECEIVED_CENTER_CONTACTS,
  CREATED_NEW_CENTER,
  CREATING_NEW_CENTER_ERROR
} from '../../../types';

const propTypes = {
  createCenterRequest: PropTypes.func.isRequired,
  getContactPersonRequest: PropTypes.func.isRequired,
  fetchAdminCentersRequest: PropTypes.func.isRequired,
  events: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.shape().isRequired
};
/**
 * Create center component
 *
 * @class Create
 * @extends {React.Component}
 */
class Create extends React.Component {
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
      placeholder: 'Center Facilities'
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
      events, errors, history, contacts
    } = props;

    if (events.getCenterContact === RECEIVED_CENTER_CONTACTS) {
      if (contacts.length === 0) {
        this.setState({ center: { ...this.state.center, newContact: true } });
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
    }

    if (events.createCenter === CREATED_NEW_CENTER) {
      props.fetchAdminCentersRequest();
      localStorage.setItem('newCenterCreated', true);
      return history.push('/admin/center');
    }

    if (events.createCenter === CREATING_NEW_CENTER_ERROR) {
      this.setState({ errors });
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
    this.props.createCenterRequest(this.state.center);
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
                />
              </div>

              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <div className="chips facilities" />
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

                <FileField
                  width="12"
                  accept="image/*"
                  id="image"
                  onChange={this.handleImageFieldChanged}
                />
              </div>

              <CenterContactPerson
                newContact={this.state.center.newContact}
                onNewContactChanged={this.handleNewContactChanged}
                existingContacts={this.state.center.contact.existingContacts}
                onSelectContactChanged={this.handleFormFieldChanged}
                onFieldChange={this.handleContactPersonsFieldChange}
                defaultContact={this.state.center.contactid}
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
  const { contacts, events, errors } = state.center;
  return { contacts, events, errors };
};

export default connect(mapStateToProps, {
  createCenterRequest,
  getContactPersonRequest,
  fetchAdminCentersRequest
})(Create);

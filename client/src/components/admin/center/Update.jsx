import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import updateCenterRequest from '../../../actions/updateCenterRequest';
import getContactPersonRequest from '../../../actions/fetchContactPersonRequest'; // eslint-disable-line
import fetchCenterRequest from '../../../actions/fetchCenterRequest';
import SelectComponent from '../../containers/forms/SelectComponent';
import CenterContactPerson from '../../containers/CenterContactPerson';
import InvalidCenter from '../../containers/InvalidCenter';
import InputField from '../../containers/forms/InputField';
import TextArea from '../../containers/forms/TextArea';
import FileField from '../../containers/forms/FileField';
import { STATES, CENTER_TYPE } from '../../../consts';
import { UPDATED_CENTER, UPDATING_CENTER_ERROR } from '../../../types';

const propTypes = {
  updateCenterRequest: PropTypes.func.isRequired,
  events: PropTypes.shape().isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  centers: PropTypes.arrayOf(PropTypes.shape()).isRequired
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
      errors: {
        invalidCenterID: false
      }
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
   * @memberof Update
   */
  componentWillMount() {
    const {
      events, errors, contacts, centers, match
    } = this.props;

    if (events.createCenter === UPDATED_CENTER) {
      // toastr
    }

    if (events.createCenter === UPDATING_CENTER_ERROR) {
      this.setState({ errors });
    }

    const centerid = match.params.index;
    const center = centers.find(center => center.id === parseInt(centerid, 10));

    if (!center) {
      this.setState({ errors: { invalidCenterID: true } });
      return;
    }

    if (contacts.length === 0) {
      this.setState({ center: { ...this.state.center, ...center, newContact: true } });
    } else {
      this.setState({
        center: {
          ...this.state.center,
          ...center,
          contact: {
            ...this.state.center.contact,
            existingContacts: contacts
          }
        }
      });
    }
  }

  /**
   * Initialize materialize components
   *
   * @return {void}
   * @memberof Update
   */
  componentDidMount() {
    const facilitiesDOM = $('.facilities');
    facilitiesDOM.material_chip({
      placeholder: 'Center Facilities',
      data: this.state.center.facilities
        .split(',')
        .map(facility => ({ tag: facility }))
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
   * Update center, make request to api endpoint
   *
   * @param {any} event - DOM event
   * @returns {void}
   * @memberof Create
   */
  updateCenter(event) {
    event.preventDefault();
    this.props.updateCenterRequest(this.state.center);
  }

  /**
   * Renders the components DOM
   *
   * @returns {object} - JSX DOM
   * @memberof Create
   */
  render() {
    if (this.state.errors.invalidCenterID) return <InvalidCenter />;
    return (
      <div className="container container-medium card">
        <div className="row">
          <div className="col s12 m10 l9">
            <h5 className="left">UPDATE CENTER</h5>
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
  const {
    contacts, events, errors, adminCenters
  } = state.center;
  return {
    contacts,
    events,
    errors,
    centers: adminCenters
  };
};

export default connect(mapStateToProps, {
  updateCenterRequest,
  getContactPersonRequest,
  fetchCenterRequest
})(Update);

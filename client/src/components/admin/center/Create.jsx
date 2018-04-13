import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import createCenterRequest from '../../../actions/createCenterRequest';
import { getContactPersonRequest } from '../../../actions/fetchContactPersonRequest';
import { SelectComponent } from '../../containers/forms/SelectComponent';
import { CenterContactPerson } from '../../containers/CenterContactPerson';
import { STATES, CENTER_TYPE } from '../../../consts';
import fakeCenter from '../../faker/center';
import { RECEIVED_CENTER_CONTACTS, CREATED_NEW_CENTER } from '../../../types';

class Create extends React.Component {
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
        state: -1,
        type: -1,
        image: 'default_center_image.jpeg',
        contactid: -1,
        newContact: false,
        details: '',
        contact: {
          newContact: {
            first_name: '',
            last_name: '',
            phone_number: null,
            email: ''
          },
          existingContacts: []
        }
      }
    };
    this.handleStateChanged = this.handleStateChanged.bind(this);
    this.handleCenterTypeChanged = this.handleCenterTypeChanged.bind(this);
    this.handleContactPersonChanged = this.handleContactPersonChanged.bind(this);
    this.handleNewContactChanged = this.handleNewContactChanged.bind(this);
    this.handleContactPersonsFieldChange = this.handleContactPersonsFieldChange.bind(this);
  }
  componentWillMount() {
    this.setState({ center: { ...fakeCenter() } });
    this.props.getContactPerson(this.props.accessToken);
  }
  componentDidMount() {
    const facilitiesDOM = $('.facilities');
    facilitiesDOM.material_chip({
      placeholder: 'Center Facilities'
    });

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
  componentWillReceiveProps(props) {
    const { events, history, contacts } = props;

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
      localStorage.setItem('newCenterCreated', true);
      return history.push('/admin/center');
    }
  }

  handleContactPersonChanged(contactid) {
    this.setState({ center: { ...this.state.center, contactid } });
  }
  handleNewContactChanged() {
    this.setState({
      center: {
        ...this.state.center,
        newContact: !this.state.center.newContact
      }
    });
  }
  handleStateChanged(state) {
    this.setState({ center: Object.assign({}, this.state.center, { state }) });
  }
  handleCenterTypeChanged(type) {
    this.setState({ center: Object.assign({}, this.state.center, { type }) });
  }
  handleContactPersonsFieldChange(value, field) {
    this.setState({
      center: {
        ...this.state.center,
        contact: {
          ...this.state.center.contact,
          newContact: {
            ...this.state.center.contact.newContact,
            [field]: value
          }
        }
      }
    });
  }
  createCenter(e) {
    e.preventDefault();
    this.props.createCenter(this.state);
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
                  <input
                    id="center_name"
                    type="text"
                    className="validate"
                    defaultValue={this.state.center.name}
                    onChange={e =>
                      this.setState({
                        center: { ...this.state.center, name: e.target.value }
                      })
                    }
                  />
                  <label htmlFor="center_name">Center Name</label>
                </div>

                <div className="input-field col  s12 m6 l6">
                  <SelectComponent
                    default={this.state.center.type}
                    id="type"
                    change={this.handleCenterTypeChanged}
                    options={
                      new Map([...CENTER_TYPE.map((ctype, i) => [i, ctype])])
                    }
                    label="Center Type"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col  s12 m6 l6">
                  <input
                    id="address"
                    type="text"
                    className="validate"
                    defaultValue={this.state.center.address}
                    onChange={e =>
                      this.setState({
                        center: {
                          ...this.state.center,
                          address: e.target.value
                        }
                      })
                    }
                  />
                  <label htmlFor="address">Address</label>
                </div>

                <div className="input-field col  s12 m6 l6">
                  <input
                    id="area"
                    type="text"
                    className="validate"
                    defaultValue={this.state.center.area}
                    onChange={e =>
                      this.setState({
                        center: {
                          ...this.state.center,
                          area: e.target.value
                        }
                      })
                    }
                  />
                  <label htmlFor="area">Area</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <SelectComponent
                    default={this.state.center.state}
                    id="state"
                    change={this.handleStateChanged}
                    options={new Map([...STATES.map((state, i) => [i, state])])}
                    label="State"
                  />
                </div>

                <div className="input-field col  s12 m6 l6">
                  <input
                    id="capacity"
                    type="text"
                    className="validate"
                    defaultValue={this.state.center.capacity}
                    onChange={e =>
                      this.setState({
                        center: {
                          ...this.state.center,
                          capacity: e.target.value
                        }
                      })
                    }
                  />
                  <label htmlFor="capacity">Capacity</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <div className="chips facilities" />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m6 l6">
                  <input
                    id="center_amount"
                    type="text"
                    className="validate"
                    defaultValue={this.state.center.amount}
                    onChange={e =>
                      this.setState({
                        center: { ...this.state.center, amount: e.target.value }
                      })
                    }
                  />
                  <label htmlFor="center_amount">Amount Center (N)</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12 m12 l12">
                  <textarea
                    id="details"
                    className="materialize-textarea"
                    onChange={e =>
                      this.setState({
                        center: {
                          ...this.state.center,
                          details: e.target.value
                        }
                      })
                    }
                    defaultValue={this.state.center.details}
                  />
                  <label htmlFor="event_summary">Additional Details</label>
                </div>

                <div className="input-field col s12 m6 l6">
                  <input
                    type="file"
                    accept="image/*"
                    className="validate"
                    id="eventpic"
                    onChange={e =>
                      this.setState({
                        center: {
                          ...this.state.center,
                          image: e.target.files[0]
                        }
                      })
                    }
                  />
                </div>
              </div>

              <CenterContactPerson
                newContact={this.state.center.newContact}
                onNewContactChanged={this.handleNewContactChanged}
                existingContacts={this.state.center.contact.existingContacts}
                onSelectContactChanged={this.handleContactPersonChanged}
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

Create.propTypes = {
  createCenter: PropTypes.func.isRequired,
  getContactPerson: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  events: PropTypes.shape().isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => {
  const { accessToken } = state.user;
  const { contacts, events } = state.center;
  return { accessToken, contacts, events };
};

const mapDispatchToProps = dispatch => ({
  createCenter: centerDetails => dispatch(createCenterRequest(centerDetails)),
  getContactPerson: accessToken =>
    dispatch(getContactPersonRequest(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);

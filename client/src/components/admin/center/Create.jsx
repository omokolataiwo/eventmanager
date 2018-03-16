import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import createCenterRequest from '../../../store/actions/action_creators/createCenter';
import { getContactPersonRequest } from '../../../store/actions/action_creators/getContactPerson';
import { SelectComponent } from '../../ui/SelectComponent';
import { CenterContactPerson } from '../../ui/CenterContactPerson';
import { STATES, CENTER_TYPE } from '../../ui/consts';
import fakeCenter from '../../ui/faker/center';
import { RECEIVED_CENTER_CONTACTS } from '../../../store/actions/types';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        name: '',
        capacity: null,
        address: '',
        amount: null,
        facilities: '',
        state: 0,
        type: 0,
        image: 'default_center_image.jpeg',
        contactid: 0,
        newContact: false,
        contact: {
          newContact: {
            first_name: '',
            last_name: '',
            phone_number: null,
            email: '',
          },
          existingContacts: [],
        },
      },
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

    const { _getCenterContact, contacts } = this.props;
    if (_getCenterContact === RECEIVED_CENTER_CONTACTS) {
      if (contacts.length === 0) {
        this.setState({ center: { ...this.state.center, newContact: true } });
      } else {
        this.setState({
          center: {
            ...this.state.center,
            contact: { ...this.state.center.contact, existingContacts: contacts },
          },
        });
      }
    }
  }
  componentDidMount() {
    const facilitiesDOM = $('.facilities');
    facilitiesDOM.material_chip({
      placeholder: 'Center Facilities',
    });

    const chipChanged = () => {
      let facilities = facilitiesDOM.material_chip('data');
      facilities = Object.keys(facilities)
        .map(key => facilities[key].tag)
        .join(';');
      this.setState({ center: { ...this.state.center, facilities } });
    };

    facilitiesDOM.on('chip.add', chipChanged);
    facilitiesDOM.on('chip.delete', chipChanged);
  }
  createCenter(e) {
    this.state.accessToken = this.props.accessToken;
    this.props.createCenter(this.state);
    e.preventDefault();
  }

  handleContactPersonChanged(contactid) {
    this.setState({ center: { ...this.state.center, contactid } });
  }
  handleNewContactChanged() {
    this.setState({
      center: {
        ...this.state.center,
        newContact: !this.state.center.newContact,
      },
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
          newContact: { ...this.state.center.contact.newContact, [field]: value },
        },
      },
    });
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
                        center: { ...this.state.center, name: e.target.value },
                      })
                    }
                  />
                  <label htmlFor="center_name">Center Name</label>
                </div>
              </div>
              <div className="row">
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
                          capacity: e.target.value,
                        },
                      })
                    }
                  />
                  <label htmlFor="capacity">Capacity</label>
                </div>
                <div className="input-field col  s12 m6 l6">
                  <SelectComponent
                    default={this.state.center.type}
                    id="type"
                    change={this.handleCenterTypeChanged}
                    options={new Map([...CENTER_TYPE.map((ctype, i) => [i, ctype])])}
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
                          address: e.target.value,
                        },
                      })
                    }
                  />
                  <label htmlFor="address">Address</label>
                </div>
                <div className="input-field col s12 m6 l6">
                  <SelectComponent
                    default={this.state.center.state}
                    id="state"
                    change={this.handleStateChanged}
                    options={new Map([...STATES.map((state, i) => [i, state])])}
                    label="State"
                  />
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
                        center: { ...this.state.center, amount: e.target.value },
                      })
                    }
                  />
                  <label htmlFor="center_amount">Amount Center (N)</label>
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
  _getCenterContact: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => {
  const { accessToken } = state.user;
  const { contacts, events: { getCenterContact } } = state.center;
  return { accessToken, contacts, _getCenterContact: getCenterContact };
};

const mapDispatchToProps = dispatch => ({
  createCenter: centerDetails => dispatch(createCenterRequest(centerDetails)),
  getContactPerson: accessToken => dispatch(getContactPersonRequest(accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);

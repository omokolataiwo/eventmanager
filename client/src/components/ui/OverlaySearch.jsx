import React from 'react';
import { connect } from 'react-redux';
import { STATES, CENTER_TYPE } from './consts';
import { SelectComponent } from './SelectComponent';
import { searchCenterRequest } from '../../store/actions/action_creators/searchCenterRequest';

class OverlaySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        state: 24,
        type: 1,
      },
      switch: {
        capacity: false,
        facilities: false,
        amount: false,
        type: false,
      },
    };
    this.handleStateChanged = this.handleStateChanged.bind(this);
    this.handleCenterTypeChanged = this.handleCenterTypeChanged.bind(this);
  }
  handleStateChanged(state) {
    this.setState({ params: { ...this.state.params, state } });
  }
  handleCenterTypeChanged(type) {
    this.setState({ params: { ...this.state.params, type } });
  }
  search(e) {
    e.preventDefault();
    this.props.searchCenter(this.state.params);
  }
  render() {
    return (
      <div className="search-cover" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
        <form className="search-center-form">
          <div className="row">
            <div className="col s12 m3 l2">
              <div className="switch">
                <label htmlFor="switch-capacity">
                  <input
                    id="switch-capacity"
                    type="checkbox"
                    checked={this.state.switch.capacity}
                    onChange={() => {
                      this.setState({
                        switch: { ...this.state.switch, capacity: !this.state.switch.capacity },
                      });
                    }}
                  />
                  <span className="lever" />
                  Capacity
                </label>
              </div>
            </div>
            <div className="col s12 m3 l2">
              <div className="switch">
                <label htmlFor="switch-center-type">
                  <input
                    id="switch-center-type"
                    type="checkbox"
                    checked={this.state.switch.type}
                    onChange={() => {
                      this.setState({
                        switch: { ...this.state.switch, type: !this.state.switch.type },
                      });
                    }}
                  />
                  <span className="lever" />
                  Type
                </label>
              </div>
            </div>
            <div className="col s12 m3 l2">
              <div className="switch">
                <label htmlFor="switch-facilities">
                  <input
                    id="switch-facilities"
                    type="checkbox"
                    checked={this.state.switch.facilities}
                    onChange={() => {
                      this.setState({
                        switch: { ...this.state.switch, facilities: !this.state.switch.facilities },
                      });
                    }}
                  />
                  <span className="lever" />
                  Facilities
                </label>
              </div>
            </div>
            <div className="col s12 m3 l2">
              <div className="switch">
                <label htmlFor="switch-amount">
                  <input
                    id="switch-amount"
                    type="checkbox"
                    checked={this.state.switch.amount}
                    onChange={() => {
                      this.setState({
                        switch: { ...this.state.switch, amount: !this.state.switch.amount },
                      });
                    }}
                  />
                  <span className="lever" />
                  Amount
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col input-field s12 m6 l6">
              <input
                type="text"
                onChange={e =>
                  this.setState({ params: { ...this.state.params, name: e.target.value } })
                }
              />
              <label htmlFor="name">Center Name</label>
            </div>
            <div className="col input-field s12 m6 l6">
              <input
                type="text"
                onChange={e =>
                  this.setState({ params: { ...this.state.params, area: e.target.value } })
                }
              />
              <label htmlFor="name">Area</label>
            </div>
            <div className="col input-field s12 m6 l6">
              <SelectComponent
                default={this.state.params.state}
                id="state"
                change={this.handleStateChanged}
                options={new Map([...STATES.map((state, i) => [i, state])])}
                label="State"
              />
            </div>
            {this.state.switch.capacity && (
              <div className="col input-field s12 m6 l6">
                <input
                  type="text"
                  onChange={e =>
                    this.setState({ params: { ...this.state.params, capacity: e.target.value } })
                  }
                />
                <label htmlFor="name">Capacity</label>
              </div>
            )}
            {this.state.switch.type && (
              <div className="col input-field s12 m6 l6">
                <SelectComponent
                  default={this.state.params.type}
                  id="type"
                  change={this.handleCenterTypeChanged}
                  options={new Map([...CENTER_TYPE.map((ctype, i) => [i, ctype])])}
                  label="Center Type"
                />
              </div>
            )}
            {this.state.switch.facilities && (
              <div className="col input-field s12 m6 l6">
                <input
                  type="text"
                  onChange={e =>
                    this.setState({ params: { ...this.state.params, facilities: e.target.value } })
                  }
                />
                <label htmlFor="name">Facilities</label>
              </div>
            )}
            {this.state.switch.amount && (
              <div className="col input-field s12 m6 l6">
                <input
                  type="text"
                  onChange={e =>
                    this.setState({ params: { ...this.state.params, amount: e.target.value } })
                  }
                />
                <label htmlFor="name">Amount</label>
              </div>
            )}
            <div className="col input-field s12 m6 l6">
              <input
                type="submit"
                value="Search"
                style={{ width: '100%', backgroundColor: '#000', marginBottom: '20px' }}
                onClick={(e) => {
                  this.search(e);
                }}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  searchCenter: params => dispatch(searchCenterRequest(params)),
});
const mapStateToProps = state => state;
export default connect(mapStateToProps, mapDispatchToProps)(OverlaySearch);

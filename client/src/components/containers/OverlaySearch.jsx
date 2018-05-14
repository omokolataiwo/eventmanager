import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';

import { STATES, CENTER_TYPE } from '../../consts';
import SelectComponent from './forms/SelectComponent';


const propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};
/**
 * Center search component
 *
 * @class OverlaySearch
 * @extends {React.Component}
 */
class OverlaySearch extends React.Component {
  /**
   * Center search component
   *
   * @param {*} props - React state
   */
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      switch: {
        capacity: false,
        facilities: false,
        amount: false,
        type: false
      }
    };
    this.handleStateChanged = this.handleStateChanged.bind(this);
    this.handleCenterTypeChanged = this.handleCenterTypeChanged.bind(this);
  }

  /**
   * Update component state for center state
   *
   * @param {number} event Center state
   * @returns {void}
   * @memberof OverlaySearch
   */
  handleStateChanged(event) {
    this.setState({
      params: {
        ...this.state.params,
        state: event.target.value
      }
    });
  }

  /**
   * Update component state for center type
   *
   * @param {number} event Center type
   * @returns {void}
   * @memberof OverlaySearch
   */
  handleCenterTypeChanged(event) {
    this.setState({
      params: {
        ...this.state.params,
        type: event.target.value
      }
    });
  }
  /**
   *  Makes request to the endpoint to search for center.
   *
   * @param {object} event - DOM event
   * @return {void}
   */
  search(event) {
    event.preventDefault();
    if (Object.keys(this.state.params).length === 0) {
      toastr.options = {
        positionClass: 'toast-top-full-width',
        showDuration: '300',
        hideDuration: '2000',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      };
      toastr.error('Please provide a search term.');

      return;
    }
    localStorage.setItem('SEARCH_PARAMS', JSON.stringify(this.state.params));
    this.props.history.push('/search');
  }

  /**
   * Render the component
   *
   * @return {void}
   */
  render() {
    return (
      <div
        className="search-cover"
        style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      >

        <div className="row">
          <div className="col s12 m3 l3">
            <div className="switch">
              <label htmlFor="switch-capacity">
                <input
                  id="switch-capacity"
                  type="checkbox"
                  checked={this.state.switch.capacity}
                  onChange={() => {
                    this.setState({
                      switch: {
                        ...this.state.switch,
                        capacity: !this.state.switch.capacity
                      }
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
                      switch: {
                        ...this.state.switch,
                        type: !this.state.switch.type
                      }
                    });
                  }}
                />
                <span className="lever" />
                Type
              </label>
            </div>
          </div>

          <div className="col s12 m3 l3">
            <div className="switch">
              <label htmlFor="switch-amount">
                <input
                  id="switch-amount"
                  type="checkbox"
                  checked={this.state.switch.amount}
                  onChange={() => {
                    this.setState({
                      switch: {
                        ...this.state.switch,
                        amount: !this.state.switch.amount
                      }
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
                this.setState({
                  params: { ...this.state.params, name: e.target.value }
                })
              }
            />
            <label htmlFor="name">Center Name</label>
          </div>
          <div className="col input-field s12 m6 l6">
            <input
              type="text"
              onChange={e =>
                this.setState({
                  params: { ...this.state.params, area: e.target.value }
                })
              }
            />
            <label htmlFor="name">Area</label>
          </div>
          <div className="col input-field s12 m6 l6">
            <SelectComponent
              id="state"
              width="12"
              change={this.handleStateChanged}
              options={[...STATES.map((ctype, i) => [i + 1, ctype])]}
              label="Center State"
            />
          </div>
          {this.state.switch.capacity && (
            <div className="col input-field s12 m6 l6">
              <input
                type="text"
                onChange={e =>
                  this.setState({
                    params: { ...this.state.params, capacity: e.target.value }
                  })
                }
              />
              <label htmlFor="name">Capacity</label>
            </div>
          )}
          {this.state.switch.type && (
            <div className="col input-field s12 m6 l6">
              <SelectComponent
                id="type"
                width="12"
                change={this.handleCenterTypeChanged}
                options={[...CENTER_TYPE.map((ctype, i) => [i + 1, ctype])]}
                label="Center Type"
              />
            </div>
          )}
          {this.state.switch.amount && (
            <div className="col input-field s12 m6 l6">
              <input
                type="text"
                onChange={e =>
                  this.setState({
                    params: { ...this.state.params, amount: e.target.value }
                  })
                }
              />
              <label htmlFor="name">Amount</label>
            </div>
          )}
          <div className="col input-field s12 m6 l6">
            <button
              style={{
                width: '100%',
                backgroundColor: '#000',
                marginBottom: '20px'
              }}
              onClick={e => {
                this.search(e);
              }}
            >Search
            </button>
          </div>
        </div>

      </div>
    );
  }
}
OverlaySearch.propTypes = propTypes;

export default OverlaySearch;

import React, { Component } from 'react';
import $ from 'jquery';
import 'materialize-css';
import { STATES } from '../../consts';

export class NigerianStateComponent extends Component {
  componentDidMount() {
    $('#states').material_select();
    const self = this;
    $('#states').on('change', function () {
      self.props.change(this.value);
    });
  }

  static statesOptions(select) {
    STATES.forEach((state, i) => {
      select.append(`<option value="${i + 1}">${state}</option>\n`);
    });
  }

  render() {
    let { errorMessage } = this.props;
    return (
      <div className="input-field col s12 m4 l4">
        <select id="states" className="browser-defualt">
          <option value="" disabled selected>
            Choose your option
          </option>
          {STATES.map((state, i) => (
            <option key={i} value={i + 1}>
              {state}
            </option>
          ))}
        </select>
        <label htmlFor="state">States</label>
        <div className="error">{errorMessage}</div>
      </div>
    );
  }
}

export default NigerianStateComponent;

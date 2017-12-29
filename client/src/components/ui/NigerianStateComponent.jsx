import React, { Component } from 'react';
import $ from 'jquery';
import 'materialize-css';
import { STATES } from './consts';

export class NigerianStateComponent extends Component {
  static statesOptions(select) {
    STATES.forEach((state, i) => {
      select.append(`<option value="${i + 1}">${state}</option>\n`);
    });
  }
  componentDidMount() {
    NigerianStateComponent.statesOptions($('#states'));
    $('#states').material_select();
    const self = this;
    $('#states').on('change', () => {
      self.props.change(this.value);
    });
  }

  render() {
    return (
      <div className="input-field col s12 m4 l4">
        <select id="states">
          <option value="" disabled selected>
            Choose your option
          </option>
          {/* STATES.forEach((state, i) => {
            <option value={i + 1}>{state}</option>
          }) */}
        </select>
        <label htmlFor="state">States</label>
      </div>
    );
  }
}

export default NigerianStateComponent;

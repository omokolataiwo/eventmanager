import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

const propTypes = {
  id: PropTypes.string.isRequired,
  default: PropTypes.number,
  options: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
/**
 * Form component for select element
 *
 * @class SelectComponent
 * @extends {Component}
 */
class SelectComponent extends Component {
  /**
   * Initialize materializecss select element
   * @return {void}
   */
  componentDidMount() {
    const id = `#${this.props.id}`;

    if (this.props.default) {
      $(id).val(this.props.default);
    }
    $(id).material_select();
    const self = this;
    $(id).on('change', event => {
      self.props.change(event);
    });
  }

  /**
   * Render html select element
   * @returns {object} - JSX object
   */
  render() {
    if (!Array.isArray(this.props.options)) {
      return <p>Invalid options</p>;
    }
    const options = this.props.options.map(field => (
      <option key={field[0]} value={field[0]}>
        {field[1]}
      </option>
    ));

    return (
      <div
        className={`input-field col s12 m${this.props.width} l${
          this.props.width
        }`}
      >
        <select id={this.props.id} defaultValue="-1">
          <option value="-1" disabled>
            Choose an option
          </option>
          {options}
        </select>
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
  }
}

SelectComponent.propTypes = propTypes;

export default SelectComponent;

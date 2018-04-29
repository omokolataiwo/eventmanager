import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  boolValue: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};
/**
 * Lever a toggle for boolean
 *
 * @param {object} prop Component properties
 * @returns {object} JSX DOM
 */
const Lever = ({ boolValue, handleToggle, id }) => (
  <div className="switch">
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={boolValue}
        onChange={() => {
          handleToggle();
        }}
      />
      <span className="lever" />
      CENTER AVAILABILITY
    </label>
  </div>);

Lever.propTypes = propTypes;
export default Lever;

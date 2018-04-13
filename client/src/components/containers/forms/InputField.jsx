import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired
};

/**
 * Input Field component to render input tags
 *
 * @param {object} props - Components properties
 *
 * @return {object} - JSX DOM
 */
const InputField = ({
  id, type, title, onChange, width
}) => (
  <div className={`input-field col s12 m${width} l${width}`}>
    <input onChange={e => onChange(e)} id={id} type={type} />
    <label htmlFor={id}>{title}</label>
  </div>
);

InputField.propTypes = propTypes;

export default InputField;

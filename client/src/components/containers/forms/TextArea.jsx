import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
/**
 * Component for textarea field
 *
 * @param {object} component properties
 * @return {object} - JSX DOM
 */
const TextArea = ({
  id, width, title, onChange, defaultValue
}) => (
  <div className={`input-field col s12 m{width} l{width}`}>
    <textarea
      id={id}
      className="materialize-textarea"
      onChange={event => onChange(event)}
      defaultValue={defaultValue}
    />
    <label htmlFor={id} className="active">
      {title}
    </label>
  </div>
);

TextArea.propTypes = propTypes;
TextArea.defaultProps = {
  defaultValue: ''
};

export default TextArea;

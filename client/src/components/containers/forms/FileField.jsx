import React from 'react';
import PropTypes from 'prop-types';

import Error from '../Error';

const propTypes = {
  id: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

/**
 * Component for uploading file
 *
 * @param {object} component properties
 * @return {object} - JSX DOM
 */
const FileField = ({
  id, accept, onChange, width, errorMessage
}) => (
  <div className={`input-field col s12 m{width} l{width}`}>
    <input
      type="file"
      accept={accept}
      className="validate"
      id={id}
      onChange={event => onChange(event)}
    />
    {errorMessage && <Error messages={errorMessage} />}
  </div>
);

FileField.propTypes = propTypes;
FileField.defaultProps = {
  errorMessage: false
};

export default FileField;

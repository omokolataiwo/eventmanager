import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

/**
 * Component for uploading file
 *
 * @param {object} component properties
 * @return {object} - JSX DOM
 */
const FileField = ({
  id, accept, onChange, width
}) => (
  <div className={`input-field col s12 m{width} l{width}`}>
    <input
      type="file"
      accept={accept}
      className="validate"
      id={id}
      onChange={event => onChange(event)}
    />
  </div>
);

FileField.propTypes = propTypes;

export default FileField;

/*
 this.setState({
        center: {
          ...this.state.center,
          image: e.target.files[0]
        }
      }
*/

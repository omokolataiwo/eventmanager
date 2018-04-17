import React from 'react';
import PropTypes from 'prop-types';
import Error from '../Error';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.any]),
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  errorMessage: PropTypes.oneOfType([PropTypes.any])
};

/**
 * Input Field component to render input tags
 *
 * @param {object} props - Components properties
 *
 * @return {object} - JSX DOM
 */
const InputField = ({
  id,
  type,
  title,
  onChange,
  width,
  errorMessage,
  defaultValue
}) => {
  if (!id) return null;
  //console.log(id);
  //console.log(defaultValue);
  return (
    <div className={`input-field col s12 m${width} l${width}`}>
      <input
        onChange={event => onChange(event)}
        id={id}
        type={type}
        defaultValue={defaultValue}
      />
      <label className="active" htmlFor={id}>
        {title}
      </label>
      {errorMessage && <Error messages={errorMessage} />}
    </div>
  );
};

InputField.propTypes = propTypes;
InputField.defaultProps = {
  errorMessage: false,
  defaultValue: ''
};

export default InputField;

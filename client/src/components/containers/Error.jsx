import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  messages: PropTypes.array,
  id: PropTypes.string
};

const defaultProps = {
  messages: [],
  id: 'errors'
};

/**
 * Error component that renders error messages
 *
 * @param {object} props - The application state
 *
 * @returns {object} - JSX object
 */
const Error = ({ messages, id }) => {
  if (!Array.isArray(messages) || messages.length === 0) return <span />;
  return (
    <div className={`error ${id}`}>
      {messages.map((message, index) => (
        <span key={index}>{message}&nbsp;</span> //eslint-disable-line
      ))}
    </div>
  );
};

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;
export default Error;

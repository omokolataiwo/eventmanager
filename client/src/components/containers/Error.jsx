import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  messages: PropTypes.array
};

/**
 * Error component that renders error messages
 *
 * @param {object} props - The application state
 *
 * @returns {object} - JSX object
 */
const Error = props => {
  const { messages } = props;
  if (!Array.isArray(messages)) return <span />;
  return (
    <div>
      {messages.map((message, index) => (
        <span key={index}>{message}&nbsp;</span>
      ))}
    </div>
  );
};

Error.propTypes = propTypes;
export default Error;

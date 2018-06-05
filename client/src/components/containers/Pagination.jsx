import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  total: PropTypes.number.isRequired,
  handlePagingNav: PropTypes.func.isRequired
};
/**
 * Pagination
 *
 * @returns {object} React JSX DOM
 */
const Pagination = ({ total, handlePagingNav }) => {
  const LIMIT = 6;
  if (total <= LIMIT) return null;

  const count = Math.ceil(total / LIMIT);
  return (
    <ul className="pagination">
      {new Array(count).fill(null).map((array, index) => (
        <li className="active">
          <div onClick={() => handlePagingNav(index + 1)}>{index + 1}</div>
        </li>
      ))}
    </ul>
  );
};

Pagination.propTypes = propTypes;
export default Pagination;

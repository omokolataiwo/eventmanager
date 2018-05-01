import React from 'react';

/**
 * Pagination
 *
 * @returns {object} React JSX DOM
 */
const Pagination = ({ total, handlePagingNav }) => {
  const LIMIT = 3;
  if (total <= LIMIT) return null;

  const count = Math.ceil(total / LIMIT);

  return (
    <ul className="pagination">
      {new Array(count).fill(null).map((array, index) => (
        <li className="active">
          <a href="#!" onClick={event => handlePagingNav(index + 1)}>
            {index + 1}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;

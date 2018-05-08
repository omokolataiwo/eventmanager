import React from 'react';
import formatNumber from 'format-num';
import PropTypes from 'prop-types';

const propTypes = {
  centers: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired
};

/**
 * Displays related centers
 *
 * @param {object} centers - Suggested Centers
 * @returns {object} - JSX DOM
 */
const SuggestedCenters = ({ centers }) => {
  if (!Array.isArray(centers) || !centers.length) return null;

  centers = centers.slice(0, 3);
  return (
    <div className="related-centers">
      <h5>You May Also Like These Venues</h5>
      <hr />
      <div className="row">
        {centers.map(center => (
          <div className="col s12 m4 l4 thumb-center" key={center.id}>
            <img className="thumbnail-small" src={center.image} alt="center" />
            <h5 className="truncate">{center.name}</h5>
            <p>&#8358;{formatNumber(center.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

SuggestedCenters.propTypes = propTypes;
export default SuggestedCenters;

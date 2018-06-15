import React from 'react';
import formatNumber from 'format-num';
import Pagination from './Pagination';
import { STATES } from '../../consts';

/**
 * Centers Card
 *
 * @returns {object} JSX DOM
 */
const CentersCard = ({ centers, count, handlePagingNav }) => {
  if (!Array.isArray(centers) || !centers.length) return null;

  return (
    <div className="animated fadeIn">
      <div className="row center">
        {centers.map(center => (
          <a href={`/center/${center.id}`} key={center.id}>
            <div className="col s12 m4 l4">
              <div className="event-center card">
                <img src={center.image} alt="Featured Center" />
                <div>
                  <h4 className="truncate">{center.name}</h4>
                  <p>
                    <i className="material-icons">location_on</i>
                    {center.area} {STATES[center.state - 1]}
                  </p>
                  <p> &#8358;{formatNumber(center.amount)}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <Pagination total={count} handlePagingNav={handlePagingNav} />
    </div>
  );
};

export default CentersCard;

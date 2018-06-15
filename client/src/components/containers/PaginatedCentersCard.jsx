import React from 'react';
import formatNumber from 'format-num';
import moment from 'moment';
import Pagination from './Pagination';
import { STATES } from '../../consts';

/**
 * Centers Card
 *
 * @returns {object} JSX DOM
 */
const PaginatedCentersCard = ({
  centers, count, click, handlePagingNav
}) => {
  if (!Array.isArray(centers) || !centers.length) {
    return <span className="no-center">Can not find center</span>;
  }
  return (
    <div>
      <div className="row center">
        {centers.map(center => (
          <div
            onClick={() => click(center.id)}
            tabIndex="-99999"
            onKeyUp={() => {}}
            role="button"
            key={Math.floor(moment() * Math.random())}
          >
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
          </div>
        ))}
      </div>

      <Pagination total={count} handlePagingNav={handlePagingNav} />
    </div>
  );
};

export default PaginatedCentersCard;

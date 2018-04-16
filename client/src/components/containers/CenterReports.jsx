import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  centers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeCenter: PropTypes.number.isRequired
};

/**
 * List all centers and events booked for the center
 *
 * @param {object} props - Property of the component
 * @return {object} - JSX DOM
 */
const CenterReports = ({ centers, activeCenter }) => {
  if (centers.length === 0) { return <div>No center registered. Please register a center.</div>; }

  return (
    <div className="row">
      <div className="col s12 m4 l4">
        <ul className="collection">
          {centers.map(center => (
            <li className="collection-item" key={center.id}>
              <span className="truncate">{center.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="col s12 m8 l8">
        <h6>{centers[activeCenter].events.length} events</h6>
        <ul className="collection">
          {centers[activeCenter].events.map(event => (
            <li className="collection-item" key={event.id}>
              <span className="truncate">{event.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
CenterReports.propTypes = propTypes;
export default CenterReports;

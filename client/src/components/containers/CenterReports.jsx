import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  centers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeCenter: PropTypes.shape({}).isRequired,
  changeCenter: PropTypes.func.isRequired,
};

/**
 * List all centers and events booked for the center
 *
 * @param {object} props - Property of the component
 * @return {object} - JSX DOM
 */
const CenterReports = ({ centers, activeCenter, changeCenter }) => {
  if (centers.length === 0) {
    return <div>No center registered. Please register a center.</div>;
  }

  return (
    <div className="row">
      <div className="col s12 m4 l4">
        <div className="collection">
          <div className="collection-header">
            <h6>{activeCenter.events.length} event{activeCenter.events.length > 1 && 's'}</h6>
            <hr />
          </div>
          {centers.map(center => (
            <a href="#!" className={`collection-item ${center.id == activeCenter.id && 'active'}`} key={center.id} onClick={event => changeCenter(center.id)}>
              <span className="truncate">{center.name}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="col s12 m8 l8">
        <ul className="collection">

          {activeCenter.events.map(event => (
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

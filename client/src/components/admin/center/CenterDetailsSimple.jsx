import React from 'react';
import PropsType from 'prop-types';
import formatNumber from 'format-num';

import { STATES, CENTER_TYPE } from '../../../consts';

/**
 * Previews center to be booked
 *
 * @param {object} props - Component properties
 * @returns {object} - JSX DOM
 */
export const CenterDetailsSimple = ({
  center: {
    image, name, address, state, type, amount, capacity, facilities
  }
}) => {
  if (!image) return null;
  return (
    <div className="row event-center-detailed">
      <div className="col s12 m5 l5 card">
        <div className="event-center">
          <img src={image} alt="Event Center" />
        </div>
      </div>
      <div className="col s12 m7 l7">
        <h5>{name}</h5>
        <div>{address}</div>
        <div>
          <span className="location">
            <span>map </span>
            {STATES[state]}
          </span>
          &nbsp;
          <span className="type">{CENTER_TYPE[type]}</span>
        </div>
        <p className="amount">&#8358;{formatNumber(amount)}</p>
        <p className="capacity">
          <span className="material-icons left">people</span>&nbsp;
          {formatNumber(capacity)} Capacity
        </p>
        <div>
          {facilities
            .split(',')
            .map(facility => <div className="chip">{facility}</div>)}
        </div>
      </div>
    </div>
  );
};

CenterDetailsSimple.propTypes = {
  center: PropsType.shape().isRequired
};

export default CenterDetailsSimple;

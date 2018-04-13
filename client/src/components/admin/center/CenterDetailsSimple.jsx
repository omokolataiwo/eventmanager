import React from 'react';
import PropsType from 'prop-types';

import { STATES, CENTER_TYPE } from '../../../consts';

export const CenterDetailsSimple = props => (
  <div className="row event-center-detailed">
    <div className="col s12 m5 l5 card">
      <div className="event-center">
        <img
          src="https://roederklausgermany.files.wordpress.com/2012/06/hello_friend.gif"
          alt="Event Center"
        />
      </div>
    </div>
    <div className="col s12 m7 l7">
      <h5>{props.center.name}</h5>
      <div>{props.center.address}</div>
      <div>
        <span className="location">
          <span>map </span>
          {STATES[props.center.state]}
        </span>
        &nbsp;
        <span className="type">{CENTER_TYPE[props.center.type]}</span>
      </div>
      <p className="amount">N{props.center.amount}</p>
      <p className="capacity">
        <span>users</span> {props.center.capacity} Capacity
      </p>
      <div>
        <div className="chip">Parking Space</div>
        <div className="chip">Security</div>
        <div className="chip">CCTV</div>
      </div>
    </div>
  </div>
);

CenterDetailsSimple.propTypes = {
  center: PropsType.shape({
    name: PropsType.string.isRequired,
    state: PropsType.number.isRequired,
    address: PropsType.string.isRequired,
    type: PropsType.number.isRequired,
    amount: PropsType.number.isRequired,
    capacity: PropsType.number.isRequired
  }).isRequired
};
export default CenterDetailsSimple;

import React from 'react';
import PropsType from 'prop-types';
import formatNumber from 'format-num';
import { STATES, CENTER_TYPE } from '../../ui/consts';

export const CenterDetailsEdit = props => (
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
      <div>
        <span className="location">
          <i className="material-icons left">location_on</i>
          {STATES[props.center.state]}
        </span>
        &nbsp;
        <span className="type">{CENTER_TYPE[props.center.type]}</span>
      </div>
      <p className="amount">&#8358;{formatNumber(props.center.amount)}</p>
      <p className="capacity">
        <i className="material-icons left">people</i> {formatNumber(props.center.capacity)} Capacity
      </p>
      <div>
        {props.center.facilities.split(',').map((facility, i) => (
          <div className="chip" key={i}>
            {facility}
          </div>
        ))}
      </div>
      <p>{props.center.details}</p>
      <div
        className="btn"
        onClick={props.click}
        role="button"
        onKeyDown={props.click}
        tabIndex="-1"
      >
        Edit Center
      </div>
    </div>
  </div>
);

CenterDetailsEdit.propTypes = {
  center: PropsType.shape({
    name: PropsType.string.isRequired,
    state: PropsType.number.isRequired,
    type: PropsType.number.isRequired,
    amount: PropsType.number.isRequired,
    capacity: PropsType.number.isRequired,
  }).isRequired,
  click: PropsType.func.isRequired,
};
export default CenterDetailsEdit;

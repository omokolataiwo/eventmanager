import React from 'react';
import PropsType from 'prop-types';
import formatNumber from 'format-num';
import { STATES, CENTER_TYPE } from '../../../consts';

const propTypes = {
  center: PropsType.shape({
    name: PropsType.string.isRequired,
    state: PropsType.number.isRequired,
    type: PropsType.number.isRequired,
    amount: PropsType.number.isRequired,
    capacity: PropsType.number.isRequired
  }).isRequired,
  click: PropsType.func.isRequired,
  handleViewEvents: PropsType.func.isRequired
};

/**
 * Display the details of a center
 *
 * @param {object} props - Center details
 * @returns {object} - JSX DOM
 */
export const CenterDetailsEdit = ({ center, click, handleViewEvents }) => {
  const {
    image,
    name,
    state,
    type,
    amount,
    facilities,
    capacity,
    details,
    approve
  } = center;
  return (
    <div className="row event-center-detailed">
      <div className="col s12 m5 l5 card">
        <div className="event-center">
          <img src={image} alt="Event Center" />
        </div>
      </div>
      <div className="col s12 m7 l7 details">
        <h5>{name}</h5>
        <div>
          <span className="location">
            <i className="material-icons left">location_on</i>
            {STATES[state - 1]}
          </span>
          &nbsp;
          <span className="type">{CENTER_TYPE[type - 1]}</span>
        </div>
        <p className="amount">&#8358;{formatNumber(amount)}</p>
        <p className="capacity">
          <i className="material-icons left">people</i> {formatNumber(capacity)}
          Capacity
        </p>
        <div>
          {facilities.split(',').map((facility, i) => (
            <div className="chip" key={i}>
              {facility}
            </div>
          ))}
        </div>
        <p>{details}</p>
        {!approve && (
          <p className="approved-status right">Center is not approved!</p>
        )}
        <div
          className="btn blue"
          onClick={event => {
            click(center.id);
          }}
          role="button"
          onKeyDown={event => {
            click(center.id);
          }}
          tabIndex="-1"
        >
          Edit Center
        </div>
        <div
          className="btn blue"
          onClick={event => {
            handleViewEvents(center.id);
          }}
          role="button"
          onKeyDown={event => {
            handleViewEvents(center.id);
          }}
          tabIndex="-1"
        >
          View Events
        </div>
      </div>
    </div>
  );
};

CenterDetailsEdit.propTypes = propTypes;
export default CenterDetailsEdit;

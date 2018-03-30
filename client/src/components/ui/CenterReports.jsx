import React from 'react';

const CenterReports = props => (
  <div className="row">
    <div className="col s12 m4 l4">
      <ul className="collection">
        {props.centers.map(center => (
          <li className="collection-item" key={center.id}>
            <span className="truncate">{center.name}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="col s12 m8 l8">
      <h6>Events - {props.centers[props.activeCenter].events.length}</h6>
      <ul className="collection">
        {props.centers[props.activeCenter].events.map(event => (
          <li className="collection-item" key={event.id}>
            <span className="truncate">{event.title}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default CenterReports;

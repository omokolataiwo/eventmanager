import React from 'react';

const CenterReports = (props) => {
  if (props.centers.length === 0) return <div>Please Register a center.</div>;

  return (
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
        <h6>{props.centers[props.activeCenter].events.length} events</h6>
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
};
export default CenterReports;

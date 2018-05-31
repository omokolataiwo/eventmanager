import React from 'react';
import moment from 'moment';

/**
 * Admin card for events
 *
 * @param {object} events - Center events
 * @returns {object} JSX DOM
 */
const AdminEventCard = ({ events, handleDeletePopEvent }) => {
  if (!Array.isArray(events) || !events.length) {
    return (
      <div className="no-event">
        <hr />
        <h5 className="center">No Event booked for this center.</h5>
      </div>
    );
  }
  return (
    <div>
      {events.map(event => (
        <div className="col s12 m4 l4" key={event.id}>
          <div className="card-panel event-card-admin">
            <h6 className="truncate">
              {event.title}
              {handleDeletePopEvent && (
                <i
                  onClick={() => handleDeletePopEvent(event.id)}
                  tabIndex="-99999"
                  onKeyUp={() => handleDeletePopEvent(event.id)}
                  role="button"
                  className="material-icons right delete"
                >
                  clear
                </i>
              )}
            </h6>

            <hr />
            <div className="row venue">
              <div className="col s12 m2 l2">
                <i className="material-icons left">person</i>
              </div>
              <div className="col s12 m9 l9">
                <p>{`${event.firstName} ${event.lastName}`}</p>
                <p>{event.email}</p>
                <p>{event.phoneNumber}</p>
              </div>
            </div>
            <div className="row timer">
              <div className="col s12 m2 l2">
                <i className="material-icons">access_time</i>
              </div>
              <div className="col s12 m9 l9">
                <div className="col s12 m4 l4">
                  <p>{moment(event.startDate).format('Do')}</p>
                  <p>{moment(event.startDate).format('MMM')}.</p>
                </div>
                <div className="col s12 m8 l8">
                  <p>{moment(event.startDate).diff(moment(), 'days')}</p>
                  <p>Days</p>
                  <p className="remaining">Remaining</p>
                </div>
              </div>
            </div>
            <div className="row date" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminEventCard;

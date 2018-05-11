import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { STATES } from '../../consts';

const propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired
};

/**
 * Table component for centers booking
 *
 * @param {props} props - Component properties
 * @returns {object} - JSX DOM
 */
const BookingTable = ({ events }) => {
  if (!events) return <div>No events for your center yet.</div>;
  return (
    <table className="bordered responsive-table">
      <thead>
        <tr>
          <th>Event Title</th>
          <th>Date</th>
          <th>Venue</th>
          <th>State</th>
          <th>Duration</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => {
          const duration =
            moment(event.endDate).diff(moment(event.startDate), 'days') + 1;
          return (
            <tr key={event.eid}>
              <td>{event.title}</td>
              <td>{moment(event.startDate).format('DD-MM-YYYY')}</td>
              <td>{event.name}</td>
              <td>{STATES[event.state - 1]}</td>
              <td>
                {duration} {duration > 1 ? 'days' : 'day'}
              </td>
              <td>{event.concluded ? 'Concluded' : 'Active'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

BookingTable.propTypes = propTypes;

export default BookingTable;

import database from '../../models';
import validator from 'validator';

class Event {
  constructor(event) {
    this.error = false;
    this.errorMessages = {};
    this.load(event);
  }

  load(event) {
    this.name = event.name || '';
    this.startDate = event.startDate || '';
    this.endDate = event.endDate || '';
    this.time = event.time || '';
    this.state = event.state || 0;
    this.summary = event.summary || '';
    this.center = event.center || 0;
  }

  validate() {
    if (validator.isEmpty(this.name)) {
      this.errorMessages.name = 'Event name can not be empty';
      this.error = true;
    }

    if (!validator.isInt(this.state)) {
      this.errorMessages.state = 'Event state my be a state code';
      this.error = true;
    }

    let events = database.events;
    if (!validator.isInt(this.center) || !events[this.center]) {
      this.errorMessages.state = 'Event center not a valid center';
      this.error = true;
    }
  }
  safe() {
    return !this.error;
  }
  getErrors() {
    if (!this.error) return {};
    return this.errorMessages;
  }
  toJSON() {
    return {
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
      time: this.time,
      state: this.state,
      summary: this.summary,
      center: this.center,
    };
  }
}
export { Event as default };

import validator from 'validator';
import database from '../../db.json';
import Base from './base';

class Event extends Base {
  constructor(event) {
    super(event);
  }

  load(event) {
    this.name = event.name || '';
    this.startDate = event.startDate || '';
    this.endDate = event.endDate || '';
    this.time = event.time || '';
    this.state = event.state || '';
    this.summary = event.summary || '';
    this.center = event.center || '';
    this.id = event.id || null;
    this.centerdb = database.centers;
  }

  validate() {
    if (validator.isEmpty(this.name ? '' + this.name : '')) {
      this.errorMessages.name = 'Event name can not be empty';
      this.error = true;
    }

    if (!validator.isInt(this.state ? '' + this.state : '') || Math.floor(parseInt(this.state)) < 1 || Math.floor(parseInt(this.state)) > 37) {
      this.errorMessages.state = 'Event state must be a state code';
      this.error = true;
    }

    let center = this.centerdb;

    if (!validator.isInt(this.center ? '' + this.center : '') || !center[this.center]) {
      this.errorMessages.center = 'Event center not a valid center';
      this.error = true;
    }

    if (validator.isEmpty(this.toValidatorString(this.startDate)) || !this.isValidDate(this.endDate)) {
      this.errorMessages.startDate = 'Event must have a valid start date';
      this.error = true;
    }

    if (validator.isBefore(this.toValidatorString(this.startDate))) {
      this.errorMessages.startDate = "Event date is a passed date.";
      this.error = true;
    }

    if (validator.isEmpty(this.toValidatorString(this.endDate)) || !this.isValidDate(this.endDate)) {
      this.errorMessages.endDate = "Event must have a valid end date.";
      this.error = true;
    }
  }

  toJSON() {
    return {
      id: this.id,
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

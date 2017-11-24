import database from '../../db.json';
import validator from 'validator';

class Event {
  constructor(event) {
    this.error = false;
    this.errorMessages = {};
    this.load(event);
  }

  load(event) {
    this.name = event.name + '' || '';
    this.startDate = event.startDate + '' || '';
    this.endDate = event.endDate + '' || '';
    this.time = event.time + '' || '';
    this.state = event.state + '' || 0;
    this.summary = event.summary + '' || '';
    this.center = event.center + '' || 0;
    this.id = event.id || null;
    this.centerdb = database.centers;
  }

  setId(id) {
    this.id = id;
  }

  updateCenter(){
    if (this.centerdb[this.center].events){
      this.centerdb[this.center].events.push(this.id);
      return;
    }
    this.centerdb[this.center].events = [this.id];
    return
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

    let center = this.centerdb;

    if (!validator.isInt(this.center) || !center[this.center]) {
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
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
      time: this.time,
      state: this.state,
      summary: this.summary,
      center: this.center
    };
  }
}
export { Event as default };
